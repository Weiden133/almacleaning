import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
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
        maxWidth: '600px'
      }}>
        <h1 style={{ color: '#f47ac2', marginBottom: '20px' }}>
          🎉 React работает!
        </h1>
        <p style={{ color: '#333', fontSize: '18px', marginBottom: '20px' }}>
          Если вы видите этот текст, значит React приложение загружается корректно.
        </p>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h3>Что было исправлено:</h3>
          <ul style={{ textAlign: 'left', color: '#333' }}>
            <li>✅ Удалены дублирующиеся стили body в App.css</li>
            <li>✅ Исправлены конфликтующие CSS правила</li>
            <li>✅ Добавлен Google Analytics</li>
            <li>✅ Заменен фон на градиент</li>
          </ul>
        </div>
        <p style={{ color: '#666' }}>
          Теперь можно вернуться к полной версии сайта!
        </p>
      </div>
    </div>
  );
}

export default App;
