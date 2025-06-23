import React from 'react';
import { motion } from 'framer-motion';

const equipment = [
  {
    image: '/images/himiy/kerher.webp',
    title: 'Профессиональная техника',
    description: 'Используем оборудование Kärcher - мирового лидера в области профессиональной уборки и химчистки'
  },
  {
    image: '/images/himiy/himiy.webp',
    title: 'Сертифицированная химия',
    description: 'Только проверенные и безопасные моющие средства от ведущих европейских производителей'
  },
  {
    image: '/images/himiy/rerher.webp',
    title: 'Мощное оборудование',
    description: 'Профессиональные машины Kärcher с высокой производительностью для глубокой очистки'
  },
  {
    image: '/images/himiy/himiy2.webp',
    title: 'Инновационные технологии',
    description: 'Применяем передовые методы очистки с использованием современной профессиональной химии'
  },
  {
    image: '/images/himiy/csychka.webp',
    title: 'Система сушки',
    description: 'Современное сушильное оборудование для бережной обработки и восстановления изделий'
  },
  {
    image: '/images/himiy/kerher.webp',
    title: 'Безупречный результат',
    description: 'Комплексный подход с использованием профессионального оборудования гарантирует идеальную чистоту'
  }
];

const Advantages = () => (
  <section className="services-section">
    <div className="services-container">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ fontSize: '2.5rem', padding: '20px 0' }}
      >
        Наше оборудование
      </motion.h2>
      <div className="services-grid">
        {equipment.map((item, idx) => (
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
          >
            <div className="service-icon">
              <img src={item.image} alt={item.title} style={{ width: 140, height: 140, borderRadius: 20, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
            </div>
            <h3 className="service-title">{item.title}</h3>
            <p className="service-description">{item.description}</p>
          </motion.div>
        ))}
      </div>
      {/* Karcher promo block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 48,
          marginBottom: 12,
          gap: 18,
          flexWrap: 'wrap',
          background: 'linear-gradient(90deg, #fffbe7 0%, #f7e9ff 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(162,89,198,0.10)',
          padding: '24px 32px',
          border: '1.5px solid #f6e27a',
          minHeight: 90,
          maxWidth: 900,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <img src="/images/karcher-logo.png" alt="Karcher Logo" style={{ width: 120, height: 'auto', verticalAlign: 'middle', flexShrink: 0 }} />
        <span
          style={{
            fontSize: '1.18rem',
            fontWeight: 700,
            color: '#1a1a1a',
            display: 'inline-block',
            lineHeight: 1.4,
            maxWidth: 700,
            marginLeft: 18
          }}
        >
          Kärcher — и с гордостью применяем её в каждом заказе. Результат всегда чистый, свежий и надёжный!
        </span>
      </motion.div>
    </div>
  </section>
);

export default Advantages; 