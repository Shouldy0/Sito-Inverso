import axios from 'axios';
import crypto from 'crypto';

const CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
const API_KEY = process.env.AIRWALLEX_API_KEY;
const ENV = process.env.AIRWALLEX_ENV || 'demo';

const BASE_URL = ENV === 'prod'
  ? 'https://api.airwallex.com/api/v1'
  : 'https://api-demo.airwallex.com/api/v1';

// Recupera l'Access Token OAuth2 da Airwallex
export async function getAirwallexAccessToken() {
  if (!CLIENT_ID || !API_KEY) {
    throw new Error('Credenziali Airwallex mancanti (AIRWALLEX_CLIENT_ID / AIRWALLEX_API_KEY)');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/authentication/login`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': CLIENT_ID,
          'x-api-key': API_KEY
        }
      }
    );
    return response.data.token;
  } catch (error) {
    console.error('Error getting Airwallex Token:', error.response?.data || error.message);
    throw new Error('Impossibile autenticarsi con Airwallex: ' + (error.response?.data?.message || error.message));
  }
}

// Crea un Payment Intent su Airwallex
export async function createAirwallexPaymentIntent(amount) {
  const token = await getAirwallexAccessToken();
  const requestId = crypto.randomUUID();

  try {
    const response = await axios.post(
      `${BASE_URL}/pa/payment_intents/create`,
      {
        request_id: requestId,
        amount: parseFloat(amount),
        currency: 'EUR',
        merchant_order_id: `INVERSO-AW-${Date.now()}`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data; // Ritorna l'oggetto PaymentIntent (contiene id e client_secret)
  } catch (error) {
    console.error('Error creating Airwallex Payment Intent:', error.response?.data || error.message);
    throw new Error('Errore nella creazione del PaymentIntent Airwallex: ' + (error.response?.data?.message || error.message));
  }
}

// Recupera lo stato di un Payment Intent su Airwallex
export async function retrieveAirwallexPaymentIntent(id) {
  const token = await getAirwallexAccessToken();

  try {
    const response = await axios.get(
      `${BASE_URL}/pa/payment_intents/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error retrieving Airwallex Payment Intent:', error.response?.data || error.message);
    throw new Error('Impossibile verificare il pagamento Airwallex: ' + (error.response?.data?.message || error.message));
  }
}
