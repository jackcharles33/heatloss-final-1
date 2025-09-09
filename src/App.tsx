import { useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/results/ResultsDisplay';
// FIX: Import the correct, physics-based calculator function
import { calculateHeatLoss } from './utils/heatLossCalculator'; 
import { HouseData } from './types/HouseData';
import { CalculatorInputs } from './types/calculator';

function App() {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState<Partial<HouseData> | null>(null);

  const handlePredict = (input: Partial<HouseData>) => {
    try {
      // Map the form data to the format the new calculator expects
      const calculatorInputs: CalculatorInputs = {
        floorArea: String(input.size || '100'),
        age: input.age || 'BETWEEN_1960_2000',
        propertyType: input.propertyType || 'Semi-Detached / End-Terrace',
        wallType: input.wallType || 'cavity-post60-290-310-filled',
        windowType: input.windowType || 'wood-pvc-double',
        floorType: input.floorType || 'concrete-75',
        roofType: input.roofType || 'pitched-100',
        // Add default values for parameters not in the simple form
        stories: 2,
        indoorTemp: 21,
        glazingRatio: 20,
        region: 'london',
        postcode: '',
      };

      
      // FIX: Call the correct, physics-based calculator
      const result = calculateHeatLoss(calculatorInputs);
      
      // The result is now the large Watt value (e.g., 8900)
      setPrediction(result.totalHeatLoss); 
      setCurrentInput(input);
      
      return result.totalHeatLoss;
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
