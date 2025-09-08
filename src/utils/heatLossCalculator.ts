import { UKRegions, wallTypes, windowTypes, floorTypes, roofTypes } from '../constants/buildingData';
import { CalculatorInputs, CalculationResults } from '../types/calculator';
import { ageMultipliers } from './ageCalculations';
import { PropertyAge } from '../types/HouseData';
import { calculateAreas } from './areaCalculations';
import { calculateElementHeatLoss } from './elementHeatLoss';

export function calculateHeatLoss(inputs: CalculatorInputs): CalculationResults {
  // Get base temperature from region
  const baseTemp = UKRegions[inputs.region as keyof typeof UKRegions]?.baseTemp || -3.2;
  const tempDiff = inputs.indoorTemp - baseTemp;
  
  // Get U-values for construction elements
  const wallUValue = wallTypes[inputs.wallType as keyof typeof wallTypes]?.uValue || 1.7;
  const windowUValue = windowTypes[inputs.windowType as keyof typeof windowTypes]?.uValue || 2.8;
  const floorUValue = floorTypes[inputs.floorType as keyof typeof floorTypes]?.uValue || 0.4;
  const roofUValue = roofTypes[inputs.roofType as keyof typeof roofTypes]?.uValue || 0.34;
  
  // Calculate areas using the new, more accurate method
  const { netWallArea, glazingArea, floorArea, roofArea } = calculateAreas({
    ...inputs,
    // Add propertyType to inputs for area calculation
    propertyType: 'Detached' // This should be updated to use the actual input from the form
  });
  
  // Calculate heat loss for each element (W)
  const { wallLoss, windowLoss, floorLoss, roofLoss } = calculateElementHeatLoss({
    netWallArea,
    glazingArea,
    floorArea,
    roofArea,
    wallUValue,
    windowUValue,
    floorUValue,
    roofUValue,
    tempDiff
  });
  
  // Apply age multiplier
  const ageMultiplier = ageMultipliers[inputs.age as PropertyAge];
  if (!ageMultiplier) {
    console.error('Age multiplier not found for:', inputs.age);
  }
  
  const totalHeatLossWatts = (wallLoss + windowLoss + floorLoss + roofLoss);
  // The age multiplier should adjust the raw physics loss
  const finalHeatLoss = (totalHeatLossWatts * (ageMultiplier || 1));

  return {
    totalHeatLoss: finalHeatLoss,
    breakdown: {
      walls: (wallLoss / 1000).toFixed(1),
      windows: (windowLoss / 1000).toFixed(1),
      floor: (floorLoss / 1000).toFixed(1),
      roof: (roofLoss / 1000).toFixed(1)
    }
  };
}
