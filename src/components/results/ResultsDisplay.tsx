import { Box, Typography } from '@mui/material';
import { HeatLossSpectrum } from './HeatLossSpectrum';
import { TrafficLight } from './TrafficLight';
import { ActivitySquare } from 'lucide-react';
import { BaseHouseData } from '../../types/HouseData';

// Fallback interval if the API doesn't return bounds (±12% of prediction)
const FALLBACK_MARGIN_FRAC = 0.12;
const FALLBACK_CONFIDENCE  = 88;

interface ResultsDisplayProps {
  prediction:      number;
  inputs:          Partial<BaseHouseData>;
  confidenceScore: number | null;
  lowerBound:      number | null;
  upperBound:      number | null;
}

export function ResultsDisplay({ prediction, confidenceScore, lowerBound, upperBound }: ResultsDisplayProps) {
  const conf  = confidenceScore ?? FALLBACK_CONFIDENCE;
  const lower = lowerBound      ?? Math.round(prediction * (1 - FALLBACK_MARGIN_FRAC));
  const upper = upperBound      ?? Math.round(prediction * (1 + FALLBACK_MARGIN_FRAC * 1.1));

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
          <ActivitySquare size={16} color="#ffffff" />
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#ffffff',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Confidence Interval
          </Typography>
        </Box>
        <HeatLossSpectrum
          prediction={prediction}
          lowerBound={lower}
          upperBound={upper}
          confidenceScore={conf}
        />
      </Box>
    </Box>
  );
}
