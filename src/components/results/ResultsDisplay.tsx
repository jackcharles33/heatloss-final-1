import { Box, Typography } from '@mui/material';
import { HeatLossSpectrum } from './HeatLossSpectrum';
import { TrafficLight } from './TrafficLight';
import { ArrowLeftRight } from 'lucide-react';
import { BaseHouseData } from '../../types/HouseData';

interface ResultsDisplayProps {
  prediction: number;
  inputs: Partial<BaseHouseData>;
}

// --- THIS IS OUR NEW, FIXED ERROR MARGIN ---
// From our tuned 88.4% R² model's Mean Absolute Error (MAE)
const MODEL_MAE = 665.58;

export function ResultsDisplay({ prediction }: ResultsDisplayProps) {
  


  return (
    <Box sx={{ width: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <TrafficLight heatLoss={prediction} />
      
      <Box sx={{ 
        backgroundColor: '#180048',
        borderRadius: '24px',
        padding: '24px',
        width: '100%'
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          mb: 2
        }}>
          <ArrowLeftRight size={16} color="#ffffff" />
          <Typography 
            sx={{ 
              fontSize: '18px',
              fontWeight: 600,
              color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Error Range
          </Typography>
        </Box>
        {/* Pass the new, fixed MAE to the spectrum component */}
        <HeatLossSpectrum prediction={prediction} errorMargin={MODEL_MAE} />
      </Box>
    </Box>
  );
}
