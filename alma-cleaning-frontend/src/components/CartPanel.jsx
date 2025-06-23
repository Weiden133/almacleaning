import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaWhatsapp, FaTrashRestore, FaTimes } from 'react-icons/fa';

const CartPanel = ({ cart, removeFromCart, clearCart, sendToWhatsApp, isOpen, onClose }) => {
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1900
            }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: isSmallMobile ? '95%' : isMobile ? '90%' : '90%',
              maxWidth: isMobile ? 'none' : '380px',
              background: '#9C27B0',
              zIndex: 2000,
              padding: isMobile ? '15px' : '20px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: isMobile ? '12px' : '15px'
            }}>
              <h2 className="font-bold" style={{ 
                fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.6rem' : '1.8rem', 
                color: 'white' 
              }}>
                Корзина
              </h2>
              <button 
                onClick={onClose} 
                style={{
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  padding: '5px'
                }}
              >
                <FaTimes />
              </button>
            </div>
            <CartContent 
              cart={cart} 
              removeFromCart={removeFromCart} 
              clearCart={clearCart} 
              sendToWhatsApp={sendToWhatsApp}
              isMobile={isMobile}
              isSmallMobile={isSmallMobile}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CartContent = ({ cart, removeFromCart, clearCart, sendToWhatsApp, isMobile, isSmallMobile }) => (
  <>
    <div style={{
      display: 'flex', 
      justifyContent: 'flex-start', 
      marginBottom: isMobile ? '6px' : '8px'
    }}>
      <button
        onClick={clearCart}
        className="text-light font-semibold"
        style={{
          background: 'rgba(255,255,255,0.13)',
          border: 'none',
          borderRadius: 6,
          padding: isMobile ? '3px 10px' : '4px 12px',
          fontSize: isSmallMobile ? '12px' : isMobile ? '13px' : '14px',
          cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
          opacity: cart.length === 0 ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          transition: 'opacity 0.2s',
        }}
        disabled={cart.length === 0}
        title="Очистить корзину"
      >
        <FaTrashRestore size={isMobile ? 12 : 14} /> Очистить
      </button>
    </div>
    {cart.length === 0 ? (
      <p className="text-light font-medium" style={{ 
        textAlign: 'center', 
        opacity: 0.8, 
        margin: '8px 0', 
        fontSize: isSmallMobile ? '0.8em' : isMobile ? '0.85em' : '0.9em' 
      }}>
        Корзина пуста
      </p>
    ) : (
      <ul style={{
        listStyle: 'none', 
        padding: 0, 
        margin: '0 -10px', 
        flex: 1,
        maxHeight: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 200px)',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
        {cart.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: isMobile ? '6px' : '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(248,249,250,0.15) 50%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 10,
              padding: isSmallMobile ? '8px 10px' : isMobile ? '9px 11px' : '10px 12px',
              textAlign: 'left',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ 
              flex: 1, 
              fontSize: isSmallMobile ? '0.8em' : isMobile ? '0.85em' : '0.9em', 
              lineHeight: '1.2' 
            }}>
              <div style={{ 
                fontWeight: 500, 
                color: '#fff', 
                marginBottom: '2px',
                fontSize: isSmallMobile ? '0.85em' : isMobile ? '0.9em' : '0.9em'
              }}>
                {item.title}
              </div>
              {item.quantity && (
                <div style={{ 
                  fontSize: isSmallMobile ? '0.75em' : isMobile ? '0.8em' : '0.85em', 
                  opacity: 0.9 
                }}>
                  {item.quantity} м² × {item.price?.toLocaleString()} тг
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px' }}>
              {item.quantity && item.price && (
                <span style={{ 
                  fontSize: isSmallMobile ? '0.75em' : isMobile ? '0.8em' : '0.85em', 
                  fontWeight: 600, 
                  color: '#fff' 
                }}>
                  {(item.quantity * item.price).toLocaleString()} тг
                </span>
              )}
              <button 
                onClick={() => removeFromCart(item.id)} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: isMobile ? 12 : 14,
                  cursor: 'pointer',
                  padding: isMobile ? 1 : 2,
                  opacity: 0.7,
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
                title="Удалить"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
    <div style={{
      marginTop: 'auto',
      paddingTop: isMobile ? '10px' : '12px',
      borderTop: '1px solid rgba(255,255,255,0.15)',
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '6px' : '8px'
    }}>
      {cart.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          fontSize: isSmallMobile ? '0.85em' : isMobile ? '0.9em' : '0.95em'
        }}>
          <span className="text-light font-semibold">
            Итого:
          </span>
          <span className="text-light font-semibold">
            {cart.reduce((sum, item) => {
              if (item.quantity && item.price) {
                return sum + (item.quantity * item.price);
              }
              return sum + (item.price || 0);
            }, 0).toLocaleString()} тг
          </span>
        </div>
      )}
      <button
        onClick={sendToWhatsApp}
        disabled={cart.length === 0}
        className="text-light font-semibold"
        style={{
          width: '100%',
          background: '#25D366',
          border: 'none',
          borderRadius: 6,
          padding: isSmallMobile ? '10px 8px' : isMobile ? '12px 8px' : '8px',
          fontSize: isSmallMobile ? '0.85rem' : isMobile ? '0.9rem' : '0.9rem',
          cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
          opacity: cart.length === 0 ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          boxShadow: '0 2px 6px rgba(37,211,102,0.2)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={e => {
          if (cart.length > 0) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,211,102,0.3)';
          }
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 6px rgba(37,211,102,0.2)';
        }}
      >
        <FaWhatsapp size={isMobile ? 16 : 18} />
        Отправить в WhatsApp
      </button>
    </div>
  </>
);

export default CartPanel;