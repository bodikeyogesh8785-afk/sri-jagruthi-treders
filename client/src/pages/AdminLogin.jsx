import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User as UserIcon } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/auth/login`, { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error details:', err.response?.data);
      setError(err.response?.data?.msg || 'Connection failed: Backend might be starting up...');
    }
  };

  // Background ping to keep Render server awake
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const ping = () => axios.get(apiUrl).catch(() => {});
    ping(); // Initial ping
    const interval = setInterval(ping, 60000); // Ping every 1 minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
                width: '60px', 
                height: '60px', 
                backgroundColor: 'var(--accent)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 15px'
            }}>
                <Lock color="var(--primary)" size={28} />
            </div>
            <h2 style={{ fontSize: '1.8rem' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-light)' }}>SRI JAGRUTHI TREDERS</p>
        </div>

        {error && (
            <div style={{ 
                padding: '10px', 
                backgroundColor: '#fff1f0', 
                border: '1px solid #ffa39e', 
                borderRadius: '8px', 
                color: '#cf1322',
                marginBottom: '20px',
                fontSize: '0.9rem',
                textAlign: 'center'
            }}>
                {error}
            </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Username</label>
            <div style={{ position: 'relative' }}>
                <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                  required
                />
            </div>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                  required
                />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontFamily: 'inherit',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

export default AdminLogin;
