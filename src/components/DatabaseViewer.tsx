import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ModelStats } from './stats/ModelStats';
import { StoredPrediction } from '../db/types';
import { getRecentPredictions } from '../db/database';

export function DatabaseViewer() {
  const [predictions, setPredictions] = useState<StoredPrediction[]>([]);
  const [showStats] = useState(false);

  useEffect(() => {
    const loadPredictions = async () => {
      const data = await getRecentPredictions();
      setPredictions(data);
    };
    loadPredictions();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      {showStats && <ModelStats predictions={predictions} />}
    </Box>
  );
}