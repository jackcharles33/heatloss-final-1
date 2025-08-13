import React from 'react';
import { Container, Box, Paper } from '@mui/material';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/results/ResultsDisplay';
import { DatabaseViewer } from './components/DatabaseViewer';
import { HeatLossPredictor } from './utils/predictor';
import { HouseData } from './types/HouseData';

const predictor = new HeatLossPredictor();

function App() {
  const [prediction, setPrediction] = React.useState<number | null>(null);
  const [currentInput, setCurrentInput] = React.useState<Partial<HouseData> | null>(null);

  const handlePredict = (input: Partial<HouseData>) => {
    try {
      const result = predictor.predict(input);
      setPrediction(result);
      setCurrentInput(input);
      return result;
    } catch (err) {
      console.error('Error making prediction:', err);
      return 0;
    }
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        py: 4, 
        px: { xs: 2, sm: 4 },
        maxWidth: '810px !important'
      }}
    >
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Heat Loss Calculator
        </h1>
      </Box>
      
      <Paper 
        elevation={3}
        sx={{
          backgroundColor: '#34244c',
          borderRadius: '32px',
          p: 6,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '600px' }}>
          <PredictionForm onPredict={handlePredict} />
          
          {prediction !== null && currentInput !== null && (
            <Box sx={{ width: '100%', mt: 4 }}>
              <ResultsDisplay prediction={prediction} inputs={currentInput} />
            </Box>
          )}
        </Box>
      </Paper>

      <DatabaseViewer />
    </Container>
  );
}

export default App;