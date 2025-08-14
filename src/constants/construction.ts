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

  // --- NEW: STONE ---
  'stone-305': { name: 'Solid Stone 305mm', uValue: 2.78 },
  'stone-457': { name: 'Solid Stone 457mm', uValue: 2.23 },
  'stone-610': { name: 'Solid Stone 610mm', uValue: 1.88 },

  // --- NEW: RENDER ---
  'render-pre60-filled': { name: 'Render Cavity Pre-1960 (Filled)', uValue: 0.54 },
  'render-pre60-unfilled': { name: 'Render Cavity Pre-1960 (Unfilled)', uValue: 1.25 },
  'render-post60-over290-filled': { name: 'Render Cavity Post-1960 >290mm (Filled)', uValue: 0.41 },
  'render-post60-over290-unfilled': { name: 'Render Cavity Post-1960 >290mm (Unfilled)', uValue: 0.73 },
  'render-post60-under290-filled': { name: 'Render Cavity Post-1960 <290mm (Filled)', uValue: 0.44 },
  'render-post60-under290-unfilled': { name: 'Render Cavity Post-1960 <290mm (Unfilled)', uValue: 0.82 },

  // --- NEW: TILES ---
  'tiles-solid-pre2000': { name: 'Tiles Solid Pre-2000', uValue: 0.58 },
  'tiles-solid-post2000': { name: 'Tiles Solid Post-2000', uValue: 0.43 },
  'tiles-cavity-over295-filled': { name: 'Tiles Cavity >295mm (Filled)', uValue: 0.34 },
  'tiles-cavity-over295-unfilled': { name: 'Tiles Cavity >295mm (Unfilled)', uValue: 0.44 },
  'tiles-cavity-under295-filled': { name: 'Tiles Cavity <295mm (Filled)', uValue: 0.36 },
  'tiles-cavity-under295-unfilled': { name: 'Tiles Cavity <295mm (Unfilled)', uValue: 0.78 },
  'tiles-timber-frame': { name: 'Tiles Timber Frame', uValue: 0.47 },

  // --- NEW: SHIPLAP BOARD ---
  'shiplap-cavity-pre2000-filled': { name: 'Shiplap Cavity Pre-2000 (Filled)', uValue: 0.32 },
  'shiplap-cavity-pre2000-unfilled': { name: 'Shiplap Cavity Pre-2000 (Unfilled)', uValue: 0.49 },
  'shiplap-cavity-post2008-over295-filled': { name: 'Shiplap Cavity Post-2008 >295mm (Filled)', uValue: 0.29 },
  'shiplap-cavity-post2008-over295-unfilled': { name: 'Shiplap Cavity Post-2008 >295mm (Unfilled)', uValue: 0.41 },
  'shiplap-cavity-post2008-under295-filled': { name: 'Shiplap Cavity Post-2008 <295mm (Filled)', uValue: 0.31 },
  'shiplap-cavity-post2008-under295-unfilled': { name: 'Shiplap Cavity Post-2008 <295mm (Unfilled)', uValue: 0.45 },
  'shiplap-timber-frame': { name: 'Shiplap Timber Frame', uValue: 0.44 },
} as const;

export const windowTypes = {
  // --- UPDATED: Wood/PVC ---
  'wood-pvc-single': { name: 'Wood/PVC Single Glazed', uValue: 4.80 },
  'wood-pvc-double': { name: 'Wood/PVC Double Glazed', uValue: 2.80 },
  'wood-pvc-double-le': { name: 'Wood/PVC Double Glazed (Low-E)', uValue: 2.30 },
  'wood-pvc-triple': { name: 'Wood/PVC Triple Glazed', uValue: 2.10 },
  'wood-pvc-triple-le': { name: 'Wood/PVC Triple Glazed (Low-E)', uValue: 1.70 },
  
  // --- NEW: Metal ---
  'metal-single': { name: 'Metal Single Glazed', uValue: 5.70 },
  'metal-double': { name: 'Metal Double Glazed', uValue: 3.40 },
  'metal-double-le': { name: 'Metal Double Glazed (Low-E)', uValue: 2.70 },
  'metal-triple': { name: 'Metal Triple Glazed', uValue: 2.50 },
  'metal-triple-le': { name: 'Metal Triple Glazed (Low-E)', uValue: 2.10 },
} as const;
