import { createPrintJob } from './_luluService.js';
import { saveOrderToCSV } from './_orderService.js';
import Stripe from 'stripe';

const DEFAULT_SHIPPING_LEVEL = 'MAIL';

export default async function handler(req, res) {
  // Configurazione CORS per Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Risposta rapida per richieste pre-flight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Accettiamo solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { contact, shipping, items, paymentIntentId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Pagamento non verificato (Manca ID Stripe)' });
    }

    // --- STRIPE VERIFICATION ---
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'La chiave STRIPE_SECRET_KEY non è configurata su Vercel.' });
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Controlla che il pagamento sia andato davvero a buon fine su Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Pagamento non andato a buon fine su Stripe' });
    }
    // ---------------------------

    const totalAmount = paymentIntent.amount / 100;

    // 1. Dividiamo gli articoli tra Libri (Lulu) e Stampe (Spedite dal venditore)
    const bookItems = items.filter(item => item.category === 'biblioteca');
    const printItems = items.filter(item => item.category === 'galleria');

    let luluJobId = null;
    let luluStatus = 'SKIPPED';
    let fulfillmentType = 'Merchant'; // Default: spedito da te

    if (bookItems.length > 0 && printItems.length > 0) {
      fulfillmentType = 'Lulu + Merchant';
    } else if (bookItems.length > 0) {
      fulfillmentType = 'Lulu';
    }

    // 2. Se ci sono dei libri nel carrello, ordiniamo la stampa su Lulu
    if (bookItems.length > 0) {
      const lineItems = bookItems.map(item => {
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
        contact_email: contact.email,
        external_id: `INVERSO-LULU-${Date.now()}`,
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

      const result = await createPrintJob(luluOrderPayload);
      luluJobId = result.id;
      luluStatus = result.status;
    }

    // 3. Salviamo l'ordine nel database CSV (GitHub / locale)
    await saveOrderToCSV({
      paymentIntentId,
      contact,
      shipping,
      items,
      totalAmount,
      shippingCost: shipping.shippingCost || '0.00',
      fulfillmentType
    });

    res.status(200).json({
      success: true,
      job_id: luluJobId,
      status: luluStatus,
      fulfillmentType,
      message: bookItems.length > 0 
        ? 'Pagamento verificato. Ordine di stampa inviato a Lulu per i libri. Le stampe verranno spedite manualmente dal venditore.'
        : 'Pagamento verificato. L\'ordine delle stampe verrà gestito e spedito manualmente dal venditore.'
    });

  } catch (error) {
    console.error('Checkout Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
