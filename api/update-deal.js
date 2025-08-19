export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { dealId, heatLoss } = request.body;
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!dealId || !heatLoss || !hubspotToken) {
    return response.status(400).json({ message: 'Missing required parameters or server configuration.' });
  }

  const hubspotApiUrl = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

  try {
    const apiResponse = await fetch(hubspotApiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${hubspotToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          pre_survey_heatloss_estimate: heatLoss.toFixed(2)
        }
      })
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(`HubSpot API Error: ${errorData.message}`);
    }

    const data = await apiResponse.json();
    response.status(200).json({ success: true, data });
  } catch (error) {
    response.status(500).json({ success: false, message: error.message });
  }
}
