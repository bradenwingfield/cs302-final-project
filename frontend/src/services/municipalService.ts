import { Municipal } from '../types/municipal';

const API_URL = 'http://localhost:5000/api/municipal';

export const getMunicipals = async (): Promise<Municipal[]> => {
  try {
    console.log('Making request to:', API_URL);
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch municipals: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error in getMunicipals:', error);
    throw error;
  }
}; 