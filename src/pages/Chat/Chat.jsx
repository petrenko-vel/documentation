import { useState, useRef, useEffect } from 'react';
import './Chat.scss';

/**
 * Компонент Chat - интерфейс для отправки и получения сообщений
 * Поддерживает отправку сообщений, отображение истории, автоскролл и интеграцию с API
 */
export default function Chat() {
    // Состояние для хранения всех сообщений чата
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Привет! Я готов ответить на ваши вопросы.',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    
    // Состояние для текста в поле ввода
    const [inputText, setInputText] = useState('');
    
    // Состояние для индикации процесса отправки сообщения
    const [isLoading, setIsLoading] = useState(false);
    
    // Реф для контейнера сообщений (для автоскролла)
    const messagesEndRef = useRef(null);
    
    // Реф для поля ввода
    const inputRef = useRef(null);

    /**
     * Функция для форматирования времени отправки сообщения
     * @param {Date} date - Дата сообщения
     * @returns {string} Отформатированная строка времени
     */
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    /**
     * Функция для автоматической прокрутки к последнему сообщению
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     * отсутствуют
Киселев
Кузнецов
Кушхабиев
Мовланова
Сервирог
Сурмач
Юсеф

     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Автоматическая прокрутка при добавлении новых сообщений
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * Заглушка для API - имитация получения ответа от бота
     * В реальном приложении здесь будет запрос к вашему API
     * @param {string} userMessage - Сообщение пользователя
     * @returns {Promise<string>} Ответ бота
     */
    const getBotResponse = async (userMessage) => {
        // Имитация задержки API запроса
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Простая заглушка - в реальном приложении здесь будет fetch к API
        // Пример:
        // const response = await fetch('/api/chat', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message: userMessage })
        // });
        // const data = await response.json();
        // return data.response;
        
        return `Я получил ваше сообщение: "${userMessage}". Это заглушка ответа. Подключите API для реальных ответов.`;
    };

    /**
     * Обработчик отправки сообщения
     * Добавляет сообщение пользователя и получает ответ от бота
     */
    const handleSendMessage = async () => {
        // Проверка на пустое сообщение
        if (!inputText.trim() || isLoading) {
            return;
        }

        const userMessage = inputText.trim();
        
        // Очистка поля ввода
        setInputText('');
        
        // Добавление сообщения пользователя
        const userMessageObj = {
            id: Date.now(),
            text: userMessage,
            sender: 'user',
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessageObj]);
        setIsLoading(true);

        try {
            // Получение ответа от бота через API (заглушка)
            const botResponse = await getBotResponse(userMessage);
            
            // Добавление ответа бота
            const botMessageObj = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, botMessageObj]);
        } catch (error) {
            // Обработка ошибок API
            const errorMessageObj = {
                id: Date.now() + 1,
                text: 'Произошла ошибка при получении ответа. Попробуйте позже.',
                sender: 'bot',
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessageObj]);
        } finally {
            setIsLoading(false);
            // Фокус на поле ввода после отправки
            inputRef.current?.focus();
        }
    };

    /**
     * Обработчик нажатия клавиши в поле ввода
     * Отправляет сообщение при нажатии Enter (без Shift)
     */
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <section className="chat">
                <div className="chat__inner container">
                    {/* Контейнер для отображения сообщений */}
                    <div className="chat__messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chat__message chat__message--${message.sender}`}
                            >
                                <div className="chat__message-content">
                                    <p className="chat__message-text">{message.text}</p>
                                    <span className="chat__message-time">
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        
                        {/* Индикатор загрузки ответа бота */}
                        {isLoading && (
                            <div className="chat__message chat__message--bot">
                                <div className="chat__message-content">
                                    <div className="chat__loader">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Невидимый элемент для автоскролла */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Поле ввода и кнопка отправки */}
                    <div className="chat__input-container">
                        <textarea
                            ref={inputRef}
                            className="chat__input"
                            placeholder="Введите ваше сообщение..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            className="chat__send-button"
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isLoading}
                            aria-label="Отправить сообщение"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22 2L11 13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22 2L15 22L11 13L2 9L22 2Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}


// export default function Chat() {


//     return (
//         <>
//         <input type="text" />
//         <button type="button">нажать</button>
//         </>
//     )
// }