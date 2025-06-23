const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Слишком много попыток входа. Попробуйте снова через 15 минут.'
  }
});

// Mock admin user (в реальном проекте это должно быть в базе данных)
const adminUsers = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@cleaningsite.com',
    passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: "admin123"
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

// Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Токен доступа не предоставлен'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Недействительный токен'
      });
    }
    req.user = user;
    next();
  });
};

// Валидация для входа
const validateLogin = [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('Имя пользователя должно быть от 3 до 50 символов'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен быть не менее 6 символов')
];

// POST /api/auth/login - вход в систему
router.post('/login', authLimiter, validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Ошибки валидации',
        details: errors.array()
      });
    }

    const { username, password } = req.body;

    // Ищем пользователя
    const user = adminUsers.find(u => 
      u.username === username || u.email === username
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Проверяем пароль
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Создаем JWT токен
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Успешный вход в систему',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при входе в систему'
    });
  }
});

// POST /api/auth/refresh - обновление токена
router.post('/refresh', authenticateToken, (req, res) => {
  try {
    const user = adminUsers.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    // Создаем новый токен
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Токен обновлен',
      data: { token }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при обновлении токена'
    });
  }
});

// GET /api/auth/profile - получить профиль пользователя
router.get('/profile', authenticateToken, (req, res) => {
  try {
    const user = adminUsers.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при получении профиля'
    });
  }
});

// POST /api/auth/logout - выход из системы
router.post('/logout', authenticateToken, (req, res) => {
  // В реальном приложении здесь можно добавить токен в blacklist
  res.json({
    success: true,
    message: 'Успешный выход из системы'
  });
});

// GET /api/auth/verify - проверка валидности токена
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Токен действителен',
    data: {
      user: {
        id: req.user.id,
        username: req.user.username,
        role: req.user.role
      }
    }
  });
});

// Экспортируем middleware для использования в других роутах
router.authenticateToken = authenticateToken;

module.exports = router; 