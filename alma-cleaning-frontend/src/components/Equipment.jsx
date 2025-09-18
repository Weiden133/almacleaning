import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const circleColors = ['#2bb8d9', '#9ad151', '#58b3e1', '#a1d159'];

const equipmentList = [
  {
    img: '/images/himiy/rerher.webp',
    title: 'ПЫЛЕСОС',
    description: 'Пылесос Karcher Puzzi 8/1 C — компактный и мощный экстрактор для профессиональной уборки мягкой мебели, ковров и текстильных покрытий. Использует технологию распыления и всасывания моющего раствора, эффективно удаляя грязь, пятна и запахи прямо из глубины волокон.',
    brand: 'KARCHER',
  },
  {
    img: '/images/himiy/cysgca.jpg',
    title: 'Prodex',
    description: 'Воздушная пушка-обогреватель Prodex — компактный и мощный электрический тепловентилятор для быстрого и равномерного обогрева помещений. Корпус из прочного металла и устойчивая подставка обеспечивают долговечность и безопасность при эксплуатации.',
    brand: 'PRODEX',
  },
  {
    img: '/images/himiy/jimiyy.jpg',
    title: 'Моющее ср-во',
    description: 'Моющее средство RM 519 Karcher — специализированный концентрат для моющих пылесосов, предназначенный для эффективной очистки ковровых и текстильных покрытий. Быстро растворяет загрязнения, удаляет пятна и неприятные запахи, освежает волокна ткани. Подходит для ковров, ковролина, обивки мебели, салонов автомобилей.',
    brand: 'KARCHER',
  },
  {
    img: '/images/himiy/kerher.webp',
    title: 'ПАРОГЕНЕРАТОР',
    description: 'Парогенератор Karcher — эффективное устройство для глубокой и экологичной очистки без применения химии. Генерирует насыщенный пар под высоким давлением, который проникает в поры поверхности, удаляя грязь, жир, плесень и бактерии.',
    brand: 'KARCHER',
  }
];

const Equipment = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 480);
  const [showVacuumInfo, setShowVacuumInfo] = useState(false);
  const containerRef = useRef(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updatePopupPosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = window.innerWidth < 768 ? 12 : 20;
    setPopupPos({ top: rect.top + window.scrollY + offset, left: rect.left + window.scrollX + offset });
  };

  const openVacuumPopup = () => {
    setShowVacuumInfo(true);
    requestAnimationFrame(updatePopupPosition);
  };

  const closeVacuumPopup = () => setShowVacuumInfo(false);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setShowVacuumInfo(false); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    if (!showVacuumInfo) return;
    updatePopupPosition();
    const onResize = () => updatePopupPosition();
    const onScroll = () => updatePopupPosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [showVacuumInfo]);

  return (
    <section className="services-section">
      <div className="services-container" style={{ position: 'relative' }} ref={containerRef} onMouseLeave={closeVacuumPopup}>
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
          gridTemplateColumns: isSmallMobile ? '1fr' : isMobile ? '1fr' : '1fr 1fr',
          gap: isSmallMobile ? '20px' : isMobile ? '20px' : '24px',
          padding: isMobile ? '0 10px' : '0'
        }}>
          {equipmentList.map((item, idx) => (
            <motion.div
              className="service-card"
              key={item.title + idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.25 }
              }}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 14 : 18,
                padding: isSmallMobile ? '16px' : isMobile ? '18px' : '22px',
                borderRadius: 22,
                background: 'linear-gradient(135deg, rgba(244,122,194,0.12) 0%, rgba(162,89,198,0.10) 100%)',
                border: '1px solid rgba(244,122,194,0.25)',
                boxShadow: '0 10px 30px rgba(162,89,198,0.18)',
                overflow: 'visible'
              }}
              onMouseEnter={() => { if (item.img === '/images/himiy/rerher.webp') openVacuumPopup(); }}
              onClick={() => {
                if (!isMobile) return; // на мобильных — тап по карточке
                const isVacuum = item.img === '/images/himiy/rerher.webp';
                if (isVacuum) openVacuumPopup(); else closeVacuumPopup();
              }}
              onTouchStart={() => { if (item.img === '/images/himiy/rerher.webp') openVacuumPopup(); }}
            >
              {/* soft glow blob */}
              <div style={{
                position: 'absolute',
                top: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, rgba(244,122,194,0.35), rgba(162,89,198,0) 60%)`,
                filter: 'blur(6px)'
              }}/>

              {/* image block */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: isSmallMobile ? 110 : isMobile ? 130 : 150,
                height: isSmallMobile ? 110 : isMobile ? 130 : 150,
                borderRadius: 16,
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                overflow: 'visible'
              }}
                onMouseEnter={() => { if (item.img === '/images/himiy/rerher.webp') openVacuumPopup(); }}
              >
                <img src={item.img} alt={item.title} style={{ 
                  width: '84%',
                  height: '84%',
                  objectFit: 'contain'
                }} />
                <div style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  padding: '4px 8px',
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #f47ac2, #a259c6)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em'
                }}>ALMA</div>
              </div>

              {/* info block */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                minWidth: 0,
                color: '#1a1a1a'
              }}>
                <div style={{
                  fontWeight: 800,
                  fontSize: isSmallMobile ? '1.05rem' : isMobile ? '1.15rem' : '1.25rem',
                  background: 'linear-gradient(135deg, #a259c6 0%, #f47ac2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{item.title}</div>
                {item.description && (
                  <div style={{
                    fontSize: isSmallMobile ? '0.92rem' : isMobile ? '0.95rem' : '1rem',
                    color: '#2d3748',
                    opacity: 0.95
                  }}>{item.description}</div>
                )}
                {item.brand && (
                  <div style={{
                    marginTop: 4,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{
                      display: 'inline-block',
                      background: '#1a1a1a',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: 999,
                      fontWeight: 700,
                      fontSize: isSmallMobile ? '0.85rem' : '0.9rem',
                      letterSpacing: '0.06em',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.18)'
                    }}>{item.brand}</span>
                    <span style={{
                      color: '#718096',
                      fontSize: isSmallMobile ? '0.8rem' : '0.85rem'
                    }}>профессиональная серия</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* pinned popup inside section container (computed top-left) */}
        {showVacuumInfo && (
          <div style={{
            position: 'fixed',
            left: popupPos.left,
            top: popupPos.top,
            width: isMobile ? 240 : 360,
            background: 'linear-gradient(135deg, rgba(255,182,248,0.28) 0%, rgba(243,224,255,0.28) 100%)',
            color: '#ffffff',
            borderRadius: isMobile ? 16 : 20,
            padding: isMobile ? 12 : 18,
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 20px 60px rgba(162,89,198,0.35), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
            zIndex: 1000,
            pointerEvents: isMobile ? 'auto' : 'none'
          }}>
            {isMobile && (
              <button onClick={closeVacuumPopup} style={{
                position: 'absolute',
                top: 6,
                right: 8,
                background: 'rgba(0,0,0,0.45)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '4px 8px',
                fontSize: 12
              }}>Закрыть</button>
            )}
            <div style={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(244,122,194,0.45), rgba(162,89,198,0) 60%)',
              filter: 'blur(8px)'
            }}/>
            <div style={{
              fontWeight: 800,
              fontSize: isMobile ? '0.95rem' : '1.15rem',
              marginBottom: 8,
              color: '#ffffff',
              textShadow: '0 2px 6px rgba(0,0,0,0.45)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>ПЫЛЕСОС • KARCHER</div>
            <div style={{
              fontSize: isMobile ? '0.9rem' : '0.95rem',
              lineHeight: isMobile ? 1.35 : 1.45,
              color: '#ffffff',
              textShadow: '0 1px 2px rgba(0,0,0,0.35)'
            }}>
              Моющее средство RM 519 Karcher — концентрат, специально разработанный для моющих пылесосов. Эффективно удаляет грязь, пятна и неприятные запахи с ковров, обивки мебели и текстильных покрытий, придавая свежий аромат. Быстро действует, не оставляет разводов и безопасно для большинства тканей.
            </div>
          </div>
        )}

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