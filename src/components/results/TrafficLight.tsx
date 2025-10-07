import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  borderRadius: '24px',
  width: '100%',
  marginBottom: '24px',
  transition: 'background-color 0.3s ease'
});

const Content = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const HeatLossValue = styled(Typography)({
  fontSize: '48px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  fontFamily: 'Montserrat, sans-serif',
  lineHeight: 1,
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'baseline',
  gap: '8px',
  '& .unit': {
    fontSize: '20px',
    opacity: 0.8,
    fontWeight: 500
  }
});

const Message = styled(Typography)({
  color: '#fff',
  fontSize: '20px',
  fontWeight: 600,
  fontFamily: 'Montserrat, sans-serif',
  textAlign: 'center',
  width: '100%'
});

interface TrafficLightProps {
  heatLoss: number;
}

export function TrafficLight({ heatLoss }: TrafficLightProps) {
  // This is the line to change
  const threshold = 11200; 
  const margin = threshold * 0.15; // The amber range will adjust automatically

  let backgroundColor: string;
  let message: string;

  if (heatLoss > threshold) {
    backgroundColor = '#ef4444'; // Red
    message = "Do Not Book Survey";
  } else if (heatLoss > threshold - margin) {
    backgroundColor = '#f59e0b'; // Amber
    message = "Must Get TL Approval Before Booking";
  } else {
    backgroundColor = '#22c55e'; // Green
    message = "Book Survey";
  }

  return (
    <Container sx={{ backgroundColor }}>
      <Content>
        <HeatLossValue>
          {Math.round(heatLoss).toLocaleString()}
          <span className="unit">W</span>
        </HeatLossValue>

        <Message>
          {message}
        </Message>
      </Content>
    </Container>
  );
}
