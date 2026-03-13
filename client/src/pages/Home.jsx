import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Sprout, Shield, Droplets, ArrowRight } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'https://sri-jagruthi-treders.onrender.com';
        const res = await axios.get(`${apiUrl}/api/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Seeds', 'Pesticides', 'Fertilizers'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="fade-in">
      {/* Hero Section with Video Background */}
      <section style={{
        position: 'relative',
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Video Element */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -2
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sunrise-in-the-countryside-4235-large.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay for Text Visibility */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: -1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            marginBottom: '20px', 
            lineHeight: '1.1',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Empowering Farmers with <br /> 
            <span style={{ color: 'var(--secondary)' }}>Superior Quality</span> Agra Products
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '700px', 
            margin: '0 auto 40px', 
            opacity: 0.95,
            textShadow: '0 1px 5px rgba(0,0,0,0.3)'
          }}>
            Welcome to SRI JAGRUTHI TREDERS. We provide the best seeds, pesticides, and fertilizers 
            to ensure your crops thrive and your harvest is bountiful.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '15px 40px', fontSize: '1.1rem', backgroundColor: 'var(--secondary)', color: 'black' }}
              onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now <ArrowRight size={20} />
            </button>
            <button className="btn" style={{ border: '2px solid white', color: 'white', padding: '15px 40px', fontSize: '1.1rem' }}>
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 0', backgroundColor: 'white' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
            <FeatureCard 
                icon={<Sprout color="var(--primary)" />} 
                title="Premium Seeds" 
                desc="High-yield crops with superior germination rates."
            />
            <FeatureCard 
                icon={<Shield color="var(--primary)" />} 
                title="Crop Protection" 
                desc="Effective pesticides for every agricultural challenge."
            />
            <FeatureCard 
                icon={<Droplets color="var(--primary)" />} 
                title="Soil Nutrition" 
                desc="Quality fertilizers for healthy, robust growth."
            />
        </div>
      </section>

      {/* Product Section */}
      <section id="products-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '40px'
          }}>
            <h2 style={{ fontSize: '2rem' }}>Our Products</h2>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '20px',
                    backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white',
                    color: activeCategory === cat ? 'white' : 'var(--text-light)',
                    border: '1px solid #ddd',
                    fontWeight: '600',
                    transition: 'var(--transition)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
                    <h3>No products found in this category.</h3>
                    <p style={{ color: 'var(--text-light)' }}>Please check back later or try another category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--accent)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{desc}</p>
    </div>
);

export default Home;
