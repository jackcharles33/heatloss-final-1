import { PropertyType } from '../types/HouseData';

interface AreaInputs {
  floorArea: string;
  stories: number;
  glazingRatio: number;
  propertyType?: PropertyType;
}

interface AreaCalculations {
  wallArea: number;
  glazingArea: number;
  netWallArea: number;
  floorArea: number;
  roofArea: number;
}

/**
 * Estimates the dimensions of a building based on its floor area and type.
 * This is more accurate than assuming the building is a perfect square.
 * @param floorArea The total floor area of the property.
 * @param propertyType The type of the property (Detached, Terrace, etc.).
 * @returns An object containing the estimated length and width.
 */
function getEstimatedDimensions(floorArea: number, propertyType?: PropertyType): { length: number, width: number } {
  // Define typical length-to-width ratios for different property types
  const ratios: Record<PropertyType, number> = {
    'Detached': 1.2, // Tends to be wider
    'Semi-Detached / End-Terrace': 1.5,
    'Terrace': 2.0, // Tends to be narrower and deeper
    'Bungalow': 1.3,
    'End of Terrace': 1.5, // Same as Semi-Detached
  };

  const ratio = ratios[propertyType || 'Detached'];

  // Calculate width and length from area and ratio (Area = L*W, L = ratio*W)
  // Area = (ratio * W) * W => Area / ratio = W^2
  const width = Math.sqrt(floorArea / ratio);
  const length = width * ratio;

  return { length, width };
}

export function calculateAreas(inputs: AreaInputs): AreaCalculations {
  const singleFloorArea = parseFloat(inputs.floorArea) / Math.max(1, inputs.stories);
  const { length, width } = getEstimatedDimensions(singleFloorArea, inputs.propertyType);

  // Calculate the building's perimeter
  const perimeter = 2 * (length + width);

  const wallHeight = inputs.stories * 2.4; // Standard 2.4m per story
  const wallArea = perimeter * wallHeight;

  const glazingArea = wallArea * (inputs.glazingRatio / 100);
  const netWallArea = wallArea - glazingArea;
  const floorAreaNum = parseFloat(inputs.floorArea);

  // Roof area is the footprint of the house
  const roofArea = singleFloorArea;

  return {
    wallArea,
    glazingArea,
    netWallArea,
    floorArea: floorAreaNum,
    roofArea
  };
}
