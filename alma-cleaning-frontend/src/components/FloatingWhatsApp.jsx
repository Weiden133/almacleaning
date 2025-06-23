import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/77002175992"
    className="floating-whatsapp"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Связаться в WhatsApp"
  >
    <FaWhatsapp size={32} />
  </a>
);

export default FloatingWhatsApp; 