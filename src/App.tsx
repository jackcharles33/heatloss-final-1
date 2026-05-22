import { useState } from 'react';
import { Container, Box, Paper, CircularProgress } from '@mui/material'; // Import CircularProgress
import { PredictionForm } from './components/PredictionForm'; // <-- FIXED PATH
import { ResultsDisplay } from './components/results/ResultsDisplay'; // <-- FIXED PATH
// import { calculateHeatLoss } from './utils/heatLossCalculator'; // <-- We no longer use this
import { HouseData } from './types/HouseData'; // <-- FIXED PATH
// import { CalculatorInputs } from './types/calculator'; // <-- We no longer use this
import { saveCalculation } from './lib/supabase';

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [lowerBound, setLowerBound] = useState<number | null>(null);
  const [upperBound, setUpperBound] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (input: Partial<HouseData>) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setConfidenceScore(null);
    setLowerBound(null);
    setUpperBound(null);
    setCurrentInput(input);

    // --- THIS IS THE FIX ---
    // This is the *7-feature* payload our new API expects
    const apiPayload = {
        size: input.size,
        age: input.age,
        floorType: input.floorType,
        roofType: input.roofType,
        wallType: input.wallType,
        windowType: input.windowType,
        propertyType: input.propertyType // <-- ADDED THE 7TH FEATURE
    };

    try {
      // This is the Vercel serverless function we just created
      const apiBase = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBase}/api/predict`, {
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
        setPrediction(result.predicted_heatloss_w);
        setConfidenceScore(result.confidence_score ?? null);
        setLowerBound(result.lower_bound_w ?? null);
        setUpperBound(result.upper_bound_w ?? null);

        // Persist to Supabase (non-blocking — failures are logged, not surfaced)
        saveCalculation({
          postcode:            (input as any)._postcode  || undefined,
          address:             (input as any)._address   || undefined,
          size:                input.size as number,
          age:                 input.age,
          property_type:       input.propertyType,
          wall_type:           input.wallType,
          floor_type:          input.floorType,
          window_type:         input.windowType,
          roof_type:           input.roofType,
          predicted_heatloss_w: result.predicted_heatloss_w,
          confidence_score:    result.confidence_score,
          lower_bound_w:       result.lower_bound_w,
          upper_bound_w:       result.upper_bound_w,
        });

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
          <PredictionForm
            onPredict={handlePredict}
            isLoading={isLoading}
            onEpcPopulated={() => {
              setPrediction(null);
              setConfidenceScore(null);
              setLowerBound(null);
              setUpperBound(null);
            }}
          />
          
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
              <ResultsDisplay
                prediction={prediction}
                inputs={currentInput}
                confidenceScore={confidenceScore}
                lowerBound={lowerBound}
                upperBound={upperBound}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
