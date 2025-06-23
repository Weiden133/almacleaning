import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Equipment from './components/Equipment';
import Advantages from './components/Advantages';
// import PriceList from './components/PriceList';
import Reviews from './components/Reviews';
import Partners from './components/Partners';
import Footer from './components/Footer';
import About from './components/About';
import CornerWhatsApp from './components/CornerWhatsApp';
import CornerInstagram from './components/CornerInstagram';
import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div style={{
        paddingTop: '110px',
        maxHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <HeroSection />
          <Services />
          <Advantages />
          <Reviews />
          <Partners />
          <About />
          <Footer />
          <CornerWhatsApp />
          <CornerInstagram />
        </div>
      </div>
    </>
  );
}

export default App; 