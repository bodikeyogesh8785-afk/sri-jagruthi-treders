import React from 'react';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleWhatsAppOrder = () => {
    const message = `Hello SRI JAGRUTHI TREDERS,\nI want to place an order for:\n\nProduct: ${product.name}\nPrice: ₹${product.price}\n\nPlease contact me for further details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919640799154?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="card fade-in" style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '200px', backgroundColor: '#f0f0f0', position: 'relative' }}>
          <img 
            src={product.image || 'https://via.placeholder.com/200x200?text=Agriculture'} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'var(--accent)',
            color: 'var(--primary)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {product.category}
          </div>
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '15px', flex: 1 }}>
          {product.description.substring(0, 60)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary)' }}>₹{product.price} <span style={{fontSize: '0.8rem', fontWeight: '400', color: '#777'}}> / {product.unit || 'unit'}</span></span>
          <span style={{ fontSize: '0.8rem', color: product.stock > 0 ? '#27ae60' : '#eb5757' }}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            style={{ padding: '10px', fontSize: '0.85rem' }}
          >
            <ShoppingCart size={16} /> Add
          </button>
          <button 
            className="btn btn-whatsapp" 
            onClick={handleWhatsAppOrder}
            style={{ padding: '10px', fontSize: '0.85rem' }}
          >
            <MessageCircle size={16} /> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
