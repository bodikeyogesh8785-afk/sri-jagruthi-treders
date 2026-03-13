import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '15px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '8px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>SJT</div>
          <span style={{ 
            fontSize: '1.4rem', 
            fontWeight: '700', 
            color: 'var(--primary)',
            letterSpacing: '-0.5px'
          }}>SRI JAGRUTHI TREDERS</span>
        </Link>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <div className="search-box" style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f3f1',
            padding: '8px 16px',
            borderRadius: '20px',
            width: '300px'
          }}>
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search products..." 
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                marginLeft: '10px',
                width: '100%',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingCart size={24} color="var(--primary)" />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: 'var(--secondary)',
                  color: 'black',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  border: '2px solid white'
                }}>{cartCount}</span>
              )}
            </Link>
            <Link to="/admin" style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-light)' }}>Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
