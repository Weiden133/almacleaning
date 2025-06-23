import React, { useEffect, useState } from 'react';

const MobileOptimizer = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsSmallMobile(width <= 480);
      setIsTablet(width > 768 && width <= 1024);
    };

    // Проверяем размер экрана при загрузке
    checkScreenSize();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkScreenSize);

    // Добавляем CSS классы к body для глобальных стилей
    const body = document.body;
    if (isSmallMobile) {
      body.classList.add('mobile-small');
      body.classList.remove('mobile', 'tablet', 'desktop');
    } else if (isMobile) {
      body.classList.add('mobile');
      body.classList.remove('mobile-small', 'tablet', 'desktop');
    } else if (isTablet) {
      body.classList.add('tablet');
      body.classList.remove('mobile', 'mobile-small', 'desktop');
    } else {
      body.classList.add('desktop');
      body.classList.remove('mobile', 'mobile-small', 'tablet');
    }

    // Добавляем мета-тег для предотвращения зума на мобильных
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Добавляем стили для улучшения производительности на мобильных
    if (isMobile) {
      const style = document.createElement('style');
      style.textContent = `
        /* Оптимизация для мобильных устройств */
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Разрешаем выделение текста в input полях */
        input, textarea, select {
          -webkit-user-select: text;
          -khtml-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }
        
        /* Улучшение скроллинга */
        html {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Оптимизация анимаций */
        * {
          animation-duration: 0.3s !important;
          transition-duration: 0.2s !important;
        }
        
        /* Улучшение читаемости */
        body {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      // Удаляем добавленные стили при размонтировании
      const addedStyle = document.querySelector('style[data-mobile-optimizer]');
      if (addedStyle) {
        addedStyle.remove();
      }
    };
  }, [isMobile, isSmallMobile, isTablet]);

  // Передаем информацию о размере экрана через контекст или props
  const screenInfo = {
    isMobile,
    isSmallMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet
  };

  return (
    <div 
      className={`mobile-optimizer ${isSmallMobile ? 'mobile-small' : isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}
      data-screen-size={isSmallMobile ? 'small-mobile' : isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}
    >
      {React.cloneElement(children, { screenInfo })}
    </div>
  );
};

export default MobileOptimizer; 