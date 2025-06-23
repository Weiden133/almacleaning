import React, { useState } from 'react';
import './App.css';

interface CartItem {
  id: string;
  name: string;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (serviceName: string) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: serviceName
    };
    setCart([...cart, newItem]);
    
    // Animation for cart button
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
      cartButton.classList.add('bounce');
      setTimeout(() => cartButton.classList.remove('bounce'), 500);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const generateWhatsAppMessage = () => {
    const message = cart.map(item => `• ${item.name}`).join('%0A');
    return `https://wa.me/77002175992?text=Здравствуйте! Хочу заказать:%0A${message}`;
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo-block">
            <img src="/logo.png" alt="AlmaCleaning logo" className="logo" />
            <div className="logo-text">
              <h1>AlmaCleaning</h1>
              <p>Работаем 24/7</p>
            </div>
          </div>

          <nav className="main-nav">
            <a href="#services">Услуги</a>
            <a href="#reviews">Отзывы</a>
            <a href="#partners">Партнёры</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <div className="cart-button" onClick={toggleCart}>
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="container">
          <h2>Добро пожаловать!</h2>
          <p>AlmaCleaning — ваш надёжный партнёр в мире чистоты!</p>
          <ul>
            <li>💧 Только безопасные средства</li>
            <li>👨‍🔧 Опытные мастера</li>
            <li>⏱ Быстрый выезд и гарантия качества</li>
          </ul>
          <p>Профессиональная химчистка и клининг в вашем городе.</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section container">
        <h2>Наши услуги</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#2a44c9' }}>
              <i className="fa-solid fa-broom fa-4x"></i>
            </div>
            <h3>Генеральная уборка</h3>
            <button onClick={() => addToCart('Генеральная уборка')}>Добавить</button>
          </div>

          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#a855f7' }}>
              <i className="fas fa-calendar-alt fa-4x"></i>
            </div>
            <h3>Уборка после мероприятий</h3>
            <button onClick={() => addToCart('Уборка после мероприятий')}>Добавить</button>
          </div>

          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#ff0000' }}>
              <i className="fas fa-couch fa-4x"></i>
            </div>
            <h3>Химчистка мебели</h3>
            <button onClick={() => addToCart('Химчистка мебели')}>Добавить</button>
          </div>

          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#00c6fb' }}>
              <i className="fas fa-rug fa-4x"></i>
            </div>
            <h3>Химчистка ковров</h3>
            <button onClick={() => addToCart('Химчистка ковров')}>Добавить</button>
          </div>

          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#10b981' }}>
              <i className="fa-solid fa-person-booth fa-4x"></i>
            </div>
            <h3>Химчистка штор</h3>
            <button onClick={() => addToCart('Химчистка штор')}>Добавить</button>
          </div>

          <div className="service-card">
            <div className="icon-wrapper" style={{ color: '#f59e0b' }}>
              <i className="fas fa-cloud fa-4x"></i>
            </div>
            <h3>Сухой туман</h3>
            <button onClick={() => addToCart('Сухой туман')}>Добавить</button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="partners-section container">
        <h2>Наши партнёры</h2>
        <p>Мы работаем с физ. и юр. лицами. Среди наших клиентов крупные компании</p>
        <div className="partners-logos">
          <img src="/images/teatralka.png" alt="Театралка" />
          <img src="/images/zebra.png" alt="Zebra Coffee" />
          <img src="/images/hikv.png" alt="Hikvision" />
          <img src="/images/akademy.png" alt="Академия Здоровья" />
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section container">
        <h2>Отзывы наших клиентов</h2>
        <div className="reviews-carousel">
          <img src="/images/otziv1.jpg" alt="Отзыв клиента 1" />
          <img src="/images/otziv2.jpg" alt="Отзыв клиента 2" />
          <img src="/images/otziv3.jpg" alt="Отзыв клиента 3" />
          <img src="/images/otziv4.jpg" alt="Отзыв клиента 4" />
          <img src="/images/otziv5.jpg" alt="Отзыв клиента 5" />
          <img src="/images/otziv6.jpg" alt="Отзыв клиента 6" />
          <img src="/images/otziv7.jpg" alt="Отзыв клиента 7" />
          <img src="/images/otziv8.jpg" alt="Отзыв клиента 8" />
          <img src="/images/otziv9.jpg" alt="Отзыв клиента 9" />
          <img src="/images/otziv10.jpg" alt="Отзыв клиента 10" />
        </div>
      </section>

      {/* Equipment Section */}
      <section className="equipment-section container">
        <h2>Наше оборудование и химия</h2>
        <p>Мы используем только профессиональное оборудование лучших мировых производителей из Италии и Германии</p>
        <div className="equipment-grid">
          <div className="equipment-card">
            <img src="/images/rerher.webp" alt="Пылесос PUZZI 8/1 C" />
            <h4>Пылесос PUZZI 8/1 C</h4>
          </div>
          <div className="equipment-card">
            <img src="/images/csychka.webp" alt="Сушилка BF-533" />
            <h4>Сушилка BF-533</h4>
          </div>
          <div className="equipment-card">
            <img src="/images/himiy2.webp" alt="Моющее ср-во KARCHER" />
            <h4>Моющее ср-во KARCHER</h4>
          </div>
          <div className="equipment-card">
            <img src="/images/kerher.webp" alt="Парогенератор KARCHER" />
            <h4>Парогенератор KARCHER</h4>
          </div>
          <div className="equipment-card">
            <img src="/images/himiy.webp" alt="Химия CHEMSPEK" />
            <h4>Химия CHEMSPEK</h4>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="footer-contacts-section container">
        <h3>Связаться с нами</h3>
        <div className="footer-social">
          <a href="https://wa.me/77002175992" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="social-icon-img" />
          </a>
          <a href="https://www.instagram.com/almatacleaning/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="social-icon-img" />
          </a>
        </div>

        <div className="footer-contacts">
          <div className="contact-card">
            <h4>Даниэль — Директор</h4>
            <p><a href="tel:+77002175992">+7 (700) 217-59-92</a></p>
            <p><a href="mailto:daniel@almacleaning.kz">daniel@almacleaning.kz</a></p>
            <p><a href="https://wa.me/77002175992">WhatsApp</a></p>
          </div>
          <div className="contact-card">
            <h4>Роман — Менеджер</h4>
            <p><a href="tel:+77477503520">+7 (747) 750-35-20</a></p>
            <p><a href="mailto:roman@almacleaning.kz">roman@almacleaning.kz</a></p>
            <p><a href="https://wa.me/77477503520">WhatsApp</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; 2025 AlmaCleaning. Все права защищены.</p>
          <p>Свяжитесь с нами: <a href="https://wa.me/77001234567">WhatsApp</a> | <a href="tel:+77001234567">+7 (700) 123-45-67</a></p>
        </div>
      </footer>

      {/* Cart Modal */}
      <div className={`cart-modal ${isCartOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Ваша корзина</h3>
          <button className="close-cart" onClick={closeCart}>&times;</button>
        </div>
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(item.id)}>Удалить</button>
            </li>
          ))}
        </ul>
        <a 
          href={generateWhatsAppMessage()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="order-button"
        >
          <i className="fab fa-whatsapp"></i> Оформить через WhatsApp
        </a>
      </div>

      {/* Overlay for cart */}
      {isCartOpen && (
        <div 
          className="cart-overlay" 
          onClick={closeCart}
        />
      )}
    </div>
  );
}

export default App; 