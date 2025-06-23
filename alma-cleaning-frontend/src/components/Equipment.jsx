import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const equipmentList = [
  {
    img: '/images/himiy/rerher.webp',
    title: 'ПЫЛЕСОС',
    description: 'PUZZI 8/1 C',
    brand: 'KARCHER',
  },
  {
    img: '/images/himiy/csychka.webp',
    title: 'Воздушный компрессор',
    description: 'BF-533',
    brand: 'JIEBA',
  },
  {
    img: '/images/himiy/himiy.webp',
    title: 'Моющее ср-во',
    description: 'KARCHER',
    brand: 'KARCHER',
  },
  {
    img: '/images/himiy/kerher.webp',
    title: 'ПАРОГЕНЕРАТОР',
    description: 'KARCHER',
    brand: 'KARCHER',
  },
  {
    img: '/images/himiy/himiy2.webp',
    title: 'ХИМИЯ',
    description: 'CHEMSPEK',
    brand: 'CHEMSPEC',
  },
  {
    img: '/images/piisos.webp',
    title: 'Пылесос',
    description: 'Sabrina',
    brand: 'KARCHER',
  },
];

const Equipment = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-bold tracking-tight"
          style={{ 
            fontSize: isSmallMobile ? '2rem' : isMobile ? '2.2rem' : '2.5rem', 
            padding: '20px 0',
          }}
        >
          Наше оборудование
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-medium tracking-wide text-shadow-dark"
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 30px',
            fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.15rem' : '1.25rem',
            fontWeight: 500
          }}
        >
          Используем оборудование Kärcher - мирового лидера в области профессиональной уборки и химчистки
        </motion.p>
        <div className="services-grid equipment-grid" style={{
          display: 'grid',
          gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
          gap: isSmallMobile ? '20px' : isMobile ? '16px' : '18px',
          padding: isMobile ? '0 10px' : '0'
        }}>
          {equipmentList.map((item, idx) => (
            <motion.div
              className="service-card"
              key={item.title + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
              style={{
                padding: isSmallMobile ? '20px 15px' : isMobile ? '18px 12px' : '20px',
                textAlign: 'center'
              }}
            >
              <div className="service-icon" style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: isSmallMobile ? '15px' : '12px'
              }}>
                <img src={item.img} alt={item.title} style={{ 
                  width: isSmallMobile ? '280px' : isMobile ? '220px' : '120px',
                  height: isSmallMobile ? '210px' : isMobile ? '165px' : '90px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }} />
              </div>
              <h3 className="font-semibold tracking-tight text-shadow-dark" style={{
                fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.1rem' : '1rem',
                marginBottom: '8px'
              }}>{item.title}</h3>
              <p className="font-medium tracking-wide text-shadow-dark" style={{
                fontSize: isSmallMobile ? '1rem' : isMobile ? '0.95rem' : '0.9rem',
                opacity: 0.9
              }}>{item.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Karcher promo block */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: isMobile ? '40px' : '48px',
          marginBottom: '12px',
          padding: isMobile ? '0 15px' : '0'
        }}>
          <img src="/images/karcher-logo.png" alt="Karcher Logo" style={{ 
            width: isSmallMobile ? '120px' : isMobile ? '130px' : '150px', 
            height: 'auto', 
            marginBottom: isMobile ? '15px' : '20px', 
            filter: 'brightness(1.5)' 
          }} />
          <span
            style={{
              fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : '1.5rem',
              fontWeight: 700,
              color: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              textAlign: 'center',
              display: 'block',
              lineHeight: 1.4,
              maxWidth: 700
            }}
          >
            Kärcher — и с гордостью применяем её в каждом заказе. Результат всегда чистый, свежий и надёжный!
          </span>
        </div>
      </div>
    </section>
  );
};

export default Equipment; 