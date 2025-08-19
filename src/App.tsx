import { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/results/ResultsDisplay';
import { HeatLossPredictor } from './utils/predictor';
import { HouseData } from './types/HouseData';

// This declares the HubSpot functions for TypeScript
declare const hubspot: any;

const predictor = new HeatLossPredictor();

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);
  const [isInHubSpot, setIsInHubSpot] = useState(false);

  useEffect(() => {
    // Check if the app is running inside a HubSpot iFrame
    if (window.self !== window.top) {
      setIsInHubSpot(true);
    }
  }, []);

  const handlePredict = (input: Partial<HouseData>) => {
    try {
      const result = predictor.predict(input);
      setPrediction(result);
      setCurrentInput(input);

      // If we are inside a HubSpot iFrame, close it and pass the data back
      if (isInHubSpot) {
        hubspot.ui.extensions.closeIframe({
          heatLoss: result,
        });
      }
      return result;
    } catch (err) {
      console.error('Error making prediction:', err);
      return 0;
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 4 }, maxWidth: '810px !important' }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Heat Loss Calculator
        </h1>
      </Box>
      <Paper elevation={3} sx={{ backgroundColor: '#180048', borderRadius: '32px', p: 6, width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <PredictionForm onPredict={handlePredict} />
          {prediction !== null && currentInput !== null && (
            <Box sx={{ width: '100%', mt: 4 }}>
              <ResultsDisplay prediction={prediction} inputs={currentInput} />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
