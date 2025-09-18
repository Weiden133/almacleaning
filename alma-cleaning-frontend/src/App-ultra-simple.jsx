import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffd1f7 0%, #f3e0ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
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
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Если вы видите этот текст, значит React работает!
        </p>
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