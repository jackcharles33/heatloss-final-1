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