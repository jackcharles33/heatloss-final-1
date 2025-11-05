import { useState } from 'react';
import { Container, Box, Paper, CircularProgress } from '@mui/material'; // Import CircularProgress
import { PredictionForm } from './components/PredictionForm'; // <-- FIXED PATH
import { ResultsDisplay } from './components/results/ResultsDisplay'; // <-- FIXED PATH
// import { calculateHeatLoss } from './utils/heatLossCalculator'; // <-- We no longer use this
import { HouseData } from './types/HouseData'; // <-- FIXED PATH
// import { CalculatorInputs } from './types/calculator'; // <-- We no longer use this

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);
  const [isLoading, setIsLoading] = useState(false); // <-- Add loading state
  const [error, setError] = useState<string | null>(null); // <-- Add error state

  const handlePredict = async (input: Partial<HouseData>) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setCurrentInput(input);

    // This is the 6-feature payload our new API expects
    const apiPayload = {
        size: input.size,
        age: input.age,
        floorType: input.floorType,
        roofType: input.roofType,
        wallType: input.wallType,
        windowType: input.windowType,
    };

    try {
      // This is the Vercel serverless function we just created
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API Error: ${response.statusText} - ${errText}`);
      }

      const result = await response.json();

      if (result.success) {
        // The API returns heatloss in Watts (W)
        setPrediction(result.predicted_heatloss_w); 
        return result.predicted_heatloss_w;
      } else {
        throw new Error(result.error || 'Prediction failed');
      }

    } catch (err) {
      console.error('Error making prediction:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return 0;
    } finally {
      setIsLoading(false);
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
          {/* Pass down the isLoading state to the form */}
          <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
          
          {/* Display error message if something went wrong */}
          {error && (
            <Box sx={{ width: '100%', mt: 4, color: '#f44336', textAlign: 'center' }}>
              <p><strong>Error:</strong> {error}</p>
              <p>Please check your inputs or try again.</p>
            </Box>
          )}

          {/* Show a loading indicator */}
          {isLoading && (
             <Box sx={{ width: '100%', mt: 4, color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <CircularProgress sx={{color: '#f050f8'}} />
              <p>Calculating with ML Model...</p>
            </Box>
          )}

          {/* Only show results when not loading and prediction is ready */}
          {prediction !== null && currentInput !== null && !isLoading && !error && (
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