import React, { useState, useRef, useEffect } from 'react';
import './PromptInput.scss';

export default function PromptInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Автоматическая подстройка высоты textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend?.(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="prompt-form" onSubmit={handleSubmit}>
      <div className="prompt-form__container">
        <textarea
          ref={textareaRef}
          className="prompt-form__input"
          placeholder="Спросите Signal-master..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          type="submit"
          className="prompt-form__button"
          disabled={!value.trim() || disabled}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
      <span className="prompt-form__hint">
        Enter — отправить, Shift+Enter — новая строка
      </span>
    </form>
  );
}