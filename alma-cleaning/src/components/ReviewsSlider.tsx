import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewsSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const reviews = [
    '/otziv/otziv1.jpg',
    '/otziv/otziv2.jpg',
    '/otziv/otziv3.jpg',
    '/otziv/otziv4.jpg',
    '/otziv/otziv5.jpg',
    '/otziv/otziv6.jpg',
    '/otziv/otziv7.jpg',
    '/otziv/otziv8.jpg',
    '/otziv/otziv9.jpg',
    '/otziv/otziv10.jpg',
  ];

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="w-full max-w-4xl mx-auto relative py-8">
      <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-2xl shadow-lg bg-white">
        <AnimatePresence initial={false} mode='wait'>
          <motion.img
            key={reviews[current]}
            src={reviews[current]}
            alt={`Отзыв ${current + 1}`}
            className="object-contain w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Кнопки навигации */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-3 z-10"
          aria-label="Предыдущий отзыв"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-3 z-10"
          aria-label="Следующий отзыв"
        >
          →
        </button>

        {/* Индикаторы (точки) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                current === index ? 'bg-gray-800' : 'bg-gray-400'
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSlider; 