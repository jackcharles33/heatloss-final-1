import { UKRegions } from './regions';
import { wallTypes, windowTypes } from './construction';
import { floorTypes } from './floorTypes';

export const roofTypes = {
  // --- UPDATED: Pitched Roofs ---
  'pitched-0': { name: 'Pitched Roof Uninsulated', uValue: 2.51 },
  'pitched-50': { name: 'Pitched Roof 50mm Insulation', uValue: 0.60 },
  'pitched-100': { name: 'Pitched Roof 100mm Insulation', uValue: 0.34 },
  'pitched-200': { name: 'Pitched Roof 200mm Insulation', uValue: 0.18 },
  'pitched-300': { name: 'Pitched Roof 300mm Insulation', uValue: 0.12 },

  // --- NEW: Flat Roofs ---
  'flat-0': { name: 'Flat Roof Uninsulated', uValue: 1.69 },
  'flat-50': { name: 'Flat Roof 50mm Insulation', uValue: 0.53 },
  'flat-100': { name: 'Flat Roof 100mm Insulation', uValue: 0.32 },
  'flat-200': { name: 'Flat Roof 200mm Insulation', uValue: 0.17 },
  'flat-300': { name: 'Flat Roof 300mm Insulation', uValue: 0.12 }
} as const;

export { UKRegions, wallTypes, windowTypes, floorTypes };
