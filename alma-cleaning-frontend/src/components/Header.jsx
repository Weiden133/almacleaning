import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ cart = [], isMobile, onCartClick, onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Закрываем мобильное меню после клика
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease',
        padding: isScrolled ? '4px 0' : '6px 0'
      }}
    >
      <nav
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <a href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src={logo} 
            alt="AlmaCleaning Logo" 
            style={{ 
              height: isMobile ? '36px' : '44px',
              width: isMobile ? '36px' : '44px',
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              border: '2px solid white'
            }} 
          />
          <span 
            className="text-gradient font-bold tracking-tight" 
            style={{ 
              marginLeft: '10px', 
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              display: 'block'
            }}
          >
            AlmaCleaning
          </span>
        </a>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}
          >
            <a
              href="#services"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('services-section'); }}
            >
              Услуги
            </a>
            <a
              href="#about"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('about-section'); }}
            >
              О нас
            </a>
            <a
              href="#contacts"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('contacts-section'); }}
            >
              Контакты
            </a>
            <a 
              href="tel:+77478858220"
              className="text-light font-semibold"
              style={{
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 4px 15px rgba(244, 122, 194, 0.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(244, 122, 194, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(244, 122, 194, 0.2)';
              }}
            >
              +7 747 885 8220
            </a>
            <button onClick={onCartClick} style={{ position: 'relative', background: 'none', border: 'none', color: isScrolled ? '#333' : '#333' }}>
              <FaShoppingCart size={18} />
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -5,
                  right: -10,
                  background: '#f47ac2',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={onCartClick} style={{ position: 'relative', background: 'none', border: 'none', color: isScrolled ? '#333' : '#333' }}>
              <FaShoppingCart size={16} />
              {cart.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -3,
                  right: -6,
                  background: '#f47ac2',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '1px 4px',
                  fontSize: '9px',
                  fontWeight: 'bold'
                }}>
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={toggleMobileMenu}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: isScrolled ? '#333' : '#333',
                padding: '3px'
              }}
            >
              {isMobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="#services"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                color: '#333',
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('services-section'); }}
            >
              Услуги
            </a>
            <a
              href="#about"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                color: '#333',
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('about-section'); }}
            >
              О нас
            </a>
            <a
              href="#contacts"
              className="font-medium tracking-wide"
              style={{
                fontSize: '1rem',
                textDecoration: 'none',
                color: '#333',
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}
              onClick={e => { e.preventDefault(); scrollToSection('contacts-section'); }}
            >
              Контакты
            </a>
            <a 
              href="tel:+77478858220"
              className="text-light font-semibold"
              style={{
                background: 'linear-gradient(135deg, #f47ac2, #a259c6)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                textDecoration: 'none',
                textAlign: 'center',
                marginTop: '8px'
              }}
            >
              +7 747 885 8220
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 