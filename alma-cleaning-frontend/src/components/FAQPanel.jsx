import React from 'react';

const questions = [
  'Как осуществляется оплата?',
  'Какие средства вы используете?',
  'Сколько времени занимает уборка?',
  'Работаете ли вы по выходным?'
];

const FAQPanel = () => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 12px rgba(162,89,198,0.07)',
    padding: '18px 20px',
    marginBottom: 0,
    marginTop: 0,
    fontSize: '1em',
    color: '#2d1457',
    fontWeight: 500
  }}>
    <div style={{ fontWeight: 700, fontSize: '1.15em', marginBottom: 10, color: '#7c1fa0' }}>
      Частые вопросы
    </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {questions.map((q, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ color: '#a259c6', fontSize: 18, marginRight: 8 }}>❯</span>
          {q}
        </li>
      ))}
    </ul>
  </div>
);

export default FAQPanel; 