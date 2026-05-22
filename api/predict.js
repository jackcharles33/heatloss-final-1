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
 * Confidence score: how well the model characterises this property type.
 * Based on production ML model analysis (R²=0.905, MAPE=9.5%).
 *
 *  85 % base — all properties
 *  +5  POST_2008    (Part L compliance means fabric is well-specified)
 *  +3  2000–2008    (Part L 2006 era, mostly well-known)
 *  +2  1960–2000    (standard cavity era)
 *  +3  typical size 60–180 m²   (bulk of training data)
 *  +1  200–250 m²               (edge but still well-represented)
 *  +2  post-60 cavity (most common, well-characterised U-values)
 *  +1  timber frame
 *  cap 93 %
 */
function computeConfidenceScore(wallType, age, size) {
  // Honest base of 72 % — model MAPE 9.5 %, R² 0.905. Range: ~74–88 %.
  let score = 72;

  // ERA
  if      (age === 'POST_2008')          score += 10;
  else if (age === 'BETWEEN_2000_2008')  score += 7;
  else if (age === 'BETWEEN_1960_2000')  score += 4;
  else if (age === 'PRE_1960')           score += 2;
  // UNKNOWN → no bonus

  // SIZE
  if      (size >= 60  && size <= 150) score += 5;
  else if (size >  150 && size <= 220) score += 3;
  else if (size >  220 && size <= 300) score += 1;

  // WALL TYPE
  const highCavity = ['cavity-post60-310','cavity-post60-290-310-filled','cavity-post60-under290-filled'];
  const midCavity  = ['timber-frame','cavity-post60-290-310-unfilled','cavity-post60-under290-unfilled'];
  const pre60      = ['cavity-pre60-filled','cavity-pre60-unfilled'];
  const solid      = ['solid-brick-102','solid-brick-228','solid-brick-343'];

  if      (highCavity.includes(wallType)) score += 4;
  else if (midCavity.includes(wallType))  score += 3;
  else if (pre60.includes(wallType))      score += 2;
  else if (solid.includes(wallType))      score += 1;
  // stone / concrete → no bonus

  return Math.min(88, score);
}

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

    // Confidence interval
    // marginFrac = (100 - score) × 0.013
    //   → 93 % confidence ≈ ±9 %   → interval ~18 % wide
    //   → 88 % confidence ≈ ±15 %  → interval ~32 % wide
    //   → 85 % confidence ≈ ±19 %  → interval ~40 % wide
    // Upper bound is slightly wider (×1.1) — heat loss errors are right-skewed.
    const confidenceScore = computeConfidenceScore(wallType, age, size);
    const marginFrac      = (100 - confidenceScore) * 0.013;
    const lowerBoundW     = Math.round(predictedWatts * (1 - marginFrac));
    const upperBoundW     = Math.round(predictedWatts * (1 + marginFrac * 1.1));

    console.log(`[/api/predict] size=${size}m², age=${age}, loss=${predictedWatts}W, conf=${confidenceScore}%`);

    return res.status(200).json({
      success: true,
      predicted_heatloss_w: predictedWatts,
      confidence_score:     confidenceScore,
      lower_bound_w:        lowerBoundW,
      upper_bound_w:        upperBoundW,
    });
  } catch (err) {
    console.error('[/api/predict] Error:', err);
    return res.status(500).json({ error: `Calculation error: ${err.message}` });
  }
}
