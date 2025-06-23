import React, { useState, useEffect } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const About = () => {
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
    <section className="about-section" id="about-section" style={{
      background: 'linear-gradient(120deg, #a259c6 0%, #f47ac2 100%)',
      padding: isMobile ? '40px 20px' : '60px 0',
      textAlign: 'center',
      marginTop: 50,
      borderRadius: 24,
      maxWidth: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 8px 48px rgba(162,89,198,0.15)',
    }}>
      <h2 className="text-light font-bold tracking-tight" style={{ 
        fontSize: isSmallMobile ? '2.5rem' : isMobile ? '3rem' : '3.5rem', 
        marginBottom: isMobile ? '25px' : '40px', 
        textAlign: 'center' 
      }}>О нас</h2>
      <p className="text-light tracking-wide leading-relaxed" style={{ 
        fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.5rem' : '2rem', 
        marginBottom: isMobile ? '25px' : '32px', 
        opacity: 0.97, 
        padding: isMobile ? '0 20px' : '0 40px', 
        textAlign: 'center', 
        maxWidth: 900, 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}>
        🧹 AlmaCleaning — это команда профессионалов, которая заботится о чистоте вашего дома и офиса. Мы работаем на рынке клининговых услуг с любовью к своему делу и уважением к каждому клиенту.<br /><br />
        🎯 Наша компания была основана с одной простой целью — сделать чистоту доступной, качественной и быстрой. Мы предлагаем широкий спектр услуг: химчистка мягкой мебели, профессиональная уборка квартир, офисов, домов после ремонта, сухой туман и многое другое.<br /><br />
        🧼 Мы используем только современное оборудование и безопасные для здоровья чистящие средства. Каждый наш специалист — это обученный мастер с опытом и вниманием к деталям.
      </p>
      <div className="text-light font-medium tracking-wide" style={{ 
        fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.8rem' : '2.2rem', 
        textAlign: 'center', 
        maxWidth: 1000, 
        margin: '0 auto 40px auto', 
        opacity: 0.97 
      }}>
        <b>Почему выбирают нас:</b>
        <ul style={{ 
          margin: isMobile ? '20px auto 0 auto' : '32px auto 0 auto', 
          padding: 0, 
          fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.4rem' : '2rem', 
          lineHeight: 1.6, 
          listStyle: 'none', 
          textAlign: 'center', 
          maxWidth: 900 
        }}>
          <li className="text-light">⏰ Пунктуальность и ответственность</li>
          <li className="text-light">🤝 Индивидуальный подход к каждому заказу</li>
          <li className="text-light">✅ Гарантия качества</li>
          <li className="text-light">💸 Прозрачные цены без скрытых доплат</li>
          <li className="text-light">📱 Удобный заказ через WhatsApp</li>
        </ul>
        <div className="text-light font-bold" style={{ 
          marginTop: isMobile ? '20px' : '32px', 
          fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.8rem' : '2.2rem', 
          textAlign: 'center' 
        }}>
          ✨ AlmaCleaning — чистота, которую видно!
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '30' : '45', flexWrap: 'wrap' }}>
        <a href="https://www.instagram.com/almatacleaning/" target="_blank" rel="noopener noreferrer" className="text-light" style={{ 
          fontSize: isMobile ? '30' : '40', 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          transition: 'transform 0.3s ease' 
        }}>
          <FaInstagram size={isMobile ? 30 : 40} />
        </a>
        <a href="https://wa.me/77002175992" target="_blank" rel="noopener noreferrer" className="text-light" style={{ 
          fontSize: isMobile ? '30' : '40', 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          transition: 'transform 0.3s ease' 
        }}>
          <FaWhatsapp size={isMobile ? 30 : 40} />
        </a>
      </div>
    </section>
  );
};

export default About; 