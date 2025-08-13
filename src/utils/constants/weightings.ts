export const HEAT_LOSS_WEIGHTINGS = {
  ROOF: 0.25,    // 25% through roof
  WALLS: 0.25,   // 25% through walls
  WINDOWS: 0.10, // 10% through windows (part of the 35% walls+windows)
  FLOOR: 0.10    // 10% through floor
} as const;

// Validate weightings add up to expected total
const totalWeighting = Object.values(HEAT_LOSS_WEIGHTINGS).reduce((sum, weight) => sum + weight, 0);
if (Math.abs(totalWeighting - 0.7) > 0.001) { // Allow small floating point differences
  throw new Error(`Heat loss weightings must total 70% (walls+windows+roof+floor). Current total: ${(totalWeighting * 100).toFixed(1)}%`);
}