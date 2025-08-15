export default async function handler(request, response) {
    if (request.method !== 'POST') {
      return response.status(405).json({ message: 'Method Not Allowed' });
    }
  
    const { dealId, heatLoss } = request.body;
    const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN;
  
    if (!dealId || heatLoss === undefined) {
      return response.status(400).json({ message: 'Missing dealId or heatLoss' });
    }
  
    if (!hubspotToken) {
      console.error('Missing HubSpot Access Token in environment variables.');
      return response.status(500).json({ message: 'Server configuration error' });
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
      console.error('HubSpot update failed:', error);
      response.status(500).json({ success: false, message: error.message });
    }
  }