import { createAirwallexPaymentIntent } from './_airwallexService.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Importo non valido' });
    }

    const intent = await createAirwallexPaymentIntent(amount);
    
    res.status(200).json({
      id: intent.id,
      clientSecret: intent.client_secret
    });
  } catch (error) {
    console.error('Airwallex PaymentIntent Creation Error:', error);
    res.status(500).json({ error: error.message });
  }
}
