import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

// Placeholder data - replace with actual data
const services = [
  {
    title: 'Химчистка кресла',
    duration: '30 мин.',
    price: '₸4000-00',
    image: '/images/placeholder-chair.jpg', // Replace with actual image paths
  },
  {
    title: 'Химчистка односпального матраса',
    duration: '1 ч.',
    price: '₸5000-00',
    image: '/images/placeholder-mattress-single.jpg', // Replace with actual image paths
  },
  {
    title: 'Химчистка двухспального матраса',
    duration: '1 ч. 30 мин.',
    price: '₸10000-00',
    image: '/images/placeholder-mattress-double.jpg', // Replace with actual image paths
  },
  {
    title: 'Химчистка ковра',
    duration: '1 ч.',
    price: '₸750-00',
    image: '/images/placeholder-carpet.jpg', // Replace with actual image paths
  },
  // Add more services based on your screenshots/data
];

const ServicesList = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-center text-palette-dark-green mb-8">Выберите услуги</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {services.map((service, index) => (
          <div key={index} className="flex items-center bg-white shadow-md rounded-lg p-4">
            {/* Service Image */}
            <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
              {/* Replace with actual image tag if using images */}
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="ml-4 flex-grow">
              {/* Service Title */}
              <h2 className="text-lg font-semibold text-palette-dark-green">{service.title}</h2>
              
              {/* Service Details */}
              <div className="flex items-center text-gray-600 mt-1 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{service.duration}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m0 0a4.999 4.999 0 017.07 0m7.071 7.07l-4.243-4.243a1.998 1.998 0 00-2.828 0L6.343 23.343m0 0a4.999 4.999 0 017.07 0z" />
                </svg>
                <span>{service.price}</span>
              </div>
            </div>

            {/* Selector and Button */}
            <div className="flex items-center ml-4 flex-shrink-0">
              {/* Placeholder for quantity selector */}
              <select className="border rounded p-2 mr-2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              
              <button className="bg-palette-pink-dark hover:bg-palette-reddish text-white font-semibold px-4 py-2 rounded-md transition-colors">
                Выбрать
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Add a floating WhatsApp button or link for selected items */}
      {/* This would require state management to track selected items */}
      {/* For simplicity now, keeping the main floating WhatsApp button */} 
    </div>
  );
};

export default ServicesList; 