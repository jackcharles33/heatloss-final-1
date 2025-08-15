import React, { useState, useEffect } from 'react';
import { Container, Box, Paper } from '@mui/material';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/results/ResultsDisplay';
import { HeatLossPredictor } from './utils/predictor';
import { HouseData } from './types/HouseData';
import { updateHubSpotDeal } from './services/api/calculations';

const predictor = new HeatLossPredictor();

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);
  const [hubspotDealId, setHubspotDealId] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const dealId = queryParams.get('dealId');
    if (dealId) {
      setHubspotDealId(dealId);
      console.log(`HubSpot Deal ID found: ${dealId}`);
    }
  }, []);

  const handlePredict = async (input: Partial<HouseData>) => {
    try {
      const result = predictor.predict(input); // This should be the physics model now
      setPrediction(result);
      setCurrentInput(input);

      if (hubspotDealId) {
        await updateHubSpotDeal(hubspotDealId, result);
        alert('Heat loss calculated and HubSpot deal record updated!');
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
      <Paper elevation={3} sx={{ backgroundColor: '#34244c', borderRadius: '32px', p: 6, width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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