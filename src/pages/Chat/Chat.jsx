import { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.scss';
import PromptInput from './components/PromptInput';
import ChatMessage from './components/ChatMessage';
import ChatWelcome from './components/ChatWelcome';
import TypingIndicator from './components/TypingIndicator';

// ─── Заглушка для ответов нейросети ────────────────────────────────
const MOCK_RESPONSES = [
  'Это отличный вопрос! Давайте разберёмся по порядку.\n\nДля начала откройте раздел «Настройки» в боковом меню и перейдите на вкладку «Параметры». Там вы найдёте все необходимые опции для конфигурации.',
  'Signal-master поддерживает несколько режимов работы:\n\n• Автоматический — система сама подбирает оптимальные параметры\n• Ручной — полный контроль над каждым параметром\n• Комбинированный — для опытных пользователей',
  'Вот как это работает:\n\n1. Перейдите в панель управления\n2. Выберите нужный модуль из списка\n3. Нажмите «Применить» для сохранения настроек\n\nЕсли возникнут сложности — обращайтесь, помогу!',
  'Да, эта функция доступна в текущей версии. Для её активации необходимо обновить конфигурацию через раздел документации. Подробная инструкция находится в разделе «Быстрый старт».',
  'Рекомендую ознакомиться с разделом «Горячие клавиши» в документации:\n\n• Ctrl+S — сохранить конфигурацию\n• Ctrl+R — перезагрузить данные\n• Ctrl+F — поиск по документации\n• Esc — закрыть текущую панель',
];

function getMockResponse() {
  const index = Math.floor(Math.random() * MOCK_RESPONSES.length);
  return MOCK_RESPONSES[index];
}

// Имитация задержки ответа от API
function fakeSendMessage(userMessage) {
  return new Promise((resolve) => {
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => {
      resolve(getMockResponse());
    }, delay);
  });
}
// ───────────────────────────────────────────────────────────────────

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Заглушка: замените fakeSendMessage на реальный API-вызов
      const responseText = await fakeSendMessage(text);

      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: responseText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Извините, произошла ошибка. Попробуйте ещё раз.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="chat">
      <div className="chat__inner">
        {hasMessages ? (
          <div className="chat__messages">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <ChatWelcome onSuggestionClick={handleSend} />
        )}
        <PromptInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}