import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  title: string;
  duration: string;
  price: string;
  image?: string;
}

interface ServicesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
}

const ServicesPanel = ({ isOpen, onClose, services }: ServicesPanelProps) => {
  // Functionality for 'Выбрать' button will be added later
  const handleSelectService = (service: ServiceItem, quantity: number) => {
    console.log(`Selected ${quantity} of ${service.title}`);
    // Here we would add the logic to handle selection (e.g., add to a temporary selection state)
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose} // Close panel when clicking outside
          />

          {/* Services panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl z-50 p-6 overflow-y-auto"
            style={{
              boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 z-10">
              <h2 className="text-2xl font-bold text-palette-dark-green">Выберите услуги</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Закрыть панель"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                  {/* Service Image */}
                  {service.image && (
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 mr-4">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-grow">
                    {/* Service Title */}
                    <h3 className="text-lg font-semibold text-palette-dark-green">{service.title}</h3>

                    {/* Service Details */}
                    <div className="text-gray-600 text-sm mt-1">
                      <div className="flex items-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{service.duration}</span>
                      </div>
                       <div className="flex items-center mt-1">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m0 0a4.999 4.999 0 017.07 0m7.071 7.07l-4.243-4.243a1.998 1.998 0 00-2.828 0L6.343 23.343m0 0a4.999 4.999 0 017.07 0z" /></svg>
                        <span>{service.price}</span>
                       </div>
                    </div>
                  </div>

                  {/* Selector and Button */}
                  <div className="flex items-center ml-4 flex-shrink-0">
                    <select className="border rounded p-2 text-palette-dark-green">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      {/* Add more options as needed */}
                    </select>

                    <button
                      onClick={() => handleSelectService(service, 1)} // Quantity 1 for now, can connect to selector later
                      className="bg-palette-pink-dark hover:bg-palette-reddish text-white font-semibold px-4 py-2 rounded-md transition-colors ml-2"
                    >
                      Выбрать
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional footer for total or next steps */}
            {/* <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t mt-4">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full">Proceed</button>
            </div> */}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServicesPanel; 