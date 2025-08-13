/**
 * Model Constants for Heat Loss Calculations
 * 
 * These constants are critical to the final heat loss prediction and require proper documentation
 * and validation. Currently, their origins need to be established through proper analysis.
 */

export const MODEL_CONSTANTS = {
  /**
   * U-Value Factor Scaling Constant: 0.25
   * 
   * CURRENT STATUS: UNDOCUMENTED - REQUIRES VALIDATION
   * 
   * This constant scales the U-value factor adjustment in the prediction model.
   * It determines how much the building fabric performance affects the final prediction.
   * 
   * Used in: predictor.ts
   * Formula: adjustedPrediction = rawPrediction * (1 + (uValueFactor * 0.25))
   * 
   * QUESTIONS TO RESOLVE:
   * - Is this derived from regression analysis of training data?
   * - Was this manually tuned based on validation results?
   * - What is the statistical basis for this value?
   * 
   * IMPACT: A 25% change in this value significantly affects all predictions
   * RECOMMENDATION: Conduct regression analysis to derive this empirically
   */
  U_VALUE_SCALING_FACTOR: 0.25,

  /**
   * Roof U-Value Baseline: 0.11
   * 
   * CURRENT STATUS: UNDOCUMENTED - REQUIRES VALIDATION
   * 
   * This represents the baseline roof U-value used in roof factor calculations.
   * It appears to represent a "best case" or reference roof insulation level.
   * 
   * Used in: predictor.ts
   * Formula: roofFactor = 1 + ((roofUValue - 0.11) / 2.19)
   * 
   * QUESTIONS TO RESOLVE:
   * - Does 0.11 represent the U-value of 300mm loft insulation?
   * - Is this based on Building Regulations Part L requirements?
   * - Why was this specific value chosen as the baseline?
   * 
   * CONTEXT: Modern building regs target ~0.11-0.13 W/m²K for roofs
   * RECOMMENDATION: Verify against current building standards
   */
  ROOF_BASELINE_U_VALUE: 0.11,

  /**
   * Roof U-Value Range: 2.19
   * 
   * CURRENT STATUS: UNDOCUMENTED - REQUIRES VALIDATION
   * 
   * This represents the range of roof U-values used for normalization.
   * It's the denominator in the roof factor calculation.
   * 
   * Used in: predictor.ts
   * Formula: roofFactor = 1 + ((roofUValue - 0.11) / 2.19)
   * 
   * QUESTIONS TO RESOLVE:
   * - Is this the difference between worst and best roof U-values?
   * - Does this represent: (uninsulated_roof_u_value - best_roof_u_value)?
   * - Was this derived from the range in our roof types constants?
   * 
   * ANALYSIS NEEDED:
   * From our roofTypes: max = 1.495 (uninsulated), min = 0.11 (300mm)
   * Range = 1.495 - 0.11 = 1.385 (NOT 2.19)
   * 
   * CRITICAL: This discrepancy needs immediate investigation
   */
  ROOF_U_VALUE_RANGE: 2.19,

  /**
   * ML Model Maximum Size: 300
   * 
   * CURRENT STATUS: PARTIALLY DOCUMENTED
   * 
   * Used for normalizing property size in ML model input.
   * Should represent the maximum property size in training data.
   * 
   * RECOMMENDATION: Verify against actual training data maximum
   */
  MAX_PROPERTY_SIZE: 300,

  /**
   * Confidence Score Threshold: 10
   * 
   * CURRENT STATUS: ARBITRARY
   * 
   * Number of similar cases needed for maximum confidence.
   * Currently set arbitrarily - should be based on statistical analysis.
   */
  CONFIDENCE_THRESHOLD: 10
} as const;

/**
 * URGENT ACTIONS REQUIRED:
 * 
 * 1. VALIDATE U_VALUE_SCALING_FACTOR (0.25):
 *    - Perform regression analysis on training data
 *    - Test sensitivity of predictions to this value
 *    - Document statistical basis
 * 
 * 2. VERIFY ROOF CONSTANTS (0.11, 2.19):
 *    - Check against actual roof U-value ranges
 *    - Validate baseline choice
 *    - Resolve discrepancy in range calculation
 * 
 * 3. ESTABLISH EMPIRICAL BASIS:
 *    - All constants should be derived from data analysis
 *    - Document methodology for each constant
 *    - Implement validation tests
 * 
 * 4. SENSITIVITY ANALYSIS:
 *    - Test how changes in these constants affect predictions
 *    - Establish confidence intervals
 *    - Document acceptable ranges
 */