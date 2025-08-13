# House Heat Loss Calculator

A web application to calculate and predict house heat loss based on various factors including property type, age, and insulation levels.

## Features

- Interactive house diagram for input selection
- Real-time heat loss calculations
- Historical data tracking
- CSV export of calculations

## Setup

1. Clone the repository:
```bash
git clone YOUR_GITHUB_REPO_URL
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Data Storage

All calculations are stored in `data/calculations.csv` with the following format:
- timestamp
- size
- age
- propertyType
- windowType
- wallType
- floorType
- roofType
- heatLoss

## License

MIT