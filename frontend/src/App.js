import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './components/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import './index.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-vh-100">
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="my-3 flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;