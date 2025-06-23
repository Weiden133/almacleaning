const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock database for bookings
let bookings = [];
let bookingIdCounter = 1;

// Validation middleware for booking creation
const validateBooking = [
  body('serviceId')
    .isInt({ min: 1 })
    .withMessage('ID услуги должен быть положительным числом'),
  body('customerName')
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя клиента должно быть от 2 до 50 символов'),
  body('customerPhone')
    .matches(/^(\+7|8)[0-9]{10}$/)
    .withMessage('Номер телефона должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX'),
  body('customerEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email'),
  body('address')
    .isLength({ min: 10, max: 200 })
    .withMessage('Адрес должен быть от 10 до 200 символов'),
  body('preferredDate')
    .isISO8601()
    .withMessage('Дата должна быть в формате ISO 8601'),
  body('preferredTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Время должно быть в формате HH:MM'),
  body('area')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Площадь должна быть от 1 до 1000 кв.м'),
  body('rooms')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Количество комнат должно быть от 1 до 20'),
  body('comment')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Комментарий не должен превышать 500 символов')
];

// POST /api/bookings - создать новое бронирование
router.post('/', validateBooking, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Ошибки валидации',
        details: errors.array()
      });
    }

    const {
      serviceId,
      customerName,
      customerPhone,
      customerEmail,
      address,
      preferredDate,
      preferredTime,
      area,
      rooms,
      comment
    } = req.body;

    // Проверяем, что дата не в прошлом
    const bookingDate = new Date(`${preferredDate}T${preferredTime}`);
    if (bookingDate < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Нельзя забронировать услугу на прошедшую дату'
      });
    }

    // Создаем новое бронирование
    const newBooking = {
      id: bookingIdCounter++,
      serviceId: parseInt(serviceId),
      customerName,
      customerPhone,
      customerEmail,
      address,
      preferredDate,
      preferredTime,
      area: parseInt(area),
      rooms: rooms ? parseInt(rooms) : null,
      comment: comment || '',
      status: 'pending', // pending, confirmed, completed, cancelled
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      message: 'Бронирование успешно создано',
      data: newBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при создании бронирования'
    });
  }
});

// GET /api/bookings - получить все бронирования (для админки)
router.get('/', (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    let filteredBookings = [...bookings];
    
    // Фильтрация по статусу
    if (status) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.status === status
      );
    }
    
    // Фильтрация по дате
    if (date) {
      filteredBookings = filteredBookings.filter(booking => 
        booking.preferredDate === date
      );
    }
    
    // Сортировка по дате создания (новые первыми)
    filteredBookings.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedBookings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(filteredBookings.length / limit),
        count: filteredBookings.length,
        perPage: parseInt(limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении бронирований'
    });
  }
});

// GET /api/bookings/:id - получить конкретное бронирование
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Бронирование не найдено'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении бронирования'
    });
  }
});

// PUT /api/bookings/:id/status - обновить статус бронирования
router.put('/:id/status', [
  body('status')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Недопустимый статус')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Ошибки валидации',
        details: errors.array()
      });
    }

    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Бронирование не найдено'
      });
    }
    
    bookings[bookingIndex].status = status;
    bookings[bookingIndex].updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: 'Статус бронирования обновлен',
      data: bookings[bookingIndex]
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при обновлении статуса'
    });
  }
});

// GET /api/bookings/check/availability - проверить доступность времени
router.get('/check/availability', (req, res) => {
  try {
    const { date, time } = req.query;
    
    if (!date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Необходимо указать дату и время'
      });
    }
    
    // Проверяем, есть ли бронирования на это время
    const conflictingBookings = bookings.filter(booking => 
      booking.preferredDate === date && 
      booking.preferredTime === time &&
      booking.status !== 'cancelled'
    );
    
    const isAvailable = conflictingBookings.length === 0;
    
    res.json({
      success: true,
      available: isAvailable,
      message: isAvailable 
        ? 'Время доступно для бронирования' 
        : 'Время уже забронировано'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при проверке доступности'
    });
  }
});

module.exports = router; 