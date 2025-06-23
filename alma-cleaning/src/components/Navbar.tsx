import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_NAME, NAVIGATION_ITEMS } from '../constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed mt-16 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col items-start">
              <img
                className="h-16 w-auto"
                src="/images/logo.png"
                alt="AlmaCleaning Logo"
              />
              <span className="text-base text-gray-600">Работаем 24/7</span>
            </Link>
          </div>

          {/* Навигационные ссылки (десктоп) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Кнопка мобильного меню */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Открыть главное меню</span>
              {/* Иконка меню */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Иконка закрытия */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 