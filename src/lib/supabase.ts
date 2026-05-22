import { createClient } from '@supabase/supabase-js';

// Public anon key — safe to expose in client-side code.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel dashboard
// (Project Settings → Environment Variables) for production deploys.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://aeopqpezszvcubpnembg.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlb3BxcGV6c3p2Y3VicG5lbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDk0NDMsImV4cCI6MjA5NDk4NTQ0M30.S83EiOC_UmihBtumkYpYl3Y5n5ODq8iD9BTCc5U0t9c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface HeatLossCalculation {
  postcode?: string;
  address?: string;
  size?: number;
  age?: string;
  property_type?: string;
  wall_type?: string;
  floor_type?: string;
  window_type?: string;
  roof_type?: string;
  predicted_heatloss_w?: number;
  confidence_score?: number;
  lower_bound_w?: number;
  upper_bound_w?: number;
}

export async function saveCalculation(data: HeatLossCalculation): Promise<void> {
  const { error } = await supabase
    .from('heat_loss_calculations')
    .insert([data]);

  if (error) {
    // Non-fatal — log but don't surface to the user
    console.error('[Supabase] Failed to save calculation:', error.message);
  } else {
    console.log('[Supabase] Calculation saved.');
  }
}
