import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification = ({ message, type, onClose, duration = 5000 }: NotificationProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${getTypeStyles()} shadow-lg`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <span className="text-xl">{getIcon()}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification; 