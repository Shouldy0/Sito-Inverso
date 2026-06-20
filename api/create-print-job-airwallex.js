import { retrieveAirwallexPaymentIntent } from './_airwallexService.js';
import { createPrintJob } from './_luluService.js';

const DEFAULT_SHIPPING_LEVEL = 'MAIL';

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
    const { paymentIntentId, contact, shipping, items } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'ID PaymentIntent Airwallex mancante' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    // 1. Verifica lo stato del pagamento su Airwallex
    const intentData = await retrieveAirwallexPaymentIntent(paymentIntentId);
    
    // In Airwallex, lo stato di successo è 'SUCCEEDED'
    const status = intentData.status?.toUpperCase();
    if (status !== 'SUCCEEDED') {
      return res.status(400).json({ 
        error: `Il pagamento Airwallex non è riuscito (Stato attuale: ${intentData.status})` 
      });
    }

    // 2. Prepara il payload per Lulu
    const lineItems = items.map(item => {
      if (item.lulu_printable_id) {
        return {
          title: item.title,
          printable_id: item.lulu_printable_id,
          quantity: item.quantity
        };
      }
      
      return {
        title: item.title,
        cover: item.cover_url || "http://www.lulu.com/content/static/tutorial/en/API_cover_example.pdf",
        interior: item.interior_url || "http://www.lulu.com/content/static/tutorial/en/API_interior_example.pdf",
        pod_package_id: item.lulu_pod_id || "0600X0900.BW.STD.PB.060UW444.MXX",
        quantity: item.quantity
      };
    });

    const luluOrderPayload = {
      contact_email: contact?.email || shipping?.email || "cliente@inverso.com",
      external_id: `INVERSO-AIRWALLEX-${Date.now()}`,
      line_items: lineItems,
      shipping_address: {
        name: `${shipping.firstName} ${shipping.lastName}`,
        street1: shipping.address,
        city: shipping.city,
        country_code: shipping.countryCode || "IT",
        postcode: shipping.zipcode,
        phone_number: shipping.phone || "0000000000"
      },
      shipping_level: DEFAULT_SHIPPING_LEVEL
    };

    // 3. Invia l'ordine di stampa a Lulu
    const result = await createPrintJob(luluOrderPayload);

    res.status(200).json({
      success: true,
      job_id: result.id,
      status: result.status,
      message: 'Pagamento verificato e ordine di stampa inviato con successo a Lulu.com'
    });

  } catch (error) {
    console.error('Airwallex Lulu Order Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
