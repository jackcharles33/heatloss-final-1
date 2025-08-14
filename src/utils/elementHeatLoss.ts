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
  // Calculate the straightforward heat loss for each element in Watts.
  // The formula is: Area * U-Value * TemperatureDifference.
  const wallLoss = inputs.netWallArea * inputs.wallUValue * inputs.tempDiff;
  const windowLoss = inputs.glazingArea * inputs.windowUValue * inputs.tempDiff;
  const floorLoss = inputs.floorArea * inputs.floorUValue * inputs.tempDiff;
  const roofLoss = inputs.roofArea * inputs.roofUValue * inputs.tempDiff;

  return {
    wallLoss,
    windowLoss,
    floorLoss,
    roofLoss
  };
}
