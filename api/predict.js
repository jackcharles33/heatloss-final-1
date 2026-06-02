/**
 * Vercel Serverless Function: /api/predict
 * Physics-based heat loss calculation (ported from server.py).
 * POST /api/predict
 * Body: { size, age, propertyType, wallType, floorType, windowType, roofType }
 * Returns: { success: true, predicted_heatloss_w: number }
 */

// U-values (W/m²K) — must match server.py and src/constants/
const WALL_TYPES = {
  'solid-brick-102': 2.97,
  'solid-brick-228': 2.11,
  'solid-brick-343': 1.64,
  'cavity-pre60-unfilled': 1.37,
  'cavity-pre60-filled': 0.56,
  'cavity-post60-310': 0.27,
  'cavity-post60-290-310-filled': 0.42,
  'cavity-post60-290-310-unfilled': 0.77,
  'cavity-post60-under290-filled': 0.45,
  'cavity-post60-under290-unfilled': 0.87,
  'timber-frame': 0.43,
};

const WINDOW_TYPES = {
  'wood-pvc-single': 4.80,
  'wood-pvc-double': 2.80,
  'wood-pvc-double-le': 2.30,
  'wood-pvc-triple': 2.10,
  'wood-pvc-triple-le': 1.70,
};

const FLOOR_TYPES = {
  'concrete-0': 0.70,
  'concrete-25': 0.55,
  'concrete-50': 0.40,
  'concrete-75': 0.28,
  'concrete-100': 0.24,
  'suspended-0': 0.80,
  'suspended-25': 0.55,
  'suspended-50': 0.40,
  'suspended-75': 0.28,
  'suspended-100': 0.24,
};

const ROOF_TYPES = {
  'pitched-0': 2.51,
  'pitched-50': 0.60,
  'pitched-100': 0.34,
  'pitched-200': 0.18,
  'pitched-300': 0.12,
  'flat-0': 1.69,
  'flat-50': 0.53,
  'flat-100': 0.32,
  'flat-200': 0.17,
  'flat-300': 0.12,
};

const AGE_MULTIPLIERS = {
  PRE_1960: 1.2,
  BETWEEN_1960_2000: 1.15,
  BETWEEN_2000_2008: 1.10,
  POST_2008: 1.0,
};

const RATIOS = {
  Detached: 1.2,
  'Semi-Detached / End-Terrace': 1.5,
  Terrace: 2.0,
  Bungalow: 1.3,
  'End of Terrace': 1.5,
};

/**
 * Physics-only fallback — no ML model available on Vercel.
 * Confidence interval is estimated using a fixed ±15% margin (MAPE of the
 * physics-only approach). This is less precise than the ML model's per-prediction
 * quantile regression intervals, but honest about the limitation.
 */
const PHYSICS_MARGIN = 0.15; // ~15% average error for physics-only calc

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      size = 100,
      age = 'BETWEEN_1960_2000',
      propertyType = 'Detached',
      wallType = 'cavity-post60-290-310-filled',
      floorType = 'concrete-75',
      windowType = 'wood-pvc-double',
      roofType = 'pitched-100',
    } = req.body;

    const stories = 2;
    const glazingRatio = 15;
    const indoorTemp = 21.0;
    const baseTemp = -3.2; // Standard UK design temperature
    const tempDiff = indoorTemp - baseTemp; // 24.2°C

    // U-values
    const wallU   = WALL_TYPES[wallType]   ?? 0.42;
    const windowU = WINDOW_TYPES[windowType] ?? 2.80;
    const floorU  = FLOOR_TYPES[floorType]  ?? 0.28;
    const roofU   = ROOF_TYPES[roofType]    ?? 0.34;

    // Building geometry
    const ratio           = RATIOS[propertyType] ?? 1.2;
    const singleFloorArea = size / stories;
    const width           = Math.sqrt(singleFloorArea / ratio);
    const length          = width * ratio;

    // Area calculations
    const perimeter    = 2 * (length + width);
    const wallHeight   = stories * 2.4;
    const wallArea     = perimeter * wallHeight;
    const glazingArea  = wallArea * (glazingRatio / 100);
    const netWallArea  = wallArea - glazingArea;
    const roofArea     = singleFloorArea;

    // Component losses (W)
    const wallLoss   = netWallArea  * wallU   * tempDiff;
    const windowLoss = glazingArea  * windowU * tempDiff;
    const floorLoss  = size         * floorU  * tempDiff;
    const roofLoss   = roofArea     * roofU   * tempDiff;

    // Apply age multiplier
    const ageMult         = AGE_MULTIPLIERS[age] ?? 1.15;
    const totalHeatloss   = (wallLoss + windowLoss + floorLoss + roofLoss) * ageMult;
    const predictedWatts  = Math.round(totalHeatloss);

    // Physics-only confidence interval — fixed margin (no ML quantile available here)
    const lowerBoundW = Math.round(predictedWatts * (1 - PHYSICS_MARGIN));
    const upperBoundW = Math.round(predictedWatts * (1 + PHYSICS_MARGIN));

    console.log(`[/api/predict] size=${size}m², age=${age}, loss=${predictedWatts}W (physics-only fallback)`);

    return res.status(200).json({
      success: true,
      predicted_heatloss_w: predictedWatts,
      confidence_score:     null, // Only available from ML model
      lower_bound_w:        lowerBoundW,
      upper_bound_w:        upperBoundW,
      is_physics_fallback:  true,
    });
  } catch (err) {
    console.error('[/api/predict] Error:', err);
    return res.status(500).json({ error: `Calculation error: ${err.message}` });
  }
}
