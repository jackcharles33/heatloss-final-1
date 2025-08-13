import { HEAT_LOSS_WEIGHTINGS } from './constants/weightings';

interface ElementHeatLossInputs {
  netWallArea: number;
  glazingArea: number;
  floorArea: number;
  roofArea: number;
  wallUValue: number;
  windowUValue: number;
  floorUValue: number;
  roofUValue: number;
  tempDiff: number;
}

interface ElementHeatLoss {
  wallLoss: number;
  windowLoss: number;
  floorLoss: number;
  roofLoss: number;
}

export function calculateElementHeatLoss(inputs: ElementHeatLossInputs): ElementHeatLoss {
  // Calculate raw heat loss values
  const rawWallLoss = inputs.netWallArea * inputs.wallUValue * inputs.tempDiff;
  const rawWindowLoss = inputs.glazingArea * inputs.windowUValue * inputs.tempDiff;
  const rawFloorLoss = inputs.floorArea * inputs.floorUValue * inputs.tempDiff;
  const rawRoofLoss = inputs.roofArea * inputs.roofUValue * inputs.tempDiff;

  // Apply weightings
  return {
    wallLoss: rawWallLoss * (HEAT_LOSS_WEIGHTINGS.WALLS / 0.25), // Normalize to 25% weighting
    windowLoss: rawWindowLoss * (HEAT_LOSS_WEIGHTINGS.WINDOWS / 0.10), // Normalize to 10% weighting
    floorLoss: rawFloorLoss * (HEAT_LOSS_WEIGHTINGS.FLOOR / 0.10), // Normalize to 10% weighting
    roofLoss: rawRoofLoss * (HEAT_LOSS_WEIGHTINGS.ROOF / 0.25) // Normalize to 25% weighting
  };
}