import { useState, useRef, useEffect, useCallback } from 'react';
import './Chat.scss';
import PromptInput from './components/PromptInput';
import ChatMessage from './components/ChatMessage';
import ChatWelcome from './components/ChatWelcome';
import TypingIndicator from './components/TypingIndicator';
import ChatSidebar from './components/ChatSidebar';

// ─── Заглушка для ответов нейросети ────────────────────────────────
const MOCK_RESPONSES = [
  'Это отличный вопрос! Давайте разберёмся по порядку.\n\nДля начала откройте раздел «Настройки» в боковом меню и перейдите на вкладку «Параметры». Там вы найдёте все необходимые опции для конфигурации.',
  'Signal-master поддерживает несколько режимов работы:\n\n• Автоматический — система сама подбирает оптимальные параметры\n• Ручной — полный контроль над каждым параметром\n• Комбинированный — для опытных пользователей',
  'Вот как это работает:\n\n1. Перейдите в панель управления\n2. Выберите нужный модуль из списка\n3. Нажмите «Применить» для сохранения настроек\n\nЕсли возникнут сложности — обращайтесь, помогу!',
  'Да, эта функция доступна в текущей версии. Для её активации необходимо обновить конфигурацию через раздел документации. Подробная инструкция находится в разделе «Быстрый старт».',
  'Рекомендую ознакомиться с разделом «Горячие клавиши» в документации:\n\n• Ctrl+S — сохранить конфигурацию\n• Ctrl+R — перезагрузить данные\n• Ctrl+F — поиск по документации\n• Esc — закрыть текущую панель',
];

function getMockResponse() {
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
}

function fakeSendMessage() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getMockResponse()), 1000 + Math.random() * 2000);
  });
}

// ─── Утилиты ──────────────────────────────────────────────────────
function createChat(groupId = null) {
  const id = 'chat_' + Date.now();
  return {
    id,
    title: 'Новый чат',
    messages: [],
    groupId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function generateTitle(text) {
  return text.length > 35 ? text.slice(0, 35) + '…' : text;
}
// ───────────────────────────────────────────────────────────────────

export default function Chat() {
  const [chats, setChats] = useState(() => {
    const initial = createChat();
    return [initial];
  });
  const [activeChatId, setActiveChatId] = useState(() => chats[0]?.id);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // ─── Управление чатами ───────────────────────────────────────────
  const handleNewChat = () => {
    const newChat = createChat();
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId) => {
    setChats((prev) => {
      const updated = prev.filter((c) => c.id !== chatId);
      if (chatId === activeChatId) {
        if (updated.length > 0) {
          setActiveChatId(updated[0].id);
        } else {
          const newChat = createChat();
          updated.push(newChat);
          setActiveChatId(newChat.id);
        }
      }
      return updated;
    });
  };

  const handleMoveToGroup = (chatId, groupId) => {
    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, groupId } : c))
    );
  };

  // ─── Управление группами ─────────────────────────────────────────
  const handleCreateGroup = () => {
    const newGroup = {
      id: 'group_' + Date.now(),
      name: 'Новая группа',
    };
    setGroups((prev) => [...prev, newGroup]);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    // Снимаем groupId у чатов этой группы
    setChats((prev) =>
      prev.map((c) => (c.groupId === groupId ? { ...c, groupId: null } : c))
    );
  };

  const handleRenameGroup = (groupId, name) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name } : g))
    );
  };

  // ─── Отправка сообщения ──────────────────────────────────────────
  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    // Обновляем чат: добавляем сообщение, генерируем title из первого сообщения
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== activeChatId) return c;
        const isFirst = c.messages.length === 0;
        return {
          ...c,
          messages: [...c.messages, userMessage],
          title: isFirst ? generateTitle(text) : c.title,
          updatedAt: Date.now(),
        };
      })
    );

    setIsLoading(true);

    try {
      const responseText = await fakeSendMessage(text);
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: responseText,
        timestamp: Date.now(),
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, botMessage], updatedAt: Date.now() }
            : c
        )
      );
    } catch {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Извините, произошла ошибка. Попробуйте ещё раз.',
        timestamp: Date.now(),
      };
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, errorMessage], updatedAt: Date.now() }
            : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="chat">
      {/* Кнопка открытия сайдбара на мобильных */}
      <button
        className="chat__sidebar-toggle"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Открыть историю чатов"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <ChatSidebar
        chats={chats}
        groups={groups}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onCreateGroup={handleCreateGroup}
        onDeleteGroup={handleDeleteGroup}
        onRenameGroup={handleRenameGroup}
        onMoveToGroup={handleMoveToGroup}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(false)}
      />

      <div className="chat__main">
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
    </div>
  );
}