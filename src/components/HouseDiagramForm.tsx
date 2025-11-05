import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropertyTypeSelect } from './form/PropertyTypeSelect'; // <-- FIXED PATH
import { PropertyAgeSelect } from './form/PropertyAgeSelect'; // <-- FIXED PATH
import { FloorAreaInput } from './form/FloorAreaInput'; // <-- FIXED PATH
import { FloorTypeSelect } from './form/FloorTypeSelect'; // <-- FIXED PATH
import { WallTypeSelect } from './form/WallTypeSelect'; // <-- FIXED PATH
import { WindowTypeSelect } from './form/WindowTypeSelect'; // <-- FIXED PATH
import { RoofTypeSelect } from './form/RoofTypeSelect'; // <-- FIXED PATH
import { HouseDiagram } from './HouseDiagram'; // <-- FIXED PATH
import { SelectWrapper } from './styles/SelectWrapper'; // <-- FIXED PATH

// (Styled components remain the same)
const HouseDiagramContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '600px',
  height: '500px',
  overflow: 'hidden',
  borderRadius: '24px',
  marginBottom: '24px',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    height: '450px',
    width: '100%'
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px'
  }
}));


interface HouseDiagramFormProps {
  values: any;
  onChange: (event: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean; // <-- Add this prop
}

export function HouseDiagramForm({ values, onChange, onSubmit, isLoading }: HouseDiagramFormProps) {
  return (
    <Box 
      component="form" 
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        alignItems: 'center'
      }}
    >
      {/* ... (Image box remains the same) ... */}
      <Box 
        component="img"
        src="https://octoenergy-production-media.s3.amazonaws.com/images/cosy_heat_pump_banner_.width-1200.png"
        alt="House illustration"
        sx={{
          width: '109%',
          maxWidth: '800px',
          height: 'auto',
          borderRadius: '24px',
          mt: 3,
          mb: 2
        }}
      />


      <Box sx={{ width: '600px' }}>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          width: '100%',
          '& .MuiFormControl-root': {
            width: '100%'
          }
        }}>
          <PropertyTypeSelect value={values.propertyType} onChange={onChange} />
          <PropertyAgeSelect value={values.age} onChange={onChange} />
          <FloorAreaInput value={values.size} onChange={onChange} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '600px' }}>
        <HouseDiagramContainer>
          <HouseDiagram />
          
          <SelectWrapper sx={{ top: '35%', left: '30%' }}>
            <RoofTypeSelect value={values.roofType} onChange={onChange} />
          </SelectWrapper>

          <SelectWrapper sx={{ top: '50%', left: '2%' }}>
            <WallTypeSelect value={values.wallType} onChange={onChange} />
          </SelectWrapper>

          <SelectWrapper sx={{ top: '50%', right: '2%' }}>
            <WindowTypeSelect value={values.windowType} onChange={onChange} />
          </SelectWrapper>

          <SelectWrapper sx={{ bottom: '45px', left: '30%' }}>
            <FloorTypeSelect value={values.floorType} onChange={onChange} />
          </SelectWrapper>
        </HouseDiagramContainer>

        <Button 
          type="submit" 
          variant="contained" 
          disableElevation
          disabled={isLoading} // <-- Disable button when loading
          sx={{ 
            width: '100%',
            height: '48px',
            borderRadius: '10px',
            fontSize: '1.1rem',
            color: '#fff',
            backgroundColor: '#f050f8',
            fontFamily: 'Montserrat, sans-serif',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#c14b8b'
            },
            '&:disabled': { // <-- Style for disabled button
              backgroundColor: '#555',
              color: '#999',
              opacity: 0.7
            }
          }}
        >
          {/* Change text when loading */}
          {isLoading ? 'Calculating...' : 'Calculate heat loss'}
        </Button>
      </Box>
    </Box>
  );
}