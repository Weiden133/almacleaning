import { Link } from 'react-router-dom';
import {
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  WORKING_HOURS,
  NAVIGATION_ITEMS,
  SOCIAL_LINKS
} from '../constants';

const Footer = () => {
  return (
    <footer className="w-full bg-green-900 text-white py-6 mt-0">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left text-sm">
          © {new Date().getFullYear()} AlmaCleaning. Все права защищены.
        </div>
        <div className="text-center md:text-right text-xs mt-2 md:mt-0 opacity-80">
          Выездная клининговая компания в Алматы
        </div>
      </div>
    </footer>
  );
};

export default Footer; 