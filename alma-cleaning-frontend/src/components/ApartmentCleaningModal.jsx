import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrashRestore, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';

const apartmentImage = '/images/kvartira.jpg';

const ApartmentCleaningModal = ({ isOpen, onClose, onAddToMainCart, isMobile, isSmallMobile }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cleaningType, setCleaningType] = useState('general'); // 'general' или 'wet'

  const services = useMemo(() => ({
    general: [
      { id: 'general-1-room', title: '1-комнатная', price: 20000 },
      { id: 'general-2-room', title: '2-комнатная', price: 25000 },
      { id: 'general-3-room', title: '3-комнатная', price: 30000 },
      { id: 'general-4-room', title: '4-комнатная', price: 35000 },
      { id: 'general-5-room', title: '5-комнатная', price: 40000 },
    ],
    wet: [
      { id: 'wet-1-room', title: '1-комнатная', price: 10000 },
      { id: 'wet-2-room', title: '2-комнатная', price: 12000 },
      { id: 'wet-3-room', title: '3-комнатная', price: 15000 },
      { id: 'wet-4-room', title: '4-комнатная', price: 18000 },
      { id: 'wet-5-room', title: '5-комнатная', price: 20000 },
    ],
    additional: [
        { id: 'add-fridge', title: 'Холодильник', price: 3000 },
        { id: 'add-oven', title: 'Духовка', price: 3000 },
        { id: 'add-microwave', title: 'Микроволновка', price: 2000 },
        { id: 'add-chandelier', title: 'Люстра', price: 2500 },
        { id: 'add-balcony', title: 'Балкон', price: 5000 },
        { id: 'add-wardrobe', title: 'Гардероб', price: 4000 },
    ]
  }), []);

  const handleAddToCart = (service) => {
    setCartItems(prev => {
      // Если это основная услуга (уборка комнат), заменяем любую другую основную услугу
      if (service.id.includes('-room')) {
        const withoutRooms = prev.filter(item => !item.id.includes('-room'));
        return [...withoutRooms, { ...service, quantity: 1 }];
      }
      
      // Для доп. услуг, просто добавляем или убираем
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.filter(item => item.id !== service.id);
      } else {
        return [...prev, { ...service, quantity: 1 }];
      }
    });
  };

  const clearCart = () => setCartItems([]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleContinue = () => {
    if (cartItems.length > 0) {
      // Добавляем тип уборки к общей информации
      const finalCart = [
        { id: 'cleaning-type', title: `Тип: ${cleaningType === 'general' ? 'Генеральная' : 'Влажная'}`, price: 0, quantity: 1 },
        ...cartItems
      ];
      onAddToMainCart(finalCart);
      clearCart();
      onClose();
    }
  };
  
  const isSelected = (serviceId) => cartItems.some(item => item.id === serviceId);

  if (!isOpen) return null;

  const modalContentStyle = {
    background: isMobile 
      ? 'linear-gradient(150deg, #3a0d42 0%, #2c0f38 100%)' 
      : 'linear-gradient(135deg, rgba(244,122,194,0.15) 0%, rgba(162,89,198,0.15) 100%)',
    borderRadius: isMobile ? '24px' : '18px',
    padding: isSmallMobile ? '12px' : isMobile ? '16px' : '20px',
    maxWidth: isMobile ? '100%' : '1100px',
    width: '100%',
    height: isMobile ? '95vh' : 'auto',
    maxHeight: isMobile ? '95vh' : '85vh',
    overflow: 'hidden',
    position: 'relative',
    border: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '10px' : '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={isMobile ? { y: '100%' } : { scale: 0.5, opacity: 0 }}
        animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1 }}
        exit={isMobile ? { y: '100%' } : { scale: 0.5, opacity: 0 }}
        transition={isMobile ? { type: 'spring', stiffness: 400, damping: 40 } : {}}
        style={modalContentStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? '12px' : '15px',
            right: isMobile ? '12px' : '15px',
            background: isMobile ? 'rgba(0,0,0,0.2)' : 'none',
            border: 'none',
            color: '#fff',
            fontSize: isMobile ? '16px' : '20px',
            cursor: 'pointer',
            zIndex: 10,
            width: isMobile ? '30px' : 'auto',
            height: isMobile ? '30px' : 'auto',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FaTimes />
        </button>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: isMobile ? '1' : '2', overflowY: 'auto', paddingRight: isMobile ? '5px' : '10px' }}>
            <h2 style={{
              fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.6rem' : '1.8rem',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Уборка квартир
            </h2>

            {/* Тип уборки */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '5px' }}>
              <button onClick={() => setCleaningType('general')} style={{ flex: 1, padding: '10px', background: cleaningType === 'general' ? '#a855f7' : 'transparent', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isSmallMobile ? '0.8rem' : '1rem' }}>Генеральная</button>
              <button onClick={() => setCleaningType('wet')} style={{ flex: 1, padding: '10px', background: cleaningType === 'wet' ? '#a855f7' : 'transparent', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: isSmallMobile ? '0.8rem' : '1rem' }}>Влажная</button>
            </div>

            {/* Основные услуги */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: isSmallMobile ? '1.1rem' : '1.3rem' }}>Выберите количество комнат</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isSmallMobile ? 2 : isMobile ? 3 : 5}, 1fr)`, gap: '10px' }}>
                {services[cleaningType].map(service => (
                  <button key={service.id} onClick={() => handleAddToCart(service)} style={{
                    padding: isSmallMobile ? '10px 5px' : '15px 10px',
                    background: isSelected(service.id) ? '#a855f7' : 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: isSmallMobile ? '0.8rem' : '1rem' }}>{service.title}</div>
                    <div style={{ fontSize: isSmallMobile ? '0.7rem' : '0.9rem', fontWeight: 'bold' }}>{service.price.toLocaleString()} тг</div>
                  </button>
                ))}
              </div>
            </div>

             {/* Дополнительные услуги */}
            <div>
              <h3 style={{ color: '#fff', marginBottom: '15px', fontSize: isSmallMobile ? '1.1rem' : '1.3rem' }}>Дополнительные услуги</h3>
               <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isSmallMobile ? 2 : isMobile ? 3 : 4}, 1fr)`, gap: '10px' }}>
                {services.additional.map(service => (
                  <button key={service.id} onClick={() => handleAddToCart(service)} style={{
                    padding: isSmallMobile ? '10px 5px' : '15px 10px',
                    background: isSelected(service.id) ? '#a855f7' : 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: isSmallMobile ? '0.8rem' : '1rem' }}>{service.title}</div>
                    <div style={{ fontSize: isSmallMobile ? '0.7rem' : '0.9rem', fontWeight: 'bold' }}>{service.price.toLocaleString()} тг</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            flex: '1',
            maxWidth: isMobile ? 'none' : '300px',
            background: isMobile ? 'none' : 'linear-gradient(120deg, #9C27B0 0%, #673AB7 100%)',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '12px' : '20px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: isMobile ? '15px' : '0',
            borderTop: isMobile ? '1px solid rgba(255,255,255,0.2)' : 'none',
            paddingTop: isMobile ? '15px' : '20px'
          }}>
            <h2 style={{
              fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.4rem' : '1.8rem',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '15px'
            }}>
              Ваш заказ
            </h2>

            <div style={{
              flex: 1,
              maxHeight: isMobile ? '200px' : 'none',
              overflowY: 'auto',
              paddingRight: isMobile ? '5px' : '0',
              marginBottom: '10px'
            }}>
              {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#fff', opacity: 0.7, fontSize: isMobile ? '0.9rem' : '1rem' }}>Выберите услуги</p>
              ) : (
                <>
                  <button onClick={clearCart} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.8, marginBottom: '10px' }}>
                    <FaTrashRestore /> Очистить
                  </button>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cartItems.map(item => (
                      <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 10px', borderRadius: '8px' }}>
                        <p style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '500' }}>{item.title}</p>
                        <p style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 'bold' }}>{item.price.toLocaleString()} тг</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.2rem' : '1.3rem', fontWeight: 'bold', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '10px'
              }}>
                <span>Итого:</span>
                <span>{calculateTotal().toLocaleString()} тг</span>
              </div>
              <button
                onClick={handleContinue}
                disabled={cartItems.length === 0}
                style={{
                  width: '100%', background: cartItems.length > 0 ? '#25D366' : '#555', color: '#fff', border: 'none', padding: isSmallMobile ? '12px' : '14px', borderRadius: '10px', fontSize: isSmallMobile ? '1rem' : '1.1rem', fontWeight: '600', cursor: cartItems.length > 0 ? 'pointer' : 'not-allowed', opacity: cartItems.length > 0 ? 1 : 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.3s ease', marginTop: '10px'
                }}
              >
                <span>Продолжить</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApartmentCleaningModal; 