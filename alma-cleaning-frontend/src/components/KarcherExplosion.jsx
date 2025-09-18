import React from 'react';
import karcherGif from '/images/gifs/0912.gif';
import './KarcherExplosion.css';

const KarcherExplosion = ({ isMobile, isSmallMobile }) => {

  return (
    <div className="karcher-explosion-container">
      {/* GIF-анимация Karcher */}
      <div className="karcher-gif-container">
        <img 
          src={karcherGif} 
          alt="Karcher Professional Vacuum Animation" 
          className="karcher-gif"
        />
      </div>
    </div>
  );
};

export default KarcherExplosion;
