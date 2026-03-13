import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Package, RefreshCw, X } from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({
    name: '', category: 'Seeds', price: '', description: '', unit: '', image: '', stock: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
      const prodRes = await axios.get(`${apiUrl}/api/products`);
      setProducts(prodRes.data);
      const orderRes = await axios.get(`${apiUrl}/api/orders`);
      setOrders(orderRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentProduct({ ...currentProduct, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
      if (isEditing) {
        await axios.put(`${apiUrl}/api/products/${currentProduct._id}`, currentProduct);
      } else {
        await axios.post(`${apiUrl}/api/products`, currentProduct);
      }
      setShowAddModal(false);
      setIsEditing(false);
      setCurrentProduct({ name: '', category: 'Seeds', price: '', description: '', unit: '', image: '', stock: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
        await axios.delete(`${apiUrl}/api/products/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateOrderStatus = async (id, status) => {
      try {
          const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
          await axios.put(`${apiUrl}/api/orders/${id}`, { status });
          fetchData();
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
            <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-light)' }}>SRI JAGRUTHI TREDERS Control Panel</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
            <button 
                className="btn" 
                onClick={() => setActiveTab('products')}
                style={{ 
                    backgroundColor: activeTab === 'products' ? 'var(--primary)' : 'white',
                    color: activeTab === 'products' ? 'white' : 'var(--primary)',
                    border: '1px solid var(--primary)'
                }}
            >
                Products
            </button>
            <button 
                className="btn" 
                onClick={() => setActiveTab('orders')}
                style={{ 
                    backgroundColor: activeTab === 'orders' ? 'var(--primary)' : 'white',
                    color: activeTab === 'orders' ? 'white' : 'var(--primary)',
                    border: '1px solid var(--primary)'
                }}
            >
                Orders
            </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button className="btn btn-primary" onClick={() => { setIsEditing(false); setShowAddModal(true); }}>
                    <Plus size={20} /> Add New Product
                </button>
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fbf8', borderBottom: '1px solid #eee' }}>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Stock</th>
                    <th style={thStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                    <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                            <span style={{ fontWeight: '600' }}>{product.name}</span>
                        </div>
                        </td>
                        <td style={tdStyle}><span style={badgeStyle}>{product.category}</span></td>
                        <td style={tdStyle}>₹{product.price}</td>
                        <td style={tdStyle}>
                            <span style={{ color: product.stock < 10 ? '#eb5757' : '#27ae60', fontWeight: 'bold' }}>
                                {product.stock}
                            </span>
                        </td>
                        <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleEdit(product)} style={actionBtnStyle}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(product._id)} style={{ ...actionBtnStyle, color: '#eb5757' }}><Trash2 size={18} /></button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fbf8', borderBottom: '1px solid #eee' }}>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Items</th>
                  <th style={thStyle}>Total</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={tdStyle}>
                        <div style={{ fontWeight: '600' }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#777' }}>{order.phone}</div>
                    </td>
                    <td style={tdStyle}>
                        {order.items.length} items
                    </td>
                    <td style={tdStyle}>₹{order.totalPrice}</td>
                    <td style={tdStyle}>
                        <select 
                            value={order.status} 
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option>Pending</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </td>
                    <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}

      {products.length === 0 && activeTab === 'products' && !loading && (
        <div style={{ padding: '60px', textAlign: 'center' }}>
          <Package size={48} color="#ddd" style={{ marginBottom: '15px' }} />
          <p style={{ color: 'var(--text-light)' }}>No products in inventory yet.</p>
        </div>
      )}
      
      {orders.length === 0 && activeTab === 'orders' && !loading && (
        <div style={{ padding: '60px', textAlign: 'center' }}>
          <Package size={48} color="#ddd" style={{ marginBottom: '15px' }} />
          <p style={{ color: 'var(--text-light)' }}>No orders received yet.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div className="card fade-in" style={{ width: '100%', maxWidth: '600px', padding: '40px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none' }}><X /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Product Name</label>
                <input name="name" value={currentProduct.name} onChange={handleInputChange} style={inputStyle} required />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Category</label>
                    <select name="category" value={currentProduct.category} onChange={handleInputChange} style={inputStyle}>
                        <option>Seeds</option>
                        <option>Pesticides</option>
                        <option>Fertilizers</option>
                    </select>
                </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Price (₹)</label>
                    <input type="number" name="price" value={currentProduct.price} onChange={handleInputChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Unit (e.g., kg, bag, packet)</label>
                    <input name="unit" value={currentProduct.unit} onChange={handleInputChange} placeholder="e.g. 1 packet" style={inputStyle} />
                </div>
              </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Stock Quantity</label>
                    <input type="number" name="stock" value={currentProduct.stock} onChange={handleInputChange} style={inputStyle} required />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Product Image</label>
                    <input type="file" onChange={handleImageChange} style={{ ...inputStyle, padding: '8px' }} />
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Description</label>
                <textarea name="description" value={currentProduct.description} onChange={handleInputChange} style={inputStyle} rows="4" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                {isEditing ? 'Update Product' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const thStyle = { padding: '15px 20px', fontSize: '0.9rem', color: '#666', fontWeight: '600' };
const tdStyle = { padding: '15px 20px', fontSize: '0.95rem' };
const formGroupStyle = { marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const modalOverlayStyle = { 
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', zIndex: 2000,
    padding: '20px'
};
const actionBtnStyle = { padding: '8px', background: 'none', color: 'var(--primary)', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer' };
const badgeStyle = { 
    backgroundColor: 'var(--accent)', color: 'var(--primary)', 
    padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' 
};

export default AdminDashboard;
