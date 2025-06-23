// Форматирование цены
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseInt(price, 10) : price;
  return new Intl.NumberFormat('ru-RU').format(numPrice);
};

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
};

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация телефона
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Форматирование даты
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Генерация уникального ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Обработка ошибок формы
export const getFormError = (field: string, value: string): string => {
  switch (field) {
    case 'email':
      return !value ? 'Email обязателен' : !isValidEmail(value) ? 'Неверный формат email' : '';
    case 'phone':
      return !value ? 'Телефон обязателен' : !isValidPhone(value) ? 'Неверный формат телефона' : '';
    case 'name':
      return !value ? 'Имя обязательно' : value.length < 2 ? 'Имя должно содержать минимум 2 символа' : '';
    case 'message':
      return !value ? 'Сообщение обязательно' : value.length < 10 ? 'Сообщение должно содержать минимум 10 символов' : '';
    default:
      return '';
  }
}; 