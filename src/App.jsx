import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Biblioteca from './pages/Biblioteca';
import Galleria from './pages/Galleria';
import Originali from './pages/Originali';
import ProductDetail from './pages/ProductDetail';
import Diario from './pages/Diario';
import Universo from './pages/Universo';
import InfoPage from './pages/InfoPage';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="biblioteca" element={<Biblioteca />} />
            <Route path="galleria" element={<Galleria />} />
            <Route path="originali" element={<Originali />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="diario" element={<Diario />} />
            <Route path="universo" element={<Universo />} />
            <Route path="info/:pageId" element={<InfoPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
