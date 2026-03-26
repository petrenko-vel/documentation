import React from 'react';
import './TypingIndicator.scss';

export default function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-indicator__avatar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
          <path d="M6 10a6 6 0 0 0-4 5.5V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5A6 6 0 0 0 18 10"/>
        </svg>
      </div>
      <div className="typing-indicator__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
