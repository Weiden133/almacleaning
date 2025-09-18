import React from 'react';
import { motion } from 'framer-motion';
import { FaCouch, FaBuilding, FaHome } from 'react-icons/fa';
import { GiTheaterCurtains } from 'react-icons/gi';
import { MdCleaningServices, MdWindow } from 'react-icons/md';
import AnimatedSection from './AnimatedSection';
import AnimatedList from './AnimatedList';

const Services = ({
  setCart,
  setShowFurnitureModal,
  setShowCarpetModal,
  setShowCurtainModal,
  setShowOfficeModal,
  setShowApartmentModal,
  setShowWindowFacadeModal
}) => {
  const services = [
    {
      id: 'apartment-cleaning',
      title: 'Уборка квартир',
      description: 'Генеральная, после ремонта, поддерживающая. Быстро, аккуратно и с гарантией результата.',
      icon: FaHome,
      buttonText: 'Заказать'
    },
    {
      id: 'furniture-cleaning',
      title: 'Химчистка мебели',
      description: 'Диваны, кресла, стулья. Выводим пятна, устраняем запахи. Безопасно для детей и животных.',
      icon: FaCouch,
      buttonText: 'Заказать',
      style: {
        title: {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          fontWeight: '600'
        },
        description: {
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          fontWeight: '500',
          fontSize: '1.1em',
          letterSpacing: '0.3px'
        }
      }
    },
    {
      id: 'carpet-cleaning',
      title: 'Химчистка ковров',
      description: 'Глубокая чистка ковров на дому. Современное оборудование и антипылевое покрытие.',
      icon: MdCleaningServices,
      buttonText: 'Заказать'
    },
    {
      id: 'curtain-cleaning',
      title: 'Химчистка штор',
      description: 'Без снятия, без деформаций. Очищаем от пыли и запахов прямо на карнизе.',
      icon: GiTheaterCurtains,
      buttonText: 'Заказать'
    },
    {
      id: 'office-cleaning',
      title: 'Уборка офисов',
      description: 'Работаем в ресторанах, бизнес-центрах и магазинах. Гибкий график и прозрачные условия.',
      icon: FaBuilding,
      buttonText: 'Заказать'
    },
    {
      id: 'window-facade-cleaning',
      title: 'Мытьё фасадов',
      description: 'Используем профессиональный инвентарь. Без разводов и риска повреждений.',
      icon: MdWindow,
      buttonText: 'Заказать'
    }
  ];

  const handleServiceOrder = (service) => {
    // Отслеживаем клик по кнопке заказа
    
    if (service.id === 'furniture-cleaning') {
      setShowFurnitureModal(true);
      return;
    }
    const message = `🌟 Заказ услуги: ${service.title}!\n\n${service.description}\n\n📞 Пожалуйста, свяжитесь со мной для уточнения деталей заказа!`;
    const whatsappUrl = `https://wa.me/77478858220?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <AnimatedSection animation="fadeIn" className="services-section" id="services-section" style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        <AnimatedSection animation="slideUp" delay={0.2}>
          <h2
            className="font-bold tracking-tight"
            style={{ 
              fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2rem' : '2.5rem', 
              padding: isMobile ? '15px 0' : '20px 0',
              marginBottom: isMobile ? '10px' : '20px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f47ac2, #a259c6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Наши услуги
          </h2>
        </AnimatedSection>
        <AnimatedList 
          className="services-grid" 
          id="services-grid-panel" 
          staggerDelay={0.1}
          animation="slideUp"
          style={{ 
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: isMobile ? '12px' : '18px',
            padding: isMobile ? '0 8px' : '0'
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: isMobile ? 1.01 : 1.02,
                y: isMobile ? -2 : -5,
                transition: { duration: 0.3 }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                padding: isSmallMobile ? '16px 12px' : isMobile ? '20px 16px' : '25px 20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: isMobile ? '240px' : '280px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                className="service-icon"
                style={{
                  marginBottom: isMobile ? '12px' : '16px',
                  padding: isMobile ? '10px' : '12px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f47ac2, #a259c6)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '50px' : '60px',
                  height: isMobile ? '50px' : '60px'
                }}
              >
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: isMobile ? '60px' : '80px',
                      height: isMobile ? '45px' : '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                    }}
                  />
                ) : (
                  <service.icon size={isMobile ? 20 : 24} />
                )}
              </div>
              <h3 
                className="font-semibold tracking-tight text-shadow-dark" 
                style={{
                  ...service.style?.title,
                  fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.2rem',
                  marginBottom: isMobile ? '8px' : '12px',
                  lineHeight: '1.3'
                }}
              >
                {service.title}
              </h3>
              <p 
                className="font-medium tracking-wide text-shadow-dark" 
                style={{
                  ...service.style?.description,
                  fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.85rem' : '0.9rem',
                  lineHeight: '1.4',
                  marginBottom: isMobile ? '12px' : '16px',
                  flex: 1
                }}
              >
                {service.description}
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#9a4bff',
                  boxShadow: '0px 8px 20px rgba(154, 75, 255, 0.4)',
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                className="order-button"
                onClick={() => handleServiceOrder(service)}
                style={{
                  padding: isSmallMobile ? '8px 16px' : isMobile ? '10px 20px' : '12px 24px',
                  fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: '600',
                  color: 'white',
                  background: 'linear-gradient(45deg, #a855f7, #c084fc)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginTop: 'auto',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? '100px' : 'auto'
                }}
              >
                {service.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </AnimatedList>
      </div>
    </AnimatedSection>
  );
};

export default Services;