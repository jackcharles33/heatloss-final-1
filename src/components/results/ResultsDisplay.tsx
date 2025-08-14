import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { HeatLossSpectrum } from './HeatLossSpectrum';
import { TrafficLight } from './TrafficLight';
import { getAverageAccuracy, calculateErrorMargin } from '../../utils/accuracyCalculations';
import { ArrowLeftRight } from 'lucide-react';
import { BaseHouseData } from '../../types/HouseData';

interface ResultsDisplayProps {
  prediction: number;
  inputs: Partial<BaseHouseData>;
}

export function ResultsDisplay({ prediction }: ResultsDisplayProps) {
  const [errorMargin, setErrorMargin] = useState<number>(prediction * 0.1);

  useEffect(() => {
    const updateErrorMargin = async () => {
      const accuracy = await getAverageAccuracy();
      setErrorMargin(calculateErrorMargin(prediction, accuracy));
    };
    updateErrorMargin();
  }, [prediction]);

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
              color: '#d8b4fe',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Error Range
          </Typography>
        </Box>
        <HeatLossSpectrum prediction={prediction} errorMargin={errorMargin} />
      </Box>
    </Box>
  );
}
