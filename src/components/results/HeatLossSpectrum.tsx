import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const SpectrumContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '8px',
  borderRadius: '4px',
  marginTop: '24px',
  marginBottom: '48px'
});

const GradientBar = styled(Box)({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, #2596be, #F44336)',
  borderRadius: '4px'
});

interface MarkerProps {
  position: number;
}

const Marker = styled('div')<MarkerProps>(({ position }) => ({
  position: 'absolute',
  left: `${Math.min(Math.max(position, 0), 100)}%`,
  transform: 'translateX(-50%)',
  width: '3px',
  height: '16px',
  backgroundColor: '#fff',
  borderRadius: '2px',
  top: '-4px'
}));

const BoundLabel = styled(Typography)({
  position: 'absolute',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 600,
  transform: 'translateX(-50%)',
  bottom: '-32px',
  whiteSpace: 'nowrap',
  fontFamily: 'Montserrat, sans-serif',
  opacity: 0.85,
});

interface HeatLossSpectrumProps {
  prediction:      number;
  lowerBound:      number;
  upperBound:      number;
  confidenceScore: number;   // integer %, e.g. 91
}

export function HeatLossSpectrum({ prediction, lowerBound, upperBound, confidenceScore }: HeatLossSpectrumProps) {
  // Clamp marker so it never flies off the edge (in case prediction is outside bounds)
  const raw      = (prediction - lowerBound) / (upperBound - lowerBound) * 100;
  const position = Math.min(Math.max(raw, 2), 98);

  const fmt = (v: number) => Math.round(v).toLocaleString();

  return (
    <Box sx={{ width: '100%', padding: '0 24px' }}>

      {/* ── Confidence sentence ── */}
      <Box sx={{
        textAlign: 'center',
        mb: 1,
        lineHeight: 1.6,
      }}>
        <Typography
          component="span"
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          <Box
            component="span"
            sx={{
              color: '#f050f8',
              fontWeight: 700,
              fontSize: '17px',
            }}
          >
            {confidenceScore}%
          </Box>
          {' '}confident this property is within{' '}
          <Box component="span" sx={{ color: '#ffffff', fontWeight: 700 }}>
            {fmt(lowerBound)} W
          </Box>
          {' '}–{' '}
          <Box component="span" sx={{ color: '#ffffff', fontWeight: 700 }}>
            {fmt(upperBound)} W
          </Box>
        </Typography>
      </Box>

      {/* ── Gradient slider ── */}
      <SpectrumContainer>
        <GradientBar>
          <Marker position={position} />
        </GradientBar>
        <BoundLabel sx={{ left: 0, transform: 'translateX(0)' }}>
          {fmt(lowerBound)} W
        </BoundLabel>
        <BoundLabel sx={{ right: 0, left: 'auto', transform: 'translateX(0)' }}>
          {fmt(upperBound)} W
        </BoundLabel>
      </SpectrumContainer>
    </Box>
  );
}
