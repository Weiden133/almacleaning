import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import TwoGisIcon from '../components/icons/TwoGisIcon';
import InstagramIcon from '../components/icons/InstagramIcon';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ReviewsSlider from '../components/ReviewsSlider';

const Home = () => {
  const [isServicesPanelOpen, setIsServicesPanelOpen] = useState(false);

  const openServicesPanel = () => {
    setIsServicesPanelOpen(true);
  };

  const closeServicesPanel = () => {
    setIsServicesPanelOpen(false);
  };

  return (
    <>
      {/* Навигационная панель - Фиксированная */}
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Smaller logo in nav */}
              <Link to="/" className="flex items-center">
                <img 
                  src="/images/logo2.png" 
                  alt="Логотип AlmaCleaning" 
                  className="h-12 w-auto"
                />
                <span className="ml-2 text-palette-dark-green font-semibold">Работаем 24/7</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-palette-dark-green hover:text-palette-pink-dark font-medium">Главная</Link>
                <Link to="/services" className="text-palette-dark-green hover:text-palette-pink-dark font-medium">Услуги</Link>
                <Link to="/about" className="text-palette-dark-green hover:text-palette-pink-dark font-medium">О нас</Link>
                <Link to="/contacts" className="text-palette-dark-green hover:text-palette-pink-dark font-medium">Контакты</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-[70vh] bg-pink-400 flex flex-col items-center relative text-white" style={{ paddingTop: '80px' }}> 
        <FloatingWhatsApp />
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-4xl mx-auto px-4">
          {/* Main logo in hero */}
          <img 
            src="/images/logo2.png" 
            alt="Логотип AlmaCleaning" 
            className="h-64 w-auto mb-4"
          />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Добро пожаловать!
          </h1>
          <p className="text-2xl md:text-3xl mb-3">
            AlmaCleaning — ваш надёжный партнёр в мире чистоты!
          </p>
          <ul className="text-xl md:text-2xl mb-3 space-y-2 text-left w-full">
            <li>✅ Только безопасные средства</li>
            <li>✅ Опытные мастера</li>
            <li>✅ Быстрый выезд и гарантия качества</li>
          </ul>
          <p className="text-xl md:text-2xl mb-4">
            Профессиональная химчистка и клининг в вашем городе.
          </p>
          <motion.button
            onClick={openServicesPanel}
            className="bg-white text-palette-pink-dark font-semibold px-20 py-8 rounded-full text-2xl shadow-lg transition-colors duration-200 hover:bg-gray-100"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Заказать Услуги
          </motion.button>
        </div>
      </div>

      {/* Секция Услуги */}
      <section className="w-full py-16 bg-white flex flex-col items-center text-palette-dark-green">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Наши услуги</h2>
        <div className="w-20 h-1 bg-palette-pink-dark mb-10"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          {servicesData.map((service) => (
            <a
              key={service.title}
              href={`https://wa.me/77002175992?text=Здравствуйте!%20Я%20хочу%20заказать:%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-palette-pink-light border border-palette-pink-medium rounded-2xl p-8 flex flex-col items-center shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="text-5xl mb-4 text-palette-pink-dark">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
              <p className="text-palette-dark-grey text-center">{service.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-palette-greyish-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-6 text-palette-dark-green">{advantage.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{advantage.title}</h3>
                <p className="text-gray-200 text-lg">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция Партнеры */}
      <section className="w-full py-36 bg-palette-pink-light flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-palette-dark-green mb-6 text-center">Наши партнеры</h2>
        <p className="text-palette-dark-green text-base mb-16 text-center">Мы работаем с физ. и юр. лицами. Среди наших клиентов крупные компании</p>
        <div className="flex flex-wrap justify-center gap-24 w-full max-w-7xl px-6">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-56 h-36 object-contain mb-6 bg-white rounded-lg shadow p-4"
              />
              <span className="text-palette-dark-green text-lg font-medium text-center">{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Секция Отзывы */}
      <section className="w-full py-16 bg-white flex flex-col items-center text-palette-dark-green">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Отзывы наших клиентов</h2>
        <ReviewsSlider />
      </section>

      {/* Секция Контакты */}
      <section className="w-full py-16 flex flex-col items-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Контакты</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-3xl px-4">
          {/* Блок с кнопками */}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <a
              href="https://wa.me/77002175992?text=Здравствуйте!%20Я%20хочу%20заказать%20уборку."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center"
            >
              <WhatsAppIcon className="w-6 h-6 mr-3 text-white" /> WhatsApp: +7 700 217 5992
            </a>
            <a
              href="https://2gis.kz/almaty/search/almacleaning/firm/70000001101327665/76.89956%2C43.249684?m=76.901862%2C43.246146%2F15.62"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-palette-dark-green text-palette-dark-green font-semibold px-8 py-4 rounded-full text-lg shadow hover:bg-gray-50 transition-colors duration-200 flex items-center"
            >
              <TwoGisIcon className="w-6 h-6 mr-3 text-palette-dark-green" /> Мы на 2ГИС
            </a>
            <a
              href="https://www.instagram.com/almatacleaning/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-palette-dark-brown hover:bg-palette-dark-grey text-palette-pink-dark font-semibold px-8 py-4 rounded-full text-lg shadow transition-colors duration-200 flex items-center"
            >
              <InstagramIcon className="w-6 h-6 mr-3 text-palette-pink-dark" /> Instagram: @almatacleaning
            </a>
          </div>
          {/* Блок с отдельными иконками */}
          <div className="flex gap-6 items-center justify-center mt-8 md:mt-0">
            <a
              href="https://wa.me/77002175992?text=Здравствуйте!%20Я%20хочу%20заказать%20уборку."
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              <WhatsAppIcon className="w-10 h-10" />
            </a>
            <a
              href="https://2gis.kz/almaty/search/almacleaning/firm/70000001101327665/76.89956%2C43.249684?m=76.901862%2C43.246146%2F15.62"
              target="_blank"
              rel="noopener noreferrer"
              className="text-palette-dark-green hover:text-gray-600 transition-colors"
            >
              <TwoGisIcon className="w-10 h-10" />
            </a>
            <a
              href="https://www.instagram.com/almatacleaning/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-palette-dark-brown hover:text-palette-dark-grey transition-colors"
            >
              <InstagramIcon className="w-10 h-10" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const servicesData = [
  {
    title: 'Генеральная уборка',
    desc: 'Комплексная уборка помещений с удалением сложных загрязнений.',
    icon: '🧹',
  },
  {
    title: 'Уборка после мероприятий',
    desc: 'Быстрое и качественное восстановление чистоты после событий.',
    icon: '🎉',
  },
  {
    title: 'Химчистка мебели',
    desc: 'Профессиональная чистка мягкой мебели от пятен и запахов.',
    icon: '🛋️',
  },
  {
    title: 'Химчистка ковров',
    desc: 'Глубокая чистка ковров и ковровых покрытий.',
    icon: '🧼',
  },
  {
    title: 'Химчистка штор',
    desc: 'Деликатная чистка штор и гардин.',
    icon: '🪟',
  },
  {
    title: 'Сухой туман',
    desc: 'Удаление запахов и дезинфекция помещений.',
    icon: '🌫️',
  },
];

const servicesDetailedData = [
  {
    title: 'Генеральная уборка',
    duration: '6 ч.',
    price: '₸850-00',
    image: '/images/placeholder-general.jpg',
  },
  {
    title: 'Влажная уборка',
    duration: '3 ч.',
    price: '₸650-00',
    image: '/images/placeholder-wet.jpg',
  },
  {
    title: 'Химчистка дивана',
    duration: '50 мин.',
    price: '₸10000-00',
    image: '/images/placeholder-sofa-small.jpg',
  },
  {
    title: 'Химчистка трёхместного дивана',
    duration: '1 ч.',
    price: '₸12000-00',
    image: '/images/placeholder-sofa-medium.jpg',
  },
  {
    title: 'Химчистка углового дивана',
    duration: '1 ч. 15 мин.',
    price: '₸14000-00',
    image: '/images/placeholder-sofa-corner.jpg',
  },
  {
    title: 'Химчистка стула',
    duration: '20 мин.',
    price: '₸1000-00',
    image: '/images/placeholder-chair-simple.jpg',
  },
  {
    title: 'Химчистка кресла',
    duration: '30 мин.',
    price: '₸4000-00',
    image: '/images/placeholder-armchair.jpg',
  },
  {
    title: 'Химчистка односпального матраса',
    duration: '1 ч.',
    price: '₸5000-00',
    image: '/images/placeholder-mattress-single.jpg',
  },
  {
    title: 'Химчистка двухспального матраса',
    duration: '1 ч. 30 мин.',
    price: '₸10000-00',
    image: '/images/placeholder-mattress-double.jpg',
  },
  {
    title: 'Химчистка ковра',
    duration: '1 ч.',
    price: '₸750-00',
    image: '/images/placeholder-carpet.jpg',
  },
];

const advantages = [
  {
    icon: '🧹',
    title: 'Профессионализм',
    description: 'Опытные сотрудники с многолетним стажем'
  },
  {
    icon: '✨',
    title: 'Качество',
    description: 'Использование современных средств и оборудования'
  },
  {
    icon: '⏰',
    title: 'Пунктуальность',
    description: 'Строгое соблюдение оговоренного времени'
  },
  {
    icon: '💰',
    title: 'Доступные цены',
    description: 'Гибкая система скидок и специальных предложений'
  }
];

const partners = [
  {
    name: 'Театралка',
    logo: '/images/teatralka.png',
  },
  {
    name: 'Zebra Coffee',
    logo: '/images/zebra.png',
  },
  {
    name: 'Hikvision',
    logo: '/images/hikv.png',
  },
  {
    name: 'Академия Здоровья',
    logo: '/images/akademy.png',
  },
];

export default Home;