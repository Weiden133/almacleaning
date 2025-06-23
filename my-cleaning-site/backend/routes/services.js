const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock data for cleaning services
const services = [
  {
    id: 1,
    name: "Генеральная уборка",
    description: "Комплексная уборка всех помещений с использованием профессиональных средств",
    price: 2500,
    duration: 240, // minutes
    category: "residential",
    features: [
      "Влажная уборка всех поверхностей",
      "Мытье окон",
      "Уборка санузлов",
      "Пылесос ковров и мебели",
      "Дезинфекция"
    ]
  },
  {
    id: 2,
    name: "Поддерживающая уборка",
    description: "Регулярная уборка для поддержания чистоты",
    price: 1500,
    duration: 120,
    category: "residential",
    features: [
      "Влажная уборка",
      "Пылесос",
      "Вынос мусора",
      "Уборка кухни и санузла"
    ]
  },
  {
    id: 3,
    name: "Уборка после ремонта",
    description: "Специализированная уборка после строительных и ремонтных работ",
    price: 3500,
    duration: 360,
    category: "post-construction",
    features: [
      "Удаление строительной пыли",
      "Мытье всех поверхностей",
      "Очистка от следов краски",
      "Уборка строительного мусора",
      "Полировка поверхностей"
    ]
  },
  {
    id: 4,
    name: "Офисная уборка",
    description: "Профессиональная уборка офисных помещений",
    price: 1200,
    duration: 90,
    category: "commercial",
    features: [
      "Уборка рабочих мест",
      "Влажная уборка",
      "Вынос мусора",
      "Уборка переговорных",
      "Санитарная обработка"
    ]
  },
  {
    id: 5,
    name: "Мытье окон",
    description: "Профессиональное мытье окон и стеклянных поверхностей",
    price: 800,
    duration: 60,
    category: "specialized",
    features: [
      "Мытье окон с двух сторон",
      "Очистка рам",
      "Мытье подоконников",
      "Удаление разводов",
      "Экологичные средства"
    ]
  }
];

// GET /api/services - получить все услуги
router.get('/', (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    
    let filteredServices = [...services];
    
    // Фильтрация по категории
    if (category) {
      filteredServices = filteredServices.filter(service => 
        service.category === category
      );
    }
    
    // Фильтрация по цене
    if (minPrice) {
      filteredServices = filteredServices.filter(service => 
        service.price >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredServices = filteredServices.filter(service => 
        service.price <= parseInt(maxPrice)
      );
    }
    
    res.json({
      success: true,
      count: filteredServices.length,
      data: filteredServices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении услуг'
    });
  }
});

// GET /api/services/:id - получить конкретную услугу
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const service = services.find(s => s.id === id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Услуга не найдена'
      });
    }
    
    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении услуги'
    });
  }
});

// GET /api/services/categories - получить все категории
router.get('/categories/list', (req, res) => {
  try {
    const categories = [
      {
        key: 'residential',
        name: 'Жилые помещения',
        description: 'Уборка квартир, домов, комнат'
      },
      {
        key: 'commercial',
        name: 'Коммерческие помещения',
        description: 'Уборка офисов, магазинов, учреждений'
      },
      {
        key: 'post-construction',
        name: 'После ремонта',
        description: 'Специализированная уборка после строительных работ'
      },
      {
        key: 'specialized',
        name: 'Специализированные услуги',
        description: 'Отдельные виды клининговых услуг'
      }
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении категорий'
    });
  }
});

module.exports = router; 