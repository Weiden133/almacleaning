import { motion } from 'framer-motion';
import { Service } from '../types';

const Services = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Наши услуги
        </motion.h1>

        <div className="space-y-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-8 md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Что входит в услугу:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <span className="text-2xl font-bold text-blue-600">
                      от {service.price} ₸
                    </span>
                    <span className="text-gray-500 ml-2">/ {service.unit}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const services: Service[] = [
  {
    title: 'Уборка квартир',
    description: 'Комплексная уборка жилых помещений с использованием профессиональных средств и оборудования.',
    image: 'https://placehold.co/600x400?text=Apartment+Cleaning',
    features: [
      'Мытье полов и плинтусов',
      'Уборка санузла и ванной комнаты',
      'Мытье кухонных поверхностей',
      'Удаление пыли со всех поверхностей',
      'Мытье окон и зеркал',
      'Вынос мусора'
    ],
    price: '15000',
    unit: 'квартира'
  },
  {
    title: 'Уборка офисов',
    description: 'Регулярная уборка офисных помещений для поддержания чистоты и порядка в рабочей среде.',
    image: 'https://placehold.co/600x400?text=Office+Cleaning',
    features: [
      'Уборка рабочих мест',
      'Мытье полов и ковровых покрытий',
      'Уборка кухонной зоны',
      'Мытье санузлов',
      'Удаление пыли с поверхностей',
      'Мытье стеклянных перегородок'
    ],
    price: '20000',
    unit: '100 м²'
  },
  {
    title: 'Генеральная уборка',
    description: 'Тщательная уборка всех помещений с удалением сложных загрязнений и наведением идеального порядка.',
    image: 'https://placehold.co/600x400?text=Deep+Cleaning',
    features: [
      'Мытье всех поверхностей',
      'Удаление сложных загрязнений',
      'Мытье окон и балконов',
      'Уборка шкафов и полок',
      'Мытье бытовой техники',
      'Удаление пыли из труднодоступных мест'
    ],
    price: '25000',
    unit: 'квартира'
  }
];

export default Services; 