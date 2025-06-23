import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';

const FloatingWhatsApp: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/77002175992?text=Я%20с%20сайта%20и%20хочу%20заказать%20услугу"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      animate={{
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 0 0 rgba(34, 197, 94, 0.4)",
          "0 0 0 10px rgba(34, 197, 94, 0)",
          "0 0 0 0 rgba(34, 197, 94, 0.4)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </motion.a>
  );
};

export default FloatingWhatsApp; 