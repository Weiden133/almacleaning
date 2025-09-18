import React, { useState, useEffect } from 'react';
import { FaInstagram, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo2 from '../assets/logo2.png';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'center' : 'flex-start',
    flexDirection: isMobile ? 'column' : 'row',
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    gap: isMobile ? '40px' : '60px',
    textAlign: isMobile ? 'center' : 'left',
  };

  const sectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-start',
    minWidth: isMobile ? '280px' : 'auto',
  };

  return (
    <footer className="footer-section" id="contacts-section" style={{
      background: '#1a1a1a',
      padding: isMobile ? '40px 20px' : '50px 40px 80px 40px',
      color: '#fff',
      marginTop: 60,
      position: 'relative',
      zIndex: 1
    }}>
      <div style={containerStyle}>
        {/* Логотип и краткое описание */}
        <div style={sectionStyle}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px',
            marginBottom: '10px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <img 
              src={logo2} 
              alt="AlmaCleaning Logo" 
              style={{ 
                width: isMobile ? '70px' : '80px',
                height: isMobile ? '70px' : '80px',
                objectFit: 'contain',
              }} 
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <h3 className="text-gradient font-bold tracking-tight" style={{ 
                fontSize: isMobile ? '1.8rem' : '2rem',
                margin: 0,
                lineHeight: 1
              }}>
                AlmaCleaning
              </h3>
              <p className="font-medium tracking-wide" style={{ 
                color: '#fff', 
                fontSize: isMobile ? '1rem' : '1.1rem',
                lineHeight: 1.4,
                margin: 0,
                opacity: 0.9
              }}>
                Профессиональная химчистка и уборка<br />
                Работаем 24/7 по всему городу
              </p>
            </div>
          </div>
        </div>

        {/* Контакты */}
        <div style={sectionStyle}>
          <h4 className="font-semibold tracking-tight" style={{ 
            color: '#fff', 
            fontSize: isMobile ? '1.4rem' : '1.5rem',
            marginBottom: 20 
          }}>
            Контакты
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, width: '100%', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              color: '#fff'
            }}>
              <FaPhone size={isMobile ? 18 : 20} style={{ color: '#f47ac2' }} />
              <a href="tel:+77478858220" className="font-bold tracking-wide hover:text-pink-400 transition-colors" style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(135deg, #f47ac2 0%, #a259c6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                +7 747 885 8220
              </a>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              color: '#fff'
            }}>
              <FaPhone size={isMobile ? 18 : 20} style={{ color: '#f47ac2' }} />
              <a href="tel:+77712399770" className="font-bold tracking-wide hover:text-pink-400 transition-colors" style={{ 
                fontSize: isMobile ? '0.9rem' : '1rem',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                +7 771 239 9770
              </a>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              color: '#fff',
              marginTop: 5
            }}>
              <FaMapMarkerAlt size={isMobile ? 18 : 20} style={{ color: '#f47ac2' }} />
              <a href="https://2gis.kz/almaty/firm/70000001101327665" target="_blank" rel="noopener noreferrer" className="font-bold tracking-wide" style={{ 
                fontSize: isMobile ? '0.9rem' : '1rem',
                textDecoration: 'none',
                color: 'inherit'
              }}>
                Алматы, Казахстан
              </a>
            </div>
          </div>
        </div>

        {/* Социальные сети — скрыто по просьбе клиента */}
      </div>

      {/* Копирайт */}
      <div style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
        paddingTop: 20,
        textAlign: 'center',
        maxWidth: 1200,
        margin: '40px auto 0 auto',
        width: '100%'
      }}>
        <p className="font-medium" style={{ color: '#888', fontSize: 14, margin: 0 }}>
          © 2024 AlmaCleaning. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 