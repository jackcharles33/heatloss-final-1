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

const Value = styled(Typography)({
  position: 'absolute',
  color: '#fff',
  fontSize: '20px',
  fontWeight: 600,
  transform: 'translateX(-50%)',
  bottom: '-32px',
  whiteSpace: 'nowrap',
  fontFamily: 'Montserrat, sans-serif'
});

interface HeatLossSpectrumProps {
  prediction: number;
  errorMargin: number;
}

export function HeatLossSpectrum({ prediction, errorMargin }: HeatLossSpectrumProps) {
  const minValue = prediction - errorMargin;
  const maxValue = prediction + errorMargin;
  
  const getPosition = (value: number) => ((value - minValue) / (maxValue - minValue)) * 100;
  const position = getPosition(prediction);

  const formatValue = (value: number) => Number(value.toFixed(1));

  return (
    <Box sx={{ width: '100%', padding: '0 24px' }}>
      <SpectrumContainer>
        <GradientBar>
          <Marker position={position} />
        </GradientBar>
        <Value sx={{ left: 0, transform: 'translateX(0)' }}>
          {formatValue(minValue)} W
        </Value>
        <Value sx={{ right: 0, left: 'auto', transform: 'translateX(0)' }}>
          {formatValue(maxValue)} W
        </Value>
      </SpectrumContainer>
    </Box>
  );
}