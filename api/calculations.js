/**
 * Vercel Serverless Function: /api/calculations
 * Accepts a heat loss calculation record.
 *
 * Note: The original server.py wrote rows to a local CSV file, which is not
 * possible on Vercel (ephemeral filesystem). Calculations are persisted locally
 * via IndexedDB (idb) in the browser. If you want server-side persistence,
 * connect Supabase by setting VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY —
 * the src/db/ layer is already wired for it.
 *
 * POST /api/calculations
 * Body: { data: { size, age, propertyType, wallType, floorType, windowType, roofType, heatLoss } }
 * Returns: { success: true }
 */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Log for Vercel function logs (visible in the dashboard)
  const { data } = req.body || {};
  if (data) {
    console.log('[/api/calculations] Received:', JSON.stringify(data));
  }

  return res.status(200).json({ success: true });
}
