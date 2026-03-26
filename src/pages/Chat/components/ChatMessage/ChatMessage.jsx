import React from 'react';
import './ChatMessage.scss';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`chat-message ${isUser ? 'chat-message--user' : 'chat-message--bot'}`}>
      {!isUser && (
        <div className="chat-message__avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
            <path d="M6 10a6 6 0 0 0-4 5.5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5A6 6 0 0 0 18 10"/>
            <circle cx="9" cy="6" r="0.5" fill="currentColor"/>
            <circle cx="15" cy="6" r="0.5" fill="currentColor"/>
          </svg>
        </div>
      )}
      <div className="chat-message__bubble">
        <p className="chat-message__text">{message.text}</p>
        <span className="chat-message__time">{time}</span>
      </div>
    </div>
  );
}
