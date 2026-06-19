const express = require('express');
const cors = require('cors');
const { createPrintJob } = require('./luluService');

const app = express();

app.use(cors());
app.use(express.json());

const DEFAULT_SHIPPING_LEVEL = 'MAIL';

app.post('/api/create-print-job', async (req, res) => {
  try {
    const { contact, shipping, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Il carrello è vuoto' });
    }

    const lineItems = items.map(item => {
      return {
        title: item.title,
        cover: item.cover_url || "http://www.lulu.com/content/static/tutorial/en/API_cover_example.pdf",
        interior: item.interior_url || "http://www.lulu.com/content/static/tutorial/en/API_interior_example.pdf",
        pod_package_id: item.lulu_pod_id || "0600X0900BWSTDPB060UW444MXX",
        quantity: item.quantity
      };
    });

    const luluOrderPayload = {
      contact_email: contact.email,
      external_id: `INVERSO-${Date.now()}`,
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

    res.json({
      success: true,
      job_id: result.id,
      status: result.status,
      message: 'Ordine di stampa inviato con successo a Lulu.com'
    });

  } catch (error) {
    console.error('Checkout Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`INverso Backend Server in ascolto sulla porta ${PORT}`);
});
