import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in your details first!');
      return;
    }

    try {
      // 1. Save order to database
      const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
      await axios.post(`${apiUrl}/api/orders`, {
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice: cartTotal
      });

      // 2. Prepare WhatsApp message
      const productsList = cart.map((item, index) => 
      `${index + 1}. ${item.name} – ${item.quantity} ${item.unit || 'units'}`
    ).join('\n');

      const message = `Hello SRI JAGRUTHI TREDERS,
I want to place an order:

Products:
${productsList}

Total Price: ₹${cartTotal}

Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/919640799154?text=${encodedMessage}`, '_blank');
      
      // 3. Clear cart and redirect
      clearCart();
      alert('Order placed successfully! Redirecting...');
      navigate('/');
    } catch (err) {
      console.error('Error placing order:', err);
      alert('There was an error saving your order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <ShoppingBag size={80} color="#ddd" style={{ marginBottom: '20px' }} />
        <h2 style={{ marginBottom: '20px' }}>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 20px' }}>
      <h1 style={{ marginBottom: '40px' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        {/* Cart Items */}
        <div>
          {cart.map(item => (
            <div key={item._id} className="card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '700' }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ padding: '8px', background: 'none' }}><Minus size={16} /></button>
                  <span style={{ padding: '0 10px', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ padding: '8px', background: 'none' }}><Plus size={16} /></button>
                </div>
                <button onClick={() => removeFromCart(item._id)} style={{ color: '#eb5757', background: 'none' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} style={{ color: 'var(--text-light)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Trash2 size={16} /> Clear Cart
          </button>
        </div>

        {/* Checkout Form */}
        <div>
          <div className="card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.4rem' }}>Order Details</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontWeight: 'bold' }}>₹{cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span>Shipping:</span>
                    <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Free</span>
                </div>
                <hr style={{ margin: '15px 0', border: '0.5px solid #eee' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Total:</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>₹{cartTotal}</span>
                </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '15px' }}>Delivery Information</h3>
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleChange}
                style={inputStyle} 
              />
              <input 
                type="text" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                style={inputStyle} 
              />
              <textarea 
                name="address"
                placeholder="Full Shipping Address" 
                rows="3" 
                value={formData.address}
                onChange={handleChange}
                style={inputStyle} 
              ></textarea>
            </div>

            <button 
                className="btn btn-whatsapp" 
                onClick={handleWhatsAppOrder}
                style={{ width: '100%', padding: '15px' }}
            >
              <Send size={18} /> Order Cart on WhatsApp
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '15px' }}>
              Clicking will open WhatsApp with your order details pre-filled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  marginBottom: '10px',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  outline: 'none'
};

export default Cart;
