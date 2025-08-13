# Critical Constants Requiring Validation

## Overview
Several constants in our heat loss prediction model lack proper documentation and empirical basis. These constants significantly impact prediction accuracy and must be validated.

## Constants Requiring Immediate Attention

### 1. U-Value Scaling Factor: 0.25
**Location**: `predictor.ts`, `mlModel.ts`
**Impact**: High - affects all predictions
**Current Status**: Undocumented magic number

**Questions**:
- Was this derived from regression analysis?
- What is the statistical confidence interval?
- How sensitive are predictions to changes in this value?

**Validation Steps**:
1. Perform regression analysis on training data
2. Test correlation between U-value factors and actual heat loss
3. Establish confidence intervals
4. Document methodology

### 2. Roof Baseline U-Value: 0.11
**Location**: `predictor.ts`
**Impact**: Medium - affects roof factor calculations
**Current Status**: Appears to match building regulations but undocumented

**Questions**:
- Is this based on Part L Building Regulations?
- Should this be updated for current standards?
- Does this represent optimal insulation performance?

**Validation Steps**:
1. Verify against current building standards
2. Check against training data roof performance
3. Consider regional variations

### 3. Roof U-Value Range: 2.19
**Location**: `predictor.ts`
**Impact**: Medium - affects roof factor scaling
**Current Status**: CRITICAL DISCREPANCY FOUND

**Issue**: Our roof types range from 0.11 to 1.495 (range = 1.385), but we use 2.19
**Questions**:
- Where does 2.19 come from?
- Is this based on older data or different roof types?
- Should this be recalculated from current roof types?

**Immediate Action Required**:
1. Investigate source of 2.19 value
2. Recalculate based on actual roof type ranges
3. Test impact on predictions

## Recommended Validation Process

### Phase 1: Data Analysis
1. Analyze training data to establish empirical ranges
2. Perform correlation analysis between constants and outcomes
3. Identify outliers and edge cases

### Phase 2: Statistical Validation
1. Regression analysis to derive optimal constants
2. Cross-validation to test stability
3. Sensitivity analysis for each constant

### Phase 3: Documentation
1. Document methodology for each constant
2. Establish confidence intervals
3. Create validation tests

### Phase 4: Implementation
1. Update constants based on analysis
2. Implement validation checks
3. Monitor prediction accuracy

## Impact Assessment

**High Impact Constants**:
- U-Value Scaling Factor (0.25) - affects all predictions by ±25%

**Medium Impact Constants**:
- Roof constants - affect predictions by ±10-15%

**Recommendation**: Prioritize validation of high-impact constants first.

## Next Steps

1. **Immediate**: Investigate roof U-value range discrepancy
2. **Short-term**: Perform regression analysis on U-value scaling factor
3. **Medium-term**: Establish comprehensive validation framework
4. **Long-term**: Implement automated constant validation in CI/CD