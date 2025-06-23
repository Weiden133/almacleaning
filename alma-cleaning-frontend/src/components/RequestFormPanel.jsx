import React, { useState } from 'react';

const RequestFormPanel = () => {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить отправку формы на сервер или в Telegram
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(162,89,198,0.07)',
      padding: '18px 20px',
      marginBottom: 0,
      marginTop: 0,
      fontSize: '1em',
      color: '#2d1457',
      fontWeight: 500,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }}>
      <div style={{ fontWeight: 700, fontSize: '1.15em', marginBottom: 10, color: '#7c1fa0' }}>
        Оставить заявку
      </div>
      <input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        style={{
          borderRadius: 8,
          border: '1.5px solid #e0c6f7',
          padding: '8px 12px',
          fontSize: '1em',
          marginBottom: 8
        }}
      />
      <button
        type="submit"
        style={{
          background: 'linear-gradient(135deg, #f47ac2 0%, #a259c6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 0',
          fontWeight: 700,
          fontSize: '1em',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(162,89,198,0.10)'
        }}
        disabled={sent}
      >
        {sent ? 'Отправлено!' : 'Отправить'}
      </button>
    </form>
  );
};

export default RequestFormPanel; 