import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Equipment from './components/Equipment';
import Advantages from './components/Advantages';
import Reviews from './components/Reviews';
import Partners from './components/Partners';
import Footer from './components/Footer';
import About from './components/About';
import CornerWhatsApp from './components/CornerWhatsApp';
import CornerInstagram from './components/CornerInstagram';
import CartPanel from './components/CartPanel';
import FurnitureServicesModal from './components/FurnitureServicesModal';
import CarpetServicesModal from './components/CarpetServicesModal';
import CurtainServicesModal from './components/CurtainServicesModal';
import OfficeCleaningModal from './components/OfficeCleaningModal';
import ApartmentCleaningModal from './components/ApartmentCleaningModal';
import WindowFacadeCleaningModal from './components/WindowFacadeCleaningModal';
import MobileOptimizer from './components/MobileOptimizer';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [showFurnitureModal, setShowFurnitureModal] = useState(false);
  const [showCarpetModal, setShowCarpetModal] = useState(false);
  const [showCurtainModal, setShowCurtainModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showWindowFacadeModal, setShowWindowFacadeModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setIsMobile(width < 768);
        setIsSmallMobile(width < 480);
      }
    };
    
    // Инициализируем размеры при загрузке
    handleResize();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  
  const handleAddServices = (services, type) => {
    setCart(prev => {
      let cartWithoutType;
      switch (type) {
        case 'furniture':
          cartWithoutType = prev.filter(item => !item.id.includes('divan'));
          break;
        case 'carpet':
          cartWithoutType = prev.filter(item => !item.id.includes('carpet'));
          break;
        case 'curtain':
          cartWithoutType = prev.filter(item => item.id !== 'curtain-cleaning' && item.id !== 'tulle-cleaning');
          break;
        case 'office':
            cartWithoutType = prev.filter(item => !item.id.startsWith('office-'));
          break;
        case 'apartment':
            cartWithoutType = prev.filter(item => !item.id.startsWith('general-') && !item.id.startsWith('wet-'));
          break;
        case 'window-facade':
            cartWithoutType = prev.filter(item => !item.id.startsWith('window-') && !item.id.startsWith('facade-'));
          break;
        default:
          cartWithoutType = prev;
      }
      return [...cartWithoutType, ...services];
    });
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;
    const message = `🌟 Заказ с сайта AlmaCleaning!\n\n${cart.map(item => `• ${item.title}`).join('\n')}\n\n📞 Пожалуйста, свяжитесь со мной для уточнения деталей заказа!`;
    const whatsappUrl = `https://wa.me/77478858220?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const MainContent = () => (
    <div style={{ 
      flex: 2, 
      minWidth: 0,
      paddingTop: isMobile ? '50px' : '60px'
    }}>
      <HeroSection isMobile={isMobile} isSmallMobile={isSmallMobile} />
      <Services
        setCart={setCart}
        setShowFurnitureModal={setShowFurnitureModal}
        setShowCarpetModal={setShowCarpetModal}
        setShowCurtainModal={setShowCurtainModal}
        setShowOfficeModal={setShowOfficeModal}
        setShowApartmentModal={setShowApartmentModal}
        setShowWindowFacadeModal={setShowWindowFacadeModal}
      />
      <Equipment />
      <Reviews />
      <Partners />
      <About />
      <Footer />
    </div>
  );

  return (
    <MobileOptimizer>
      <div className="app-container">
        <Header 
          cart={cart}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
          onCartClick={() => setIsCartOpen(true)}
        />
        <div style={{
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          background: isMobile ? 'transparent' : 'linear-gradient(135deg, #ffd1f7 0%, #f3e0ff 100%)',
          minHeight: '100vh'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '0 12px' : '0 16px'
          }}>
            <MainContent />
          </div>
        </div>
        <FurnitureServicesModal 
          isOpen={showFurnitureModal}
          onClose={() => setShowFurnitureModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'furniture')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <CarpetServicesModal
          isOpen={showCarpetModal}
          onClose={() => setShowCarpetModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'carpet')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <CurtainServicesModal
          isOpen={showCurtainModal}
          onClose={() => setShowCurtainModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'curtain')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <OfficeCleaningModal
          isOpen={showOfficeModal}
          onClose={() => setShowOfficeModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'office')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
         <ApartmentCleaningModal
          isOpen={showApartmentModal}
          onClose={() => setShowApartmentModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'apartment')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <WindowFacadeCleaningModal
          isOpen={showWindowFacadeModal}
          onClose={() => setShowWindowFacadeModal(false)}
          onAddToMainCart={(services) => handleAddServices(services, 'window-facade')}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
        />
        <CartPanel
          cart={cart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          sendToWhatsApp={sendToWhatsApp}
          isMobile={isMobile}
          isSmallMobile={isSmallMobile}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
        {!isCartOpen && (
          <>
            <CornerWhatsApp isMobile={isMobile} />
            <CornerInstagram isMobile={isMobile} />
          </>
        )}
      </div>
    </MobileOptimizer>
  );
}

export default App;
