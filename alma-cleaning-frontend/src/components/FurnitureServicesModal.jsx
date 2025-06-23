import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaTrashRestore, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import divan from '../assets/divan.jpg';
import trexvest from '../assets/trexvest.jpeg';
import divanugl from '../assets/divanugl.jpg';
import divan4 from '../assets/divan4.jpg';
import matrasx1 from '../assets/matrasx1.jpg';
import matras2x from '../assets/matras2x.jpg';
import stul22 from '../assets/stul22.jpg';
import stul from '../assets/stul.jpg';
import creslo from '../assets/creslo.jpg';

const FurnitureServicesModal = ({ isOpen, onClose, onAddToMainCart, isMobile, isSmallMobile }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const services = [
    { id: 'divan2', title: 'Диван двухместный', price: 10000, image: divan },
    { id: 'divan3', title: 'Диван трехместный', price: 12000, image: trexvest },
    { id: 'divanugl', title: 'Диван угловой', price: 14000, image: divanugl },
    { id: 'divan5', title: 'Диван от 5 и более мест', price: 16000, displayPrice: 'цена договорная', image: divan4 },
    { id: 'matras1', title: 'Матрас односпальный', price: 5000, image: matrasx1 },
    { id: 'matras2', title: 'Матрас двуспальный', price: 10000, image: matras2x },
    { id: 'stul1', title: 'Стул без спинки', price: 1000, image: stul22 },
    { id: 'stul2', title: 'Стул со спинкой', price: 1500, image: stul },
    { id: 'creslo', title: 'Кресло', price: 4000, image: creslo }
  ];

  const handleAddToCart = (service) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === service.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (serviceId) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const handleQuantityChange = (serviceId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === serviceId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleContinue = () => {
    if (cart.length > 0) {
      onAddToMainCart(cart);
      clearCart();
      onClose();
    }
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
          {/* Левая панель с услугами */}
          <div style={{ flex: isMobile ? '1' : '2', overflowY: 'auto', paddingRight: isMobile ? '5px' : '10px' }}>
            <h2 style={{
              fontSize: isSmallMobile ? '1.4rem' : isMobile ? '1.6rem' : '1.8rem',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              Химчистка мебели
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: isMobile ? '12px' : '20px',
              padding: isMobile ? '0' : '10px'
            }}>
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    display: isMobile ? 'flex' : 'block',
                    alignItems: isMobile ? 'center' : 'normal',
                    gap: isMobile ? '10px' : '0',
                    padding: isMobile ? '10px' : '0'
                  }}
                >
                  <div style={{
                    width: isMobile ? '100px' : '100%',
                    height: isMobile ? '80px' : 'auto',
                    flexShrink: 0,
                    display: isMobile ? 'flex' : 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: isMobile ? 0 : '10px 0'
                  }}>
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{
                        width: isMobile ? '100px' : '120px',
                        height: isMobile ? '80px' : '90px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                      }}
                    />
                  </div>
                  <div style={{ padding: isMobile ? '0 10px 0 0' : '20px', flex: 1 }}>
                    <h3 style={{
                      fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.4rem',
                      color: '#fff',
                      marginBottom: '8px',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.2rem',
                      color: '#f47ac2',
                      marginBottom: '15px',
                      fontWeight: 'bold'
                    }}>
                      {service.displayPrice || (service.price ? `${service.price.toLocaleString()} тенге` : 'цена договорная')}
                    </p>
                    <button
                      onClick={() => handleAddToCart(service)}
                      style={{
                        width: '100%',
                        background: service.price ? 'linear-gradient(45deg, #a855f7, #c084fc)' : '#25D366',
                        color: '#fff',
                        border: 'none',
                        padding: isMobile ? '10px' : '12px',
                        borderRadius: '8px',
                        fontSize: isMobile ? '0.9rem' : '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaShoppingCart size={isMobile ? 16 : 20} />
                      {isMobile ? 'Добавить' : 'В корзину'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Правая панель с корзиной (для мобильных - нижняя панель) */}
          <div style={{
            flex: '1',
            background: isMobile ? 'none' : 'linear-gradient(120deg, #9C27B0 0%, #673AB7 100%)',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '12px' : '20px',
            height: 'auto',
            position: 'relative',
            top: 0,
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
              maxHeight: isMobile ? '150px' : 'none',
              overflowY: 'auto',
              flex: isMobile ? '1' : '0',
              paddingRight: isMobile ? '5px' : '0',
              marginBottom: '10px'
            }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#fff', opacity: 0.7, fontSize: isMobile ? '0.9rem' : '1rem' }}>Корзина пуста</p>
            ) : (
              <>
                <button
                  onClick={clearCart}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    opacity: 0.8,
                    marginBottom: '10px'
                  }}
                >
                  <FaTrashRestore /> Очистить
                </button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cart.map(item => (
                    <li key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      padding: isMobile ? '8px' : '10px',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <p style={{ margin: 0, color: '#fff', fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '500' }}>{item.title}</p>
                        <p style={{ margin: '4px 0 0', color: '#f47ac2', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>{item.price.toLocaleString()} тг</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '6px' }}>
                          <button onClick={() => handleQuantityChange(item.id, -1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>-</button>
                          <span style={{ color: '#fff', fontSize: '1rem', minWidth: '15px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, 1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.7 }}>
                          <FaTrash size={isMobile ? 14 : 16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#fff',
                fontSize: isSmallMobile ? '1.1rem' : isMobile ? '1.2rem' : '1.3rem',
                fontWeight: 'bold',
                padding: '10px 0',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                marginTop: '10px'
              }}>
                <span>Итого:</span>
                <span>{calculateTotal().toLocaleString()} тг</span>
              </div>
              <button
                onClick={handleContinue}
                disabled={cart.length === 0}
                style={{
                  width: '100%',
                  background: cart.length > 0 ? '#25D366' : '#555',
                  color: '#fff',
                  border: 'none',
                  padding: isSmallMobile ? '12px' : '14px',
                  borderRadius: '10px',
                  fontSize: isSmallMobile ? '1rem' : '1.1rem',
                  fontWeight: '600',
                  cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
      
                  opacity: cart.length > 0 ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  marginTop: '10px'
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

export default FurnitureServicesModal; 