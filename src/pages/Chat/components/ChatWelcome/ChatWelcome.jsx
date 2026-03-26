import React from 'react';
import './ChatWelcome.scss';

const SUGGESTIONS = [
  'Как настроить монитор частот?',
  'Объясни структуру данных',
  'Какие горячие клавиши есть?',
  'Как экспортировать отчёт?',
];

export default function ChatWelcome({ onSuggestionClick }) {
  return (
    <div className="chat-welcome">
      <div className="chat-welcome__icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 9h8M8 13h5"/>
        </svg>
      </div>
      <h2 className="chat-welcome__title">Signal-master AI</h2>
      <p className="chat-welcome__subtitle">
        Задайте вопрос — я помогу разобраться с документацией
      </p>
      <div className="chat-welcome__suggestions">
        {SUGGESTIONS.map((text, i) => (
          <button
            key={i}
            className="chat-welcome__suggestion"
            onClick={() => onSuggestionClick(text)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
