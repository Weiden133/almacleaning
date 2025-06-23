import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake } from 'react-icons/fa';

const partners = [
  {
    id: 'fortebank',
    name: 'Fortebank',
    logo: '/images/fforte.jpg',
    description: 'Банковские услуги',
    instagramUrl: 'https://www.instagram.com/fortebankkz/',
  },
  {
    id: 'teatralka',
    name: 'Театралка',
    logo: '/images/teatralka.png',
    description: 'Театральный центр развлечений',
    instagramUrl: 'https://www.instagram.com/teatralka.almaty/',
  },
  {
    id: 'hikvision',
    name: 'Hikvision',
    logo: '/images/hikv.png',
    description: 'Системы видеонаблюдения',
    instagramUrl: 'https://www.instagram.com/hikvision_qazaqstan/',
  },
  {
    id: 'zebra-coffee',
    name: 'Zebra Coffee',
    logo: '/images/zebra.png',
    description: 'Сеть кофеен премиум-класса',
    instagramUrl: 'https://www.instagram.com/zebracoffee.almaty/',
  },
  {
    id: 'akademy',
    name: 'Академия Здоровья',
    logo: '/images/akademy.png',
    description: 'Медицинский центр',
    instagramUrl: 'https://www.instagram.com/akademiazdorovya/',
  },
  {
    id: 'ozyurt',
    name: 'Ozyurt',
    logo: '/images/oozyurt.jpg',
    description: 'Строительная компания',
    instagramUrl: 'https://www.instagram.com/ozyurt.kz/',
  }
];

const Partners = () => {
  const handlePartnershipClick = () => {
    // Открываем WhatsApp с предустановленным сообщением
    const message = "Здравствуйте! Я хочу стать вашим партнером. Давайте обсудим возможности сотрудничества.";
    window.open(`https://wa.me/77002175992?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="services-section">
      <div className="services-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-bold tracking-tight text-shadow-dark"
          style={{ fontSize: '2.5rem', padding: '20px 0' }}
        >
          Наши Партнеры
        </motion.h2>
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '18px'
        }}>
          {partners.map((partner, idx) => (
            <motion.div
              className="service-card"
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="service-icon">
                <a 
                  href={partner.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    style={{ 
                      width: 140, 
                      height: 140, 
                      borderRadius: 20, 
                      background: '#fff', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                      objectFit: 'contain',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                </a>
              </div>
              <h3 className="font-semibold tracking-tight text-shadow-dark">{partner.name}</h3>
              <p className="font-medium tracking-wide text-shadow-dark">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Кнопка "Стать нашим партнером" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            padding: '20px'
          }}
        >
          <motion.button
            onClick={handlePartnershipClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              padding: '16px 32px',
              borderRadius: '50px',
              border: 'none',
              color: '#fff',
              fontSize: '1.4rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
              transition: 'all 0.3s ease'
            }}
            className="text-light font-semibold tracking-wide"
          >
            <FaHandshake size={24} />
            Стать нашим партнером!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners; 