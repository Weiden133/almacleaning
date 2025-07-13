import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';

const PriceList = () => {
  const [activeCategory, setActiveCategory] = useState('furniture');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const prices = {
    sofas: [
      { name: '2-местный диван', description: 'ширина 100 – 150 см', price: '13000' },
      { name: '3-местный диван', description: 'ширина 150 – 200 см', price: '17000' },
      { name: 'Угловой диван', description: '2 посадочных места + угол', price: '22000' },
      { name: 'Угловой диван', description: '3 посадочных места + угол', price: '25000' },
      { name: 'Угловой диван', description: '4 посадочных места + угол', price: '30000' },
      { name: '6-местный диван', description: 'или П-образный', price: '35000' }
    ],
    chairs: [
      { name: 'Стул без мягкой спинки', price: '2500' },
      { name: 'Стул с мягкой спинкой', price: '3000' },
      { name: 'Кресло', description: 'ширина 50–60 см', price: '7500' },
      { name: 'Офисное кресло', price: '3000' },
      { name: 'Кресло руководителя', price: '6500' }
    ],
    other: [
      { name: 'Матрас односпальный', price: '8000' },
      { name: 'Матрас двуспальный', price: '12000' },
      { name: 'Ковер', description: 'за м²', price: '2000' },
      { name: 'Ковролин', description: 'за м²', price: '1500' }
    ]
  };

  const categoryTabs = [
    { key: 'furniture', label: '🛋 Мебель', icon: '🛋' },
    { key: 'mattresses', label: '🛏 Матрасы', icon: '🛏' },
    { key: 'carpets', label: '🏠 Ковры', icon: '🏠' },
    { key: 'curtains', label: '🪟 Шторы', icon: '🪟' },
    { key: 'cleaning', label: '🧽 Уборка', icon: '🧽' }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (item) => {
    const prefix = item.pricePrefix || '';
    return `${prefix}${item.price.toLocaleString()} ₸`;
  };

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;

    const message = `🌟 Заказ с сайта AlmaCleaning!\n\n${cart.map(item => 
      `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₸`
    ).join('\n')}\n\n💰 Общая сумма: ${getTotalPrice().toLocaleString()} ₸\n\n📞 Пожалуйста, свяжитесь со мной для уточнения деталей заказа!`;

    const whatsappUrl = `https://wa.me/77478858220?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="services-section">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ fontSize: '2.5rem', marginBottom: 40 }}
      >
        Цены на услуги
      </motion.h2>

      <div className="price-categories">
        {/* Диваны */}
        <motion.div
          className="price-category"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Диваны</h3>
          <div className="price-list">
            {prices.sofas.map((item, index) => (
              <div key={index} className="price-item">
                <div className="price-info">
                  <h4>{item.name}</h4>
                  {item.description && <p>{item.description}</p>}
                </div>
                <div className="price-value">{item.price} ₸</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Стулья и кресла */}
        <motion.div
          className="price-category"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3>Стулья и кресла</h3>
          <div className="price-list">
            {prices.chairs.map((item, index) => (
              <div key={index} className="price-item">
                <div className="price-info">
                  <h4>{item.name}</h4>
                  {item.description && <p>{item.description}</p>}
                </div>
                <div className="price-value">{item.price} ₸</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Другие услуги */}
        <motion.div
          className="price-category"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Другие услуги</h3>
          <div className="price-list">
            {prices.other.map((item, index) => (
              <div key={index} className="price-item">
                <div className="price-info">
                  <h4>{item.name}</h4>
                  {item.description && <p>{item.description}</p>}
                </div>
                <div className="price-value">{item.price} ₸</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="price-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        style={{ 
          marginTop: 40, 
          fontSize: '1.1rem',
          color: '#fff',
          textAlign: 'center',
          maxWidth: 800,
          margin: '40px auto 0'
        }}
      >
        <p>Минимальный заказ на услугу с выездом в пределах города – 7000 ₸</p>
        <p>Выезд за пределы города рассчитывается индивидуально</p>
      </motion.div>
    </section>
  );
};

export default PriceList; 