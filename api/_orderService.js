import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
// format: "owner/repo" e.g. "Shouldy0/Sito-Inverso"
const GITHUB_REPO = process.env.GITHUB_REPO || 'Shouldy0/Sito-Inverso'; 
const FILE_PATH = 'orders.csv';

// Converte i campi in una riga CSV valida (gestendo le virgolette e le virgole)
function escapeCSV(field) {
  if (field === null || field === undefined) return '';
  const stringField = String(field);
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  return stringField;
}

export async function saveOrderToCSV(orderData) {
  const dateStr = new Date().toISOString();
  
  // Prepariamo i dati dell'ordine
  const rowData = [
    dateStr,
    orderData.paymentIntentId || `MOCK-${Date.now()}`,
    `${orderData.shipping.firstName} ${orderData.shipping.lastName}`,
    orderData.contact.email,
    orderData.shipping.phone || '',
    `${orderData.shipping.address}, ${orderData.shipping.city} (${orderData.shipping.zipcode}), ${orderData.shipping.countryCode}`,
    orderData.items.map(item => `${item.title} (x${item.quantity})`).join('; '),
    orderData.totalAmount || '',
    orderData.shippingCost || '0.00',
    orderData.fulfillmentType || 'Merchant', // 'Lulu', 'Merchant', or 'Lulu + Merchant'
    'COMPLETED'
  ];

  const csvRow = rowData.map(escapeCSV).join(',') + '\n';
  const csvHeader = 'Data Ordine,ID Pagamento,Nome Cliente,Email,Telefono,Indirizzo Spedizione,Prodotti,Totale EUR,Costo Spedizione EUR,Gestione Spedizione,Stato Pagamento\n';

  // Se non c'è il token di GitHub, salviamo in locale/temporaneo
  if (!GITHUB_TOKEN) {
    console.log('--- LOCAL CSV STORAGE ---');
    const localPath = path.join('/tmp', 'orders.csv');
    let fileExists = fs.existsSync(localPath);
    if (!fileExists) {
      fs.writeFileSync(localPath, csvHeader);
    }
    fs.appendFileSync(localPath, csvRow);
    console.log(`Ordine salvato in locale su ${localPath}`);
    return { success: true, location: 'local' };
  }

  // Se c'è il token di GitHub, scriviamo sul repository tramite le API di GitHub
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    let fileSha = null;
    let existingContent = '';

    // 1. Controlla se il file esiste già su GitHub e prendi il suo SHA e contenuto
    try {
      const getRes = await fetch(url, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (getRes.ok) {
        const fileData = await getRes.json();
        fileSha = fileData.sha;
        existingContent = Buffer.from(fileData.content, 'base64').toString('utf8');
      }
    } catch (e) {
      console.log('orders.csv non esiste ancora su GitHub. Verrà creato.');
    }

    // 2. Componiamo il nuovo contenuto
    let newContent = existingContent;
    if (!newContent) {
      newContent = csvHeader;
    }
    newContent += csvRow;

    // 3. Carichiamo il file aggiornato su GitHub
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Registrazione nuovo ordine ${orderData.paymentIntentId || Date.now()}`,
        content: Buffer.from(newContent).toString('base64'),
        sha: fileSha || undefined
      })
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      throw new Error(errData.message || 'Errore nella chiamata PUT a GitHub');
    }

    console.log('Ordine salvato con successo su GitHub in orders.csv!');
    return { success: true, location: 'github' };
  } catch (error) {
    console.error('Errore nel salvataggio su GitHub, salvo in /tmp locale:', error.message);
    // In caso di errore con GitHub, salviamo comunque in locale per non perdere i dati
    const localPath = path.join('/tmp', 'orders.csv');
    if (!fs.existsSync(localPath)) {
      fs.writeFileSync(localPath, csvHeader);
    }
    fs.appendFileSync(localPath, csvRow);
    return { success: true, location: 'local-fallback', error: error.message };
  }
}

// Funzione per leggere gli ordini dal CSV (usata per la dashboard admin)
export async function getOrdersFromCSV() {
  const csvHeader = 'Data Ordine,ID Pagamento,Nome Cliente,Email,Telefono,Indirizzo Spedizione,Prodotti,Totale EUR,Costo Spedizione EUR,Gestione Spedizione,Stato Pagamento\n';
  
  if (!GITHUB_TOKEN) {
    const localPath = path.join('/tmp', 'orders.csv');
    if (fs.existsSync(localPath)) {
      return fs.readFileSync(localPath, 'utf8');
    }
    return csvHeader;
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (res.ok) {
      const fileData = await res.json();
      return Buffer.from(fileData.content, 'base64').toString('utf8');
    }
    return csvHeader;
  } catch (error) {
    console.error('Errore lettura ordini da GitHub:', error.message);
    const localPath = path.join('/tmp', 'orders.csv');
    if (fs.existsSync(localPath)) {
      return fs.readFileSync(localPath, 'utf8');
    }
    return csvHeader;
  }
}
