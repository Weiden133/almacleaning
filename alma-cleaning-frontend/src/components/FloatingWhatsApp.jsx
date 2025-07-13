import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/77478858220"
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Связаться в WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default FloatingWhatsApp; 