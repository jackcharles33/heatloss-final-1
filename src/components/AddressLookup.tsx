import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Alert, 
  CircularProgress, 
  Paper 
} from '@mui/material';

interface AddressLookupProps {
  onPopulate: (
    epcData: Partial<{
      size: string;
      age: string;
      propertyType: string;
      wallType: string;
      floorType: string;
      windowType: string;
      roofType: string;
    }>,
    populatedFields: Set<string>,
    postcode: string,
    address: string
  ) => void;
  onClearResults?: () => void;  // clear any previous prediction when a new search starts
}

export function AddressLookup({ onPopulate, onClearResults }: AddressLookupProps) {
  const [postcode, setPostcode] = useState('');
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedCert, setSelectedCert] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Use relative URLs — Vite proxy handles /api/* in dev (→ localhost:8000),
  // Vercel serverless functions handle it in production.
  const apiBase = '';

  const handleSearch = async () => {
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }
    onClearResults?.();   // wipe any previous heat loss result immediately
    setError(null);
    setSuccessMsg(null);
    setAddresses([]);
    setSelectedCert('');
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/search?postcode=${encodeURIComponent(postcode.trim())}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to search postcode');
      }

      const certs = result.data || [];
      if (certs.length === 0) {
        throw new Error('No domestic certificates found for this postcode');
      }

      setAddresses(certs);
    } catch (err: any) {
      setError(err.message || 'An error occurred during search');
    } finally {
      setLoading(false);
    }
  };

  const handlePopulate = async () => {
    if (!selectedCert) return;
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await fetch(`${apiBase}/api/certificate?certificate_number=${encodeURIComponent(selectedCert)}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to download certificate details');
      }

      const certData = result.data;
      if (!certData) {
        throw new Error('No certificate data returned');
      }

      // --- MAPPING ENGINE ---
      // Track which fields had real EPC data.
      // No fallback values — if the specific EPC field is missing, the field
      // stays at its form default and the red ring highlights it for manual entry.
      const populated = new Set<string>();

      // 1. Property Age — ONLY use construction_date, no fallbacks
      let age: string | undefined;
      const constructionDate = certData.construction_date;
      if (constructionDate) {
        const year = parseInt(constructionDate.split('-')[0] || constructionDate.split(' ')[0]);
        if (!isNaN(year)) {
          if (year < 1960) age = 'PRE_1960';
          else if (year >= 1960 && year < 2000) age = 'BETWEEN_1960_2000';
          else if (year >= 2000 && year < 2008) age = 'BETWEEN_2000_2008';
          else if (year >= 2008) age = 'POST_2008';
          populated.add('age');
        }
      }

      // 2. Floor Area — only if total_floor_area is present
      let size: string | undefined;
      if (certData.total_floor_area) {
        size = Math.round(certData.total_floor_area).toString();
        populated.add('size');
      }

      // 3. Property Type — only if we can definitively classify it
      let propertyType: string | undefined;
      const epcPropType = String(certData.property_type || '').toLowerCase();
      const epcDwellingType = String(certData.dwelling_type || '').toLowerCase();
      if (epcPropType.includes('bungalow')) {
        propertyType = 'Bungalow';
        populated.add('propertyType');
      } else if (epcDwellingType.includes('semi-detached') || epcDwellingType.includes('end-terrace')) {
        propertyType = 'Semi-Detached / End-Terrace';
        populated.add('propertyType');
      } else if (epcDwellingType.includes('end of terrace')) {
        propertyType = 'End of Terrace';
        populated.add('propertyType');
      } else if (epcDwellingType.includes('terrace')) {
        propertyType = 'Terrace';
        populated.add('propertyType');
      } else if (epcDwellingType.includes('detached')) {
        propertyType = 'Detached';
        populated.add('propertyType');
      }

      // 4. Wall Type — only if wall description is present and classifiable
      let wallType: string | undefined;
      const wallDesc = String(certData.walls?.[0]?.description || '').toLowerCase();
      if (wallDesc.trim()) {
        if (wallDesc.includes('timber')) {
          wallType = 'timber-frame';
          populated.add('wallType');
        } else if (wallDesc.includes('solid brick') || wallDesc.includes('solid stone') || wallDesc.includes('granite')) {
          wallType = 'solid-brick-228';
          populated.add('wallType');
        } else if (wallDesc.includes('cavity')) {
          const hasInsulation = wallDesc.includes('insulation') || wallDesc.includes('filled');
          wallType = (age === 'PRE_1960')
            ? (hasInsulation ? 'cavity-pre60-filled' : 'cavity-pre60-unfilled')
            : (hasInsulation ? 'cavity-post60-290-310-filled' : 'cavity-post60-290-310-unfilled');
          populated.add('wallType');
        }
        // If wall description exists but doesn't match any known pattern, leave unpopulated
      }

      // 5. Floor Type — only if floor description is present
      let floorType: string | undefined;
      const floorDesc = String(certData.floors?.[0]?.description || '').toLowerCase();
      if (floorDesc.trim()) {
        const isSuspended = floorDesc.includes('suspended') || floorDesc.includes('timber');
        const floorRating = certData.floors?.[0]?.energy_efficiency_rating;
        if (floorRating != null) {
          const floorThicknessMap: Record<number, string> = { 1: '0', 2: '25', 3: '50', 4: '75', 5: '100' };
          const floorThickness = floorThicknessMap[Math.min(5, Math.max(1, floorRating))];
          if (floorThickness != null) {
            floorType = `${isSuspended ? 'suspended' : 'concrete'}-${floorThickness}`;
            populated.add('floorType');
          }
        }
      }

      // 6. Window Type — only if window description is present
      let windowType: string | undefined;
      const windowDesc = String(certData.window?.description || '').toLowerCase();
      if (windowDesc.trim()) {
        const isLowE = windowDesc.includes('low-e') || windowDesc.includes('high performance');
        if (windowDesc.includes('triple')) windowType = isLowE ? 'wood-pvc-triple-le' : 'wood-pvc-triple';
        else if (windowDesc.includes('single')) windowType = 'wood-pvc-single';
        else windowType = isLowE ? 'wood-pvc-double-le' : 'wood-pvc-double';
        populated.add('windowType');
      }

      // 7. Roof Type — only if roof description is present
      let roofType: string | undefined;
      const roofDesc = String(certData.roofs?.[0]?.description || '').toLowerCase();
      if (roofDesc.trim()) {
        const isFlat = roofDesc.includes('flat');
        const roofRating = certData.roofs?.[0]?.energy_efficiency_rating;
        if (roofRating != null) {
          const roofThicknessMap: Record<number, string> = { 1: '0', 2: '50', 3: '100', 4: '200', 5: '300' };
          const roofThickness = roofThicknessMap[Math.min(5, Math.max(1, roofRating))];
          if (roofThickness != null) {
            roofType = `${isFlat ? 'flat' : 'pitched'}-${roofThickness}`;
            populated.add('roofType');
          }
        }
      }

      const fullAddress = [
        certData.address_line_1,
        certData.address_line_2,
        certData.post_town,
      ].filter(Boolean).join(', ');

      // Only pass fields that were actually populated from EPC data.
      // Fields left undefined won't overwrite the form's existing defaults,
      // and the red ring will highlight them for manual entry.
      const epcValues: Partial<{
        size: string; age: string; propertyType: string;
        wallType: string; floorType: string; windowType: string; roofType: string;
      }> = {};
      if (age !== undefined) epcValues.age = age;
      if (size !== undefined) epcValues.size = size;
      if (propertyType !== undefined) epcValues.propertyType = propertyType;
      if (wallType !== undefined) epcValues.wallType = wallType;
      if (floorType !== undefined) epcValues.floorType = floorType;
      if (windowType !== undefined) epcValues.windowType = windowType;
      if (roofType !== undefined) epcValues.roofType = roofType;

      onPopulate(epcValues, populated, postcode.trim().toUpperCase(), fullAddress);

      setSuccessMsg(`Successfully populated fields for ${certData.address_line_1 || 'property'} from EPC data!`);
    } catch (err: any) {
      setError(err.message || 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{
        p: 3,
        mb: 4,
        width: '100%',
        backgroundColor: '#180048',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px'
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
        ⚡ Autofill from UK EPC Data
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Enter Postcode"
          variant="outlined"
          size="small"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          placeholder="e.g. LS6 1AJ"
          sx={{
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              color: 'white',
              backgroundColor: '#211934',
              borderRadius: '10px',
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: '2px solid #d85c9c' },
              '& input': { fontFamily: 'Montserrat, sans-serif' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#d85c9c' },
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); handleSearch(); }
          }}
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ 
            backgroundColor: '#f050f8', 
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#c14b8b' }
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Search'}
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      {addresses.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="epc-address-label" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif', '&.Mui-focused': { color: '#d85c9c' } }}>Select Address</InputLabel>
            <Select
              labelId="epc-address-label"
              value={selectedCert}
              label="Select Address"
              onChange={(e) => setSelectedCert(e.target.value)}
              sx={{
                color: 'white',
                backgroundColor: '#211934',
                borderRadius: '10px',
                fontFamily: 'Montserrat, sans-serif',
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid #d85c9c' },
                '& .MuiSvgIcon-root': { color: 'white' },
                '& .MuiSelect-select': { fontFamily: 'Montserrat, sans-serif' }
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: '#211934',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '& .MuiMenuItem-root': {
                      fontFamily: 'Montserrat, sans-serif',
                      '&:hover': { backgroundColor: 'rgba(216,92,156,0.15)' },
                      '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }
                  }
                }
              }}
            >
              {addresses.map((cert) => {
                const addr = [cert.addressLine1, cert.addressLine2, cert.postTown]
                  .filter(Boolean)
                  .join(', ');
                return (
                  <MenuItem key={cert.certificateNumber} value={cert.certificateNumber}>
                    {addr} ({cert.currentEnergyEfficiencyBand || 'No Band'})
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={handlePopulate}
            disabled={!selectedCert || loading}
            sx={{
              backgroundColor: '#f050f8',
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#c14b8b' },
              '&:disabled': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Autofill Form'}
          </Button>
        </Box>
      )}
    </Paper>
  );
}
