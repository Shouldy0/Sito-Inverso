import { useState, useEffect } from 'react';
import Button from '../components/UI/Button';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'LULU', 'MERCHANT'

  // Prova a recuperare la password salvata in sessione per non doverla digitare a ogni ricaricamento
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchOrders(savedPassword);
    }
  }, []);

  const fetchOrders = async (passToUse) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get-orders', {
        headers: {
          'x-admin-password': passToUse
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante il recupero degli ordini');
      }

      setOrders(data.orders || []);
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_password', passToUse);
    } catch (err) {
      console.error(err);
      setError(err.message);
      sessionStorage.removeItem('admin_password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) return;
    fetchOrders(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
  };

  const handleDownloadCSV = () => {
    const url = `/api/get-orders?format=csv&password=${encodeURIComponent(password)}`;
    window.open(url, '_blank');
  };

  // Filtra e ordina gli ordini in tempo reale
  const filteredOrders = orders
    .filter(order => {
      // 1. Filtro Ricerca
      const searchLower = searchQuery.toLowerCase();
      const matchCustomer = order['Nome Cliente']?.toLowerCase().includes(searchLower);
      const matchEmail = order['Email']?.toLowerCase().includes(searchLower);
      const matchProducts = order['Prodotti']?.toLowerCase().includes(searchLower);
      
      const matchesSearch = !searchQuery || matchCustomer || matchEmail || matchProducts;

      // 2. Filtro Tipo Spedizione
      const fulfillment = order['Gestione Spedizione'] || '';
      let matchesFilter = true;
      if (filterType === 'LULU') {
        matchesFilter = fulfillment === 'Lulu';
      } else if (filterType === 'MERCHANT') {
        matchesFilter = fulfillment.includes('Merchant');
      }

      return matchesSearch && matchesFilter;
    })
    // Ordina dal più recente
    .sort((a, b) => new Date(b['Data Ordine']) - new Date(a['Data Ordine']));

  // Calcolo delle statistiche degli ordini visibili
  const totalSales = orders.reduce((sum, order) => sum + parseFloat(order['Totale EUR'] || 0), 0);
  const merchantOrdersCount = orders.filter(o => (o['Gestione Spedizione'] || '').includes('Merchant')).length;
  const luluOrdersCount = orders.filter(o => (o['Gestione Spedizione'] || '') === 'Lulu').length;

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page page-transition">
        <div className="login-card">
          <h2>Area Amministratore</h2>
          <p>Inserisci la password per consultare il registro ordini.</p>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Password di Accesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci password..."
                required
              />
            </div>
            {error && <div className="login-error">{error}</div>}
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Verifica in corso...' : 'Accedi'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page page-transition container">
      <div className="admin-header">
        <div>
          <h1>Gestione Ordini</h1>
          <p>Tutti gli ordini registrati dal sito web (Salvati in <code>orders.csv</code>).</p>
        </div>
        <div className="admin-actions">
          <Button variant="outline" onClick={handleDownloadCSV}>
            Scarica File CSV (Excel)
          </Button>
          <Button variant="secondary" className="logout-btn" onClick={handleLogout}>
            Disconnetti
          </Button>
        </div>
      </div>

      {/* Pannello statistiche */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <h3>Totale Incassato</h3>
          <p className="stat-value">€{totalSales.toFixed(2)}</p>
          <span className="stat-desc">Fatturato totale registrato</span>
        </div>
        <div className="stat-card">
          <h3>Spedizioni a tuo carico</h3>
          <p className="stat-value">{merchantOrdersCount}</p>
          <span className="stat-desc">Stampe ed opere da preparare</span>
        </div>
        <div className="stat-card">
          <h3>Spediti da Lulu</h3>
          <p className="stat-value">{luluOrdersCount}</p>
          <span className="stat-desc">Libri gestiti in automatico</span>
        </div>
        <div className="stat-card">
          <h3>Ordini Totali</h3>
          <p className="stat-value">{orders.length}</p>
          <span className="stat-desc">Numero totale di transazioni</span>
        </div>
      </div>

      {/* Controlli Filtri & Ricerca */}
      <div className="admin-controls">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Cerca per cliente, email o prodotto..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilterType('ALL')}
          >
            Tutti gli ordini
          </button>
          <button 
            className={`filter-btn ${filterType === 'MERCHANT' ? 'active' : ''}`}
            onClick={() => setFilterType('MERCHANT')}
          >
            Da Spedire Manualmente ({merchantOrdersCount})
          </button>
          <button 
            className={`filter-btn ${filterType === 'LULU' ? 'active' : ''}`}
            onClick={() => setFilterType('LULU')}
          >
            Automatici Lulu ({luluOrdersCount})
          </button>
        </div>
      </div>

      {/* Tabella Ordini */}
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Data Ordine</th>
              <th>Cliente</th>
              <th>Indirizzo</th>
              <th>Prodotti</th>
              <th>Totale</th>
              <th>Fulfillment</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">Nessun ordine trovato con i criteri selezionati.</td>
              </tr>
            ) : (
              filteredOrders.map((order, i) => (
                <tr key={order['ID Pagamento'] || i}>
                  <td className="date-cell">
                    {new Date(order['Data Ordine']).toLocaleDateString('it-IT')}
                    <span className="time-sub">
                      {new Date(order['Data Ordine']).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td>
                    <strong>{order['Nome Cliente']}</strong>
                    <div className="contact-sub">{order['Email']}</div>
                    <div className="contact-sub">{order['Telefono']}</div>
                  </td>
                  <td className="address-cell">
                    {order['Indirizzo Spedizione']}
                  </td>
                  <td className="products-cell">
                    {order['Prodotti']}
                  </td>
                  <td className="price-cell">
                    €{parseFloat(order['Totale EUR'] || 0).toFixed(2)}
                    <span className="shipping-sub">Sped: €{parseFloat(order['Costo Spedizione EUR'] || 0).toFixed(2)}</span>
                  </td>
                  <td>
                    <span className={`badge ${
                      (order['Gestione Spedizione'] || '').includes('Merchant') ? 'badge-merchant' : 'badge-lulu'
                    }`}>
                      {order['Gestione Spedizione']}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
