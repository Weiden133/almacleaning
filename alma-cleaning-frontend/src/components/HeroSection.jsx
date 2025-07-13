import React from 'react';
import logo2 from '../assets/logo2.png';

const HeroSection = ({ isMobile, isSmallMobile }) => {
  const whatsappMessage = encodeURIComponent(
    isMobile
      ? 'Здравствуйте! Хочу заказать химчистку с сайта AlmaCleaning!'
      : 'Здравствуйте с сайта AlmaCleaning! хочу заказать ваши услуги!'
  );
  const whatsappLink = `https://wa.me/77478858220?text=${whatsappMessage}`;

  if (isMobile) {
    return (
      <section
        className="hero-section"
        style={{
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isSmallMobile ? '15px 10px' : '20px 15px',
          background: 'linear-gradient(135deg, rgba(244, 122, 194, 0.05) 0%, rgba(162, 89, 198, 0.05) 100%)',
          position: 'relative',
          borderRadius: '16px',
          border: '1px solid #e9ecef'
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            padding: '0 15px',
          }}
        >
          <h1
            className="hero-title"
            style={{
              fontSize: isSmallMobile ? '1.5rem' : '1.8rem',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '800',
              lineHeight: '1.2'
            }}
          >
            Профессиональная уборка в Алматы
          </h1>
          <p
            className="hero-description"
            style={{
              fontSize: isSmallMobile ? '0.85rem' : '1rem',
              marginBottom: '20px',
              color: '#555',
              opacity: 0.9,
              lineHeight: '1.4',
              maxWidth: '800px',
              margin: '0 auto 20px auto'
            }}
          >
            Доверьте чистоту профессионалам. Качественная уборка квартир, домов и офисов
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isSmallMobile ? '10px' : '15px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <a
              className="hero-button"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #f47ac2 0%, #a259c6 100%)',
                color: '#fff',
                padding: isSmallMobile ? '10px 20px' : '12px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: isSmallMobile ? '0.9rem' : '1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(244,122,194,0.3)',
                width: 'auto',
                maxWidth: 'none'
              }}
            >
              Заказать
            </a>
          </div>
          <div style={{
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '10px 15px',
            display: 'inline-block',
            marginTop: '20px',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <p style={{
              margin: 0,
              color: 'yellow',
              fontWeight: 'bold',
              fontSize: isSmallMobile ? '1.8rem' : '2.0rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              СКИДКА 20% НА ПЕРВЫЙ ЗАКАЗ
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="gradient-bg"
      style={{
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        background: 'linear-gradient(135deg, rgba(244, 122, 194, 0.1) 0%, rgba(162, 89, 198, 0.1) 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          padding: '0 15px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px'
        }}
      >
        <div style={{ 
          flex: 1, 
          minWidth: 0,
          order: 2
        }}>
          <img 
            className="hero-logo"
            src={logo2} 
            alt="Alma Cleaning Logo" 
            style={{
              width: '360px',
              height: 'auto',
              margin: '0 auto 8px',
              display: 'block'
            }}
          />
        </div>
        <div style={{ 
          flex: 2, 
          minWidth: 0,
          order: 1
        }}>
          <h1
            className="hero-title"
            style={{
              fontSize: '1.8em',
              marginBottom: '6px',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              lineHeight: '1.2'
            }}
          >
            Профессиональная уборка в Алматы
          </h1>
          <p
            className="hero-description"
            style={{
              fontSize: '0.9em',
              marginBottom: '10px',
              color: '#fff',
              opacity: 0.9,
              lineHeight: '1.4',
              padding: '0'
            }}
          >
            Доверьте чистоту профессионалам. Качественная уборка квартир, домов и офисов
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px',
              marginTop: '15px'
            }}
          >
            <a
              className="hero-button"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #f47ac2 0%, #a259c6 100%)',
                color: '#fff',
                padding: '8px 20px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '0.9em',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(244,122,194,0.3)',
                width: 'auto',
                maxWidth: 'none'
              }}
            >
              Заказать
            </a>
            <div style={{
                marginTop: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                borderRadius: '16px',
                padding: '12px 24px',
                display: 'inline-block',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <p style={{
                  margin: 0,
                  color: 'yellow',
                  fontWeight: 'bold',
                  fontSize: '2.2em',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
                }}>
                  СКИДКА 20% НА ПЕРВЫЙ ЗАКАЗ
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;