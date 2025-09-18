import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      color: 'black', 
      background: 'white', 
      minHeight: '100vh',
      zIndex: 9999,
      position: 'relative'
    }}>
      <h1>Тест - контент загружается!</h1>
      <p>Если вы видите этот текст, значит React работает правильно.</p>
      <div style={{ 
        background: 'lightblue', 
        padding: '20px', 
        margin: '20px 0',
        borderRadius: '10px'
      }}>
        <h2>Это тестовая карточка</h2>
        <p>Проверяем отображение контента</p>
      </div>
    </div>
  );
}

export default App;
