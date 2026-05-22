/**
 * Vercel Serverless Function: /api/certificate
 * Proxies a certificate detail lookup to the UK Gov EPC API.
 * GET /api/certificate?certificate_number=9370-3673-7120-2199-4231
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { certificate_number } = req.query;
  if (!certificate_number) {
    return res.status(400).json({ error: "Missing required parameter 'certificate_number'" });
  }

  const apiKey = process.env.EPC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'EPC_API_KEY environment variable is not set' });
  }

  const govUrl = 'https://api.get-energy-performance-data.communities.gov.uk/api/certificate';
  const fullUrl = `${govUrl}?certificate_number=${encodeURIComponent(certificate_number.trim())}`;

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
    console.error('[/api/certificate] Error:', err);
    res.status(500).json({ error: `Proxy error: ${err.message}` });
  }
}
