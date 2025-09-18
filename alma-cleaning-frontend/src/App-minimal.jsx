import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffd1f7 0%, #f3e0ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        color: '#333'
      }}>
        <h1 style={{ color: '#f47ac2', marginBottom: '20px' }}>
          🌟 AlmaCleaning
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Профессиональная химчистка и клининг
        </p>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h3>Наши услуги:</h3>
          <ul style={{ textAlign: 'left', color: '#333' }}>
            <li>🛋️ Химчистка мебели</li>
            <li>🏠 Уборка квартир</li>
            <li>🪣 Химчистка ковров</li>
            <li>🪟 Мойка окон</li>
          </ul>
        </div>
        <div style={{ marginTop: '30px' }}>
          <a 
            href="https://wa.me/77478858220" 
            style={{
              background: '#f47ac2',
              color: 'white',
              padding: '15px 30px',
              textDecoration: 'none',
              borderRadius: '25px',
              display: 'inline-block',
              fontWeight: 'bold'
            }}
          >
            Заказать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;