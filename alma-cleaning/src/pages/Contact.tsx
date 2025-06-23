import { motion } from 'framer-motion';
import { useState } from 'react';
import { FormData } from '../types';
import { getFormError, formatPhone } from '../utils';
import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, WORKING_HOURS } from '../constants';
import Notification from '../components/Notification';
import Loading from '../components/Loading';

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach((key) => {
      const error = getFormError(key as keyof FormData, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormData] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setNotification({
        message: 'Пожалуйста, исправьте ошибки в форме',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        service: ''
      });
      setErrors({});
      setNotification({
        message: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.',
        type: 'success'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами для обсуждения деталей уборки
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Услуга
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.service ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Выберите услугу</option>
                  <option value="regular">Регулярная уборка</option>
                  <option value="deep">Генеральная уборка</option>
                  <option value="after">Уборка после ремонта</option>
                  <option value="office">Уборка офиса</option>
                </select>
                {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loading size="small" color="white" />
                    <span>Отправка...</span>
                  </div>
                ) : (
                  'Отправить заявку'
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Телефон</h3>
                <p className="mt-2 text-gray-600">{formatPhone(COMPANY_PHONE)}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-2 text-gray-600">{COMPANY_EMAIL}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Адрес</h3>
                <p className="mt-2 text-gray-600">{COMPANY_ADDRESS}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Режим работы</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Будни:</span> {WORKING_HOURS.weekdays}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Суббота:</span> {WORKING_HOURS.saturday}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Воскресенье:</span> {WORKING_HOURS.sunday}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Contact; 