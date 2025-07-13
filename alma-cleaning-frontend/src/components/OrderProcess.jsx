import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaTruck } from 'react-icons/fa';

const OrderProcess = () => {
  const steps = [
    {
      number: '1',
      icon: '📞',
      title: 'Свяжитесь с нами',
      description: 'Позвоните нам или напишите в WhatsApp, опишите ваши потребности и получите консультацию',
      color: '#9b59b6'
    },
    {
      number: '2',
      icon: '🚚',
      title: 'Забираем вещи',
      description: 'Наш курьер приедет в удобное для вас время и заберет вещи для химчистки или проведет уборку',
      color: '#a569bd'
    },
    {
      number: '3',
      icon: '✨',
      title: 'Выполняем работу',
      description: 'Наши специалисты профессионально выполнят химчистку или уборку с гарантией качества',
      color: '#bb8fce'
    },
    {
      number: '4',
      icon: '🎉',
      title: 'Получите результат',
      description: 'Доставляем чистые вещи обратно или вы получаете идеально чистое помещение',
      color: '#d2b4de'
    }
  ];

  return (
    <section className="order-process-section">
      <div className="order-process-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Как сделать заказ
        </motion.h2>

        <div className="process-steps">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="step-number" style={{ backgroundColor: step.color }}>
                {step.number}
              </div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Кнопка вызова курьера */}
        <motion.div
          className="courier-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>Готовы начать?</h3>
          <p>Курьер заберёт заказ с 9:00 до 21:00, в удобное для вас время</p>
          
          <div className="cta-buttons">
            <motion.a
              href="https://wa.me/77478858220?text=Здравствуйте!%20меня%20интерисуют%20ваши%20услуги!"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp size={24} />
              Вызвать курьера в WhatsApp
            </motion.a>
            
            <motion.a
              href="tel:+77478858220"
              className="phone-cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 Позвонить сейчас
            </motion.a>
          </div>

          <div className="response-time">
            <FaCheckCircle style={{ color: '#25D366' }} />
            <span>Мы свяжемся с вами в течение 15 минут</span>
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          className="additional-info"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="info-cards">
            <div className="info-card">
              <FaTruck style={{ color: '#9b59b6', fontSize: '2rem' }} />
              <h4>Бесплатная доставка</h4>
              <p>При заказе от 5000 ₸</p>
            </div>
            
            <div className="info-card">
              <FaCheckCircle style={{ color: '#25D366', fontSize: '2rem' }} />
              <h4>Гарантия качества</h4>
              <p>100% результат или переделка</p>
            </div>
            
            <div className="info-card">
              <span style={{ color: '#9b59b6', fontSize: '2rem' }}>⚡</span>
              <h4>Быстрое выполнение</h4>
              <p>Готовность 1-3 дня</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrderProcess; 