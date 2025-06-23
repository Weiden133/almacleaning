const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for contact form (more restrictive)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    error: 'Слишком много обращений. Попробуйте снова через 15 минут.'
  }
});

// Mock storage for contact messages
let contactMessages = [];
let messageIdCounter = 1;

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validation middleware for contact form
const validateContactForm = [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя должно быть от 2 до 50 символов'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email'),
  body('phone')
    .optional()
    .matches(/^(\+7|8)[0-9]{10}$/)
    .withMessage('Номер телефона должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX'),
  body('subject')
    .isLength({ min: 5, max: 100 })
    .withMessage('Тема должна быть от 5 до 100 символов'),
  body('message')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Сообщение должно быть от 10 до 1000 символов')
];

// POST /api/contact - отправить сообщение через контактную форму
router.post('/', contactLimiter, validateContactForm, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Ошибки валидации',
        details: errors.array()
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Сохраняем сообщение в "базе данных"
    const newMessage = {
      id: messageIdCounter++,
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'new', // new, read, replied
      createdAt: new Date().toISOString(),
      ip: req.ip
    };

    contactMessages.push(newMessage);

    // Отправляем email уведомление (если настроены переменные окружения)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        // Email для администратора
        const adminEmailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Новое сообщение с сайта: ${subject}`,
          html: `
            <h2>Новое сообщение с сайта клининговых услуг</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Телефон:</strong> ${phone || 'Не указан'}</p>
            <p><strong>Тема:</strong> ${subject}</p>
            <p><strong>Сообщение:</strong></p>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>Дата:</strong> ${new Date(newMessage.createdAt).toLocaleString('ru-RU')}</p>
            <p><strong>IP:</strong> ${req.ip}</p>
          `
        };

        // Автоответ клиенту
        const clientEmailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: email,
          subject: 'Ваше сообщение получено - Клининговые услуги',
          html: `
            <h2>Спасибо за ваше обращение!</h2>
            <p>Здравствуйте, ${name}!</p>
            <p>Мы получили ваше сообщение и обязательно свяжемся с вами в ближайшее время.</p>
            <p><strong>Ваше сообщение:</strong></p>
            <div style="background: #f5f5f5; padding: 10px; border-radius: 5px;">
              <strong>Тема:</strong> ${subject}<br>
              <strong>Сообщение:</strong> ${message.replace(/\n/g, '<br>')}
            </div>
            <p>Обычно мы отвечаем в течение 24 часов.</p>
            <p>С уважением,<br>Команда клининговых услуг</p>
          `
        };

        // Отправляем оба email
        await Promise.all([
          transporter.sendMail(adminEmailOptions),
          transporter.sendMail(clientEmailOptions)
        ]);

      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Не прерываем выполнение, просто логируем ошибку
      }
    }

    res.status(201).json({
      success: true,
      message: 'Сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
      data: {
        id: newMessage.id,
        timestamp: newMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при отправке сообщения'
    });
  }
});

// POST /api/contact/callback - заказать обратный звонок
router.post('/callback', contactLimiter, [
  body('name')
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя должно быть от 2 до 50 символов'),
  body('phone')
    .matches(/^(\+7|8)[0-9]{10}$/)
    .withMessage('Номер телефона должен быть в формате +7XXXXXXXXXX или 8XXXXXXXXXX'),
  body('preferredTime')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Удобное время должно быть от 3 до 50 символов')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Ошибки валидации',
        details: errors.array()
      });
    }

    const { name, phone, preferredTime } = req.body;

    // Сохраняем запрос на обратный звонок
    const callbackRequest = {
      id: messageIdCounter++,
      type: 'callback',
      name,
      phone,
      preferredTime: preferredTime || 'В любое время',
      status: 'new',
      createdAt: new Date().toISOString(),
      ip: req.ip
    };

    contactMessages.push(callbackRequest);

    // Отправляем уведомление администратору
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        const emailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: 'Заказ обратного звонка',
          html: `
            <h2>Заказ обратного звонка</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Телефон:</strong> ${phone}</p>
            <p><strong>Удобное время:</strong> ${preferredTime || 'В любое время'}</p>
            <p><strong>Дата заявки:</strong> ${new Date(callbackRequest.createdAt).toLocaleString('ru-RU')}</p>
            <p><strong>IP:</strong> ${req.ip}</p>
          `
        };

        await transporter.sendMail(emailOptions);
      } catch (emailError) {
        console.error('Callback email error:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Заявка на обратный звонок принята. Мы свяжемся с вами в ближайшее время.',
      data: {
        id: callbackRequest.id,
        timestamp: callbackRequest.createdAt
      }
    });

  } catch (error) {
    console.error('Callback request error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при обработке заявки на обратный звонок'
    });
  }
});

// GET /api/contact/messages - получить все сообщения (для админки)
router.get('/messages', (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    
    let filteredMessages = [...contactMessages];
    
    // Фильтрация по статусу
    if (status) {
      filteredMessages = filteredMessages.filter(msg => msg.status === status);
    }
    
    // Фильтрация по типу
    if (type) {
      filteredMessages = filteredMessages.filter(msg => 
        type === 'callback' ? msg.type === 'callback' : !msg.type
      );
    }
    
    // Сортировка по дате создания (новые первыми)
    filteredMessages.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedMessages = filteredMessages.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedMessages,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(filteredMessages.length / limit),
        count: filteredMessages.length,
        perPage: parseInt(limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении сообщений'
    });
  }
});

// PUT /api/contact/messages/:id/status - обновить статус сообщения
router.put('/messages/:id/status', [
  body('status')
    .isIn(['new', 'read', 'replied'])
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
    
    const messageIndex = contactMessages.findIndex(msg => msg.id === id);
    
    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Сообщение не найдено'
      });
    }
    
    contactMessages[messageIndex].status = status;
    
    res.json({
      success: true,
      message: 'Статус сообщения обновлен',
      data: contactMessages[messageIndex]
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ошибка при обновлении статуса'
    });
  }
});

module.exports = router; 