import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CornerWhatsApp = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buttonSize = isMobile ? 64 : 56;
  const iconSize = isMobile ? 36 : 32;

  return (
    <a
      href="https://wa.me/77002175992"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: isMobile ? 24 : 32,
        right: isMobile ? 20 : 28,
        zIndex: 9999,
        background: '#25D366',
        borderRadius: '50%',
        width: buttonSize,
        height: buttonSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(37,211,102,0.18)',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      aria-label="Связаться в WhatsApp"
      className="corner-whatsapp-btn"
    >
      <FaWhatsapp size={iconSize} color="white" />
    </a>
  );
};

export default CornerWhatsApp; 