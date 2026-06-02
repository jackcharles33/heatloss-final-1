import { PropertyAge } from '../types/HouseData';

// Maps each property age band to the wall type keys that are valid for that era
export const wallTypesByAge: Record<PropertyAge, string[]> = {
  '': [], // No age selected — show all wall types until user picks one
  PRE_1960: [
    'solid-brick-102',
    'solid-brick-228',
    'solid-brick-343',
    'cavity-pre60-unfilled',
    'cavity-pre60-filled',
  ],
  BETWEEN_1960_2000: [
    'cavity-post60-310',
    'cavity-post60-290-310-filled',
    'cavity-post60-290-310-unfilled',
    'cavity-post60-under290-filled',
    'cavity-post60-under290-unfilled',
    'timber-frame',
  ],
  BETWEEN_2000_2008: [
    'cavity-post60-310',
    'cavity-post60-290-310-filled',
    'cavity-post60-290-310-unfilled',
    'cavity-post60-under290-filled',
    'cavity-post60-under290-unfilled',
    'timber-frame',
  ],
  POST_2008: [
    'cavity-post60-310',
    'cavity-post60-290-310-filled',
    'cavity-post60-290-310-unfilled',
    'cavity-post60-under290-filled',
    'cavity-post60-under290-unfilled',
    'timber-frame',
  ],
};

export const wallTypes = {
  // --- BRICK (Values Confirmed) ---
  'solid-brick-102': { name: 'Solid Brick 102mm', uValue: 2.97 },
  'solid-brick-228': { name: 'Solid Brick 228mm', uValue: 2.11 },
  'solid-brick-343': { name: 'Solid Brick 343mm', uValue: 1.64 },
  'cavity-pre60-unfilled': { name: 'Brick Cavity Pre-1960 (Unfilled)', uValue: 1.37 },
  'cavity-pre60-filled': { name: 'Brick Cavity Pre-1960 (Filled)', uValue: 0.56 },
  'cavity-post60-310': { name: 'Brick Cavity Post-1960 310mm', uValue: 0.27 },
  'cavity-post60-290-310-filled': { name: 'Brick Cavity Post-1960 290-310mm (Filled)', uValue: 0.42 },
  'cavity-post60-290-310-unfilled': { name: 'Brick Cavity Post-1960 290-310mm (Unfilled)', uValue: 0.77 },
  'cavity-post60-under290-filled': { name: 'Brick Cavity Post-1960 <290mm (Filled)', uValue: 0.45 },
  'cavity-post60-under290-unfilled': { name: 'Brick Cavity Post-1960 <290mm (Unfilled)', uValue: 0.87 },
  'timber-frame': { name: 'Timber Frame', uValue: 0.43 },

  // --- NEW: STONE (REMOVED - NOT IN TRAINING) ---
  // 'stone-305': { name: 'Solid Stone 305mm', uValue: 2.78 },
  // 'stone-457': { name: 'Solid Stone 457mm', uValue: 2.23 },
  // 'stone-610': { name: 'Solid Stone 610mm', uValue: 1.88 },

  // --- NEW: RENDER (REMOVED - NOT IN TRAINING) ---
  // 'render-pre60-filled': { name: 'Render Cavity Pre-1960 (Filled)', uValue: 0.54 },
  // ... (Removed all Render)

  // --- NEW: TILES (REMOVED - NOT IN TRAINING) ---
  // ... (Removed all Tiles)

  // --- NEW: SHIPLAP BOARD (REMOVED - NOT IN TRAINING) ---
  // ... (Removed all Shiplap)
} as const;

export const windowTypes = {
  // --- UPDATED: Wood/PVC ---
  'wood-pvc-single': { name: 'Wood/PVC Single Glazed', uValue: 4.80 },
  'wood-pvc-double': { name: 'Wood/PVC Double Glazed', uValue: 2.80 },
  'wood-pvc-double-le': { name: 'Wood/PVC Double Glazed (Low-E)', uValue: 2.30 },
  'wood-pvc-triple': { name: 'Wood/PVC Triple Glazed', uValue: 2.10 },
  'wood-pvc-triple-le': { name: 'Wood/PVC Triple Glazed (Low-E)', uValue: 1.70 },

  // --- NEW: Metal (REMOVED - NOT IN TRAINING) ---
  // 'metal-single': { name: 'Metal Single Glazed', uValue: 5.70 },
  // ...
} as const;
