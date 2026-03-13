import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { MessageCircle } from 'lucide-react';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          
          {/* Floating WhatsApp Chat Button */}
          <a
            href="https://wa.me/919640799154"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              backgroundColor: '#25d366',
              color: 'white',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              zIndex: 1000,
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <MessageCircle size={32} />
          </a>

          <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '60px 0 30px' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
                <div>
                    <h2 style={{ color: 'var(--secondary)', marginBottom: '20px' }}>SRI JAGRUTHI TREDERS</h2>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        Providing high-quality agricultural inputs for sustainable and productive farming since 20XX.
                    </p>
                </div>
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}><a href="/" style={{ opacity: 0.8 }}>Home</a></li>
                        <li style={{ marginBottom: '10px' }}><a href="#" style={{ opacity: 0.8 }}>About Us</a></li>
                        <li style={{ marginBottom: '10px' }}><a href="#" style={{ opacity: 0.8 }}>Categories</a></li>
                        <li style={{ marginBottom: '10px' }}><a href="/admin" style={{ opacity: 0.8 }}>Admin Login</a></li>
                    </ul>
                </div>
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Categories</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}><span style={{ opacity: 0.8 }}>Seeds</span></li>
                        <li style={{ marginBottom: '10px' }}><span style={{ opacity: 0.8 }}>Pesticides</span></li>
                        <li style={{ marginBottom: '10px' }}><span style={{ opacity: 0.8 }}>Fertilizers</span></li>
                    </ul>
                </div>
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Contact Us</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '10px' }}>Village Road, Dist. State, PIN</p>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '10px' }}>Phone: +91 XXXXX XXXXX</p>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Email: contact@jagruthitreders.com</p>
                </div>
            </div>
            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
                &copy; 2026 SRI JAGRUTHI TREDERS. All Rights Reserved.
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
