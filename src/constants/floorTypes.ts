export const floorTypes = {
  // --- Concrete (Values Confirmed) ---
  'concrete-0': { name: 'Concrete Uninsulated', uValue: 0.70 },
  'concrete-25': { name: 'Concrete 25mm insulation', uValue: 0.55 },
  'concrete-50': { name: 'Concrete 50mm insulation', uValue: 0.40 },
  'concrete-75': { name: 'Concrete 75mm insulation', uValue: 0.28 },
  'concrete-100': { name: 'Concrete 100mm insulation', uValue: 0.24 },

  // --- UPDATED: Suspended Timber Floors ---
  'suspended-0': { name: 'Suspended Timber Uninsulated', uValue: 0.80 },
  'suspended-25': { name: 'Suspended Timber 25mm insulation', uValue: 0.55 },
  'suspended-50': { name: 'Suspended Timber 50mm insulation', uValue: 0.40 },
  'suspended-75': { name: 'Suspended Timber 75mm insulation', uValue: 0.28 },
  'suspended-100': { name: 'Suspended Timber 100mm insulation', uValue: 0.24 }
} as const;
