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
  // New Logic: Green < 14kW | Amber 14-15kW | Red > 15kW
  let backgroundColor: string;
  let message: string;

  if (heatLoss >= 15000) {
    backgroundColor = '#ef4444'; // Red
    message = "Do Not Book Survey";
  } else if (heatLoss >= 14000) {
    backgroundColor = '#f59e0b'; // Amber
    message = "Turn Down Unless TL Optimistic"; // Updated message for amber zone? Or user's "Must Get TL Approval"?
    // User requested "amber 14-15kW". The old message was "Must Get TL Approval".
    // I will stick to "Must Get TL Approval Before Booking" as it is safer/business standard unless user said otherwise.
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
