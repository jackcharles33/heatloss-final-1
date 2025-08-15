import { CalculationData, APIResponse } from './types';

export async function saveCalculation(data: CalculationData): Promise<APIResponse> {
  try {
    const response = await fetch('/api/calculations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save calculation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving calculation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}


export async function updateHubSpotDeal(dealId: string, heatLoss: number): Promise<void> {
  try {
    const response = await fetch('/api/update-hubspot-deal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dealId, heatLoss }),
    });
    if (!response.ok) throw new Error('Failed to update HubSpot deal');
    console.log('Successfully updated HubSpot deal.');
  } catch (error) {
    console.error('Error updating HubSpot:', error);
  }
}