import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';
import './Reviews.css';

// Импортируем изображения из папки assets
import otziv1 from '../assets/otziv1.jpg';
import otziv2 from '../assets/otziv2.jpg';
import otziv3 from '../assets/otziv3.jpg';
import otziv4 from '../assets/otziv4.jpg';
import otziv5 from '../assets/otziv5.jpg';
import otziv6 from '../assets/otziv6.jpg';
import otziv7 from '../assets/otziv7.jpg';
import otziv8 from '../assets/otziv8.jpg';
import otziv9 from '../assets/otziv9.jpg';
import otziv10 from '../assets/otziv10.jpg';

const reviewScreenshots = [
  otziv1,
  otziv2, 
  otziv3,
  otziv4,
  otziv5,
  otziv6,
  otziv7,
  otziv8,
  otziv9,
  otziv10
];

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Автопрокрутка каждые 5 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % reviewScreenshots.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + reviewScreenshots.length) % reviewScreenshots.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotateY: direction > 0 ? 30 : -30,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotateY: direction < 0 ? 30 : -30,
      filter: "blur(10px)",
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <AnimatedSection animation="fadeIn" className="reviews-section" id="reviews-section">
      <AnimatedSection animation="slideUp" delay={0.2}>
        <h2>Отзывы</h2>
      </AnimatedSection>
      <div className="slider-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="slider-wrapper">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.8, ease: "easeInOut" },
                rotateY: { duration: 0.8, ease: "easeInOut" },
                filter: { duration: 0.6, ease: "easeInOut" }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  handleNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev();
                }
              }}
              className="slide-item"
            >
              <img
                src={reviewScreenshots[currentSlide]}
                alt={`Отзыв ${currentSlide + 1}`}
                className="slide-image"
              />
            </motion.div>
          </AnimatePresence>

          {/* Кнопки навигации */}
          <motion.button
            className="nav-button prev-button"
            onClick={handlePrev}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            &#8249;
          </motion.button>
          
          <motion.button
            className="nav-button next-button"
            onClick={handleNext}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            &#8250;
          </motion.button>
        </div>

        {/* Индикаторы */}
        <div className="slider-dots">
          {reviewScreenshots.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                backgroundColor: index === currentSlide ? "#f47ac2" : "rgba(255, 255, 255, 0.5)"
              }}
            />
          ))}
        </div>

        {/* Счетчик слайдов */}
        <div className="slide-counter">
          {currentSlide + 1} / {reviewScreenshots.length}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Reviews; 