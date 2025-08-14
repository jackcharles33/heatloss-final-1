import { BaseHouseData } from '../types/HouseData';
import { wallTypes, floorTypes } from '../constants/buildingData';
import { getWindowUValue } from './normalization';
// import { MODEL_CONSTANTS } from './constants/modelConstants';

export function calculateUValueFactor(input: Partial<BaseHouseData>): number {
  const wallUValue = wallTypes[input.wallType as keyof typeof wallTypes]?.uValue || 0.5;
  const floorUValue = floorTypes[input.floorType as keyof typeof floorTypes]?.uValue || 0.5;
  const windowUValue = getWindowUValue(input.windowType || 'double');
  
  // CRITICAL: This averaging method needs validation
  // Should different elements have different weightings?
  const averageUValue = (wallUValue + floorUValue + windowUValue) / 3;
  
  return averageUValue;
}
