import axios from 'axios';

const CLIENT_ID = process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const ENV = process.env.PAYPAL_ENV || 'sandbox';

const BASE_URL = ENV === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

// Recupera l'Access Token OAuth2 da PayPal
export async function getPayPalAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('Credenziali PayPal mancanti (VITE_PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)');
  }

  try {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      `${BASE_URL}/v1/oauth2/token`,
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
    console.error('Error getting PayPal Access Token:', error.response?.data || error.message);
    throw new Error('Impossibile autenticarsi con PayPal API: ' + (error.response?.data?.error_description || error.message));
  }
}

// Crea un ordine su PayPal per il checkout
export async function createPayPalOrder(amount) {
  const token = await getPayPalAccessToken();

  try {
    const response = await axios.post(
      `${BASE_URL}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: parseFloat(amount).toFixed(2)
            }
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // Ritorna l'ordine contenente l'ID dell'ordine PayPal
  } catch (error) {
    console.error('Error creating PayPal Order:', error.response?.data || error.message);
    throw new Error('Impossibile creare l\'ordine su PayPal: ' + (error.response?.data?.message || error.message));
  }
}

// Cattura il pagamento una volta che l'utente ha autorizzato
export async function capturePayPalOrder(orderId) {
  const token = await getPayPalAccessToken();

  try {
    const response = await axios.post(
      `${BASE_URL}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data; // Ritorna lo stato del pagamento catturato
  } catch (error) {
    console.error('Error capturing PayPal Order:', error.response?.data || error.message);
    throw new Error('Impossibile completare il pagamento PayPal: ' + (error.response?.data?.message || error.message));
  }
}
