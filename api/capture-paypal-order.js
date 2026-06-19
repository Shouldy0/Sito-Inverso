import { capturePayPalOrder } from './_paypalService.js';
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
    const { orderId, contact, shipping, items } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'ID Ordine PayPal mancante' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    // 1. Cattura il pagamento su PayPal
    const captureData = await capturePayPalOrder(orderId);
    
    // Controlla che lo stato sia COMPLETED o comunque andato a buon fine
    if (captureData.status !== 'COMPLETED') {
      return res.status(400).json({ 
        error: `Il pagamento PayPal non è stato completato (Stato: ${captureData.status})` 
      });
    }

    // 2. Prepara il payload per Lulu
    const lineItems = items.map(item => {
      // Se il prodotto usa il Reprint API con un printable_id esistente su Lulu
      if (item.lulu_printable_id) {
        return {
          title: item.title,
          printable_id: item.lulu_printable_id,
          quantity: item.quantity
        };
      }
      
      // Altrimenti usa il normale flusso di creazione con PDF da URL
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
      external_id: `INVERSO-PAYPAL-${Date.now()}`,
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
      message: 'Pagamento completato e ordine di stampa inviato con successo a Lulu.com'
    });

  } catch (error) {
    console.error('PayPal Capture/Lulu Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
