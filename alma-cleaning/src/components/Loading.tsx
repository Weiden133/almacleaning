import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Loading = ({ size = 'medium', color = 'blue' }: LoadingProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getColor = () => {
    switch (color) {
      case 'red':
        return 'border-red-500';
      case 'green':
        return 'border-green-500';
      case 'yellow':
        return 'border-yellow-500';
      default:
        return 'border-blue-500';
    }
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${getSize()} border-4 border-t-transparent rounded-full ${getColor()}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
};

export default Loading; 