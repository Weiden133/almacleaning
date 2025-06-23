import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaTrashRestore, FaArrowRight, FaPlus, FaMinus } from 'react-icons/fa';

const WindowFacadeCleaningModal = ({ isOpen, onClose, onAddToMainCart, isMobile, isSmallMobile }) => {
  const [cartItems, setCartItems] = useState([]);

  const services = [
    { id: 'window-cleaning', title: 'Мытьё окон', price: 1500, step: 1, min: 0 },
    { id: 'facade-cleaning', title: 'Мытьё фасадов', price: 2000, step: 1, min: 0 },
  ];

  const handleQuantityChange = (serviceId, newQuantity) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    const quantity = Math.max(service.min || 0, newQuantity);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === serviceId);
      if (quantity === 0) {
        return prevItems.filter(item => item.id !== serviceId);
      }
      if (existingItem) {
        return prevItems.map(item =>
          item.id === serviceId ? { ...item, quantity } : item
        );
      }
      return [...prevItems, { ...service, quantity }];
    });
  };

  const clearCart = () => setCartItems([]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleContinue = () => {
    if (cartItems.length > 0) {
      onAddToMainCart(cartItems);
      clearCart();
      onClose();
    }
  };

  const getItemQuantity = (serviceId) => {
    return cartItems.find(item => item.id === serviceId)?.quantity || 0;
  };

  if (!isOpen) return null;

  const modalContentStyle = {
    background: isMobile 
      ? 'linear-gradient(150deg, #3a0d42 0%, #2c0f38 100%)' 
      : 'linear-gradient(135deg, rgba(244,122,194,0.15) 0%, rgba(162,89,198,0.15) 100%)',
    borderRadius: isMobile ? '24px' : '18px',
    padding: isSmallMobile ? '12px' : isMobile ? '16px' : '20px',
    maxWidth: isMobile ? '100%' : '1000px',
    width: '100%',
    height: isMobile ? '95vh' : 'auto',
    maxHeight: isMobile ? '95vh' : '85vh',
    overflowY: 'auto',
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
              Мытьё окон и фасадов (цена за м²)
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: isMobile ? '12px' : '15px',
            }}>
              {services.map(service => {
                const quantity = getItemQuantity(service.id);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: isSmallMobile ? '10px' : '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: isSmallMobile ? '1rem' : '1.1rem', color: '#fff', margin: 0 }}>{service.title}</h3>
                      <p style={{ fontSize: isSmallMobile ? '0.9rem' : '1rem', color: '#f47ac2', margin: 0, fontWeight: 'bold' }}>{service.price.toLocaleString()} тг/м²</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isSmallMobile ? '8px' : '12px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', width: '100%' }}>
                      <button onClick={() => handleQuantityChange(service.id, quantity - service.step)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: isSmallMobile ? '1.1rem' : '1.3rem' }}><FaMinus /></button>
                       <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(service.id, parseFloat(e.target.value) || 0)}
                        style={{
                          width: '80px',
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          color: '#fff',
                          borderRadius: '4px',
                          fontSize: '1rem',
                          MozAppearance: 'textfield',
                          padding: '5px'
                        }}
                        min={service.min || 0}
                        step={service.step || 1}
                      />
                      <button onClick={() => handleQuantityChange(service.id, quantity + service.step)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: isSmallMobile ? '1.1rem' : '1.3rem' }}><FaPlus /></button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div style={{
            flex: '1',
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
                <p style={{ textAlign: 'center', color: '#fff', opacity: 0.7, fontSize: isMobile ? '0.9rem' : '1rem' }}>Здесь появятся выбранные услуги</p>
              ) : (
                <>
                  <button onClick={clearCart} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '0.9rem', opacity: 0.8, marginBottom: '10px' }}>
                    <FaTrashRestore /> Очистить
                  </button>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cartItems.map(item => (
                      <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px 10px', borderRadius: '8px' }}>
                        <div>
                          <p style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '500' }}>{item.title}</p>
                          <p style={{ margin: '4px 0 0', color: '#ccc', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{item.quantity} м² x {item.price.toLocaleString()} тг</p>
                        </div>
                        <p style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: 'bold' }}>{(item.quantity * item.price).toLocaleString()} тг</p>
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

export default WindowFacadeCleaningModal; 