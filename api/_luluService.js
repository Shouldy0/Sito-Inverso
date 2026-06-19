import axios from 'axios';

// Variabili d'ambiente (su Vercel sono iniettate in process.env in automatico)
const API_KEY = process.env.LULU_API_KEY;
const API_SECRET = process.env.LULU_API_SECRET;
const ENV = process.env.LULU_ENV || 'sandbox';

const BASE_URL = ENV === 'sandbox' 
  ? 'https://api.sandbox.lulu.com' 
  : 'https://api.lulu.com';

const AUTH_URL = `${BASE_URL}/auth/realms/glasstree/protocol/openid-connect/token`;

export async function getAccessToken() {
  if (API_KEY === 'test_api_key_sandbox' || !API_KEY) {
    return 'mock_access_token';
  }

  try {
    const authString = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
    const response = await axios.post(
      AUTH_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Lulu Access Token:', error.response?.data || error.message);
    throw new Error('Impossibile autenticarsi con Lulu API');
  }
}

export async function createPrintJob(orderData) {
  const token = await getAccessToken();

  if (token === 'mock_access_token') {
    console.log('--- SIMULAZIONE ORDINE LULU ---');
    console.log(JSON.stringify(orderData, null, 2));
    return {
      status: 'CREATED',
      id: `mock-job-${Date.now()}`,
      estimated_shipping_costs: [{ total_cost: '5.00' }]
    };
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/print-jobs/`,
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating Lulu Print Job:', error.response?.data || error.message);
    throw new Error('Impossibile inviare l\'ordine a Lulu: ' + (error.response?.data?.detail || error.message));
  }
}
