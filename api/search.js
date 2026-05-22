/**
 * Vercel Serverless Function: /api/search
 * Proxies a postcode search to the UK Gov EPC API.
 * GET /api/search?postcode=LS6 1AJ
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { postcode } = req.query;
  if (!postcode) {
    return res.status(400).json({ error: "Missing required parameter 'postcode'" });
  }

  const apiKey = process.env.EPC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'EPC_API_KEY environment variable is not set' });
  }

  const govUrl = 'https://api.get-energy-performance-data.communities.gov.uk/api/domestic/search';
  const fullUrl = `${govUrl}?postcode=${encodeURIComponent(postcode.trim())}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const body = await response.text();

    res.status(response.status)
      .setHeader('Content-Type', 'application/json')
      .send(body);
  } catch (err) {
    console.error('[/api/search] Error:', err);
    res.status(500).json({ error: `Proxy error: ${err.message}` });
  }
}
