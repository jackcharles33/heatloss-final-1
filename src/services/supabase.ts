import { createClient } from '@supabase/supabase-js';
import { BaseHouseData } from '../types/HouseData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient>;

try {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.warn('Supabase initialization failed:', error);
  // Create a mock client that logs operations but doesn't fail
  supabase = {
    from: () => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: [], error: null })
    })
  } as any;
}

export { supabase };

interface CalculationData extends BaseHouseData {
  krakenValue?: number;
}

export async function saveCalculation(data: CalculationData): Promise<void> {
  try {
    const { error } = await supabase
      .from('calculations')
      .insert({
        size: data.size,
        age: data.age,
        property_type: data.propertyType,
        window_type: data.windowType,
        wall_type: data.wallType,
        floor_type: data.floorType,
        roof_type: data.roofType,
        heat_loss: data.heatLoss,
        kraken_value: data.krakenValue
      });

    if (error) {
      console.warn('Supabase operation failed:', error);
    }
  } catch (error) {
    console.warn('Error saving calculation:', error);
  }
}