import React from 'react';

const CornerInstagram = () => (
  <a
    href="https://www.instagram.com/almatacleaning/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Связаться в Instagram"
    className="corner-instagram-btn"
    style={{
      position: 'fixed',
      bottom: '192px',
      right: '32px',
      zIndex: 9999,
      background: 'rgb(225, 48, 108)',
      borderRadius: '50%',
      width: '64px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'rgba(225, 48, 108, 0.18) 0px 4px 24px',
      transition: 'box-shadow 0.2s, transform 0.2s',
      cursor: 'pointer',
      overflow: 'visible'
    }}
  >
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        animation: '2.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) 0s infinite normal both running vibrate-anim'
      }}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
    <style>{`
      .corner-instagram-btn::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(225, 48, 108, 0.25);
        z-index: -1;
        animation: radar-pulse 2.4s infinite cubic-bezier(.36,.07,.19,.97);
      }
      @keyframes vibrate-anim {
        0% { transform: translate(0); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-2px, 2px); }
        20%, 40%, 60%, 80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }
      @keyframes radar-pulse {
        0% {
          opacity: 0.7;
          transform: translate(-50%, -50%) scale(1);
        }
        70% {
          opacity: 0.15;
          transform: translate(-50%, -50%) scale(1.7);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(2);
        }
      }
    `}</style>
  </a>
);

export default CornerInstagram; 