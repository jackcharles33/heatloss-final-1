import express from 'express';
import { writeFile, appendFile, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Constants
const DATA_DIR = join(process.cwd(), 'data');
const CSV_FILE = join(DATA_DIR, 'calculations.csv');
const DIST_DIR = join(process.cwd(), 'dist');
const HEADERS = ['timestamp', 'size', 'age', 'propertyType', 'windowType', 'wallType', 'floorType', 'roofType', 'heatLoss'];

// Ensure directories exist
[DATA_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// API Routes
app.post('/api/calculations', (req, res) => {
  const { data } = req.body;
  const timestamp = new Date().toISOString();
  
  const row = [
    timestamp,
    data.size,
    data.age,
    data.propertyType || '',
    data.windowType,
    data.wallType,
    data.floorType,
    data.roofType,
    data.heatLoss
  ].join(',');

  try {
    if (!existsSync(CSV_FILE)) {
      writeFile(CSV_FILE, HEADERS.join(',') + '\n', 'utf8', (err) => {
        if (err) throw err;
      });
    }
    
    appendFile(CSV_FILE, row + '\n', 'utf8', (err) => {
      if (err) throw err;
      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use(express.static(DIST_DIR));

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(join(DIST_DIR, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});