import { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/results/ResultsDisplay';
import { HeatLossPredictor } from './utils/predictor';
import { HouseData } from './types/HouseData';

// Declares the HubSpot global object for TypeScript
declare const hubspot: any;

const predictor = new HeatLossPredictor();

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);
  const [isHubSpotReady, setIsHubSpotReady] = useState(false);

  useEffect(() => {
    // This effect runs once when the app loads.
    // It checks if it's in an iFrame and waits for the HubSpot
    // communication bridge to be ready.
    if (window.self !== window.top && typeof hubspot !== 'undefined') {
      hubspot.ready().then(() => {
        // Now we are sure HubSpot is ready to receive messages
        setIsHubSpotReady(true);
      });
    }
  }, []); // The empty array ensures this runs only once on mount

  const handlePredict = (input: Partial<HouseData>) => {
    try {
      const result = predictor.predict(input);
      setPrediction(result);
      setCurrentInput(input);

      // If the HubSpot bridge is ready, close the iFrame and
      // send the calculated value back to the CRM card.
      if (isHubSpotReady) {
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
