import React, { useState } from 'react';
import './ChatSidebar.scss';

export default function ChatSidebar({
  chats,
  groups,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onCreateGroup,
  onDeleteGroup,
  onRenameGroup,
  onMoveToGroup,
  sidebarOpen,
  onToggleSidebar,
}) {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [groupContextMenu, setGroupContextMenu] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  // Чаты без группы
  const ungroupedChats = chats.filter((c) => !c.groupId);

  // Чаты, сгруппированные по groupId
  const chatsByGroup = groups.map((group) => ({
    ...group,
    chats: chats.filter((c) => c.groupId === group.id),
  }));

  const toggleGroup = (groupId) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleChatContextMenu = (e, chatId) => {
    e.preventDefault();
    setGroupContextMenu(null);
    setContextMenu({
      chatId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleGroupContextMenu = (e, groupId) => {
    e.preventDefault();
    setContextMenu(null);
    setGroupContextMenu({
      groupId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const closeMenus = () => {
    setContextMenu(null);
    setGroupContextMenu(null);
  };

  const startRenameGroup = (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    setEditingGroupId(groupId);
    setEditingName(group?.name || '');
    setGroupContextMenu(null);
  };

  const finishRename = () => {
    if (editingName.trim() && editingGroupId) {
      onRenameGroup(editingGroupId, editingName.trim());
    }
    setEditingGroupId(null);
    setEditingName('');
  };

  const getPreview = (chat) => {
    if (!chat.messages || chat.messages.length === 0) return 'Новый чат';
    const last = chat.messages[chat.messages.length - 1];
    return last.text.slice(0, 50) + (last.text.length > 50 ? '…' : '');
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const renderChatItem = (chat) => (
    <div
      key={chat.id}
      className={`chat-sidebar__item ${chat.id === activeChatId ? 'chat-sidebar__item--active' : ''}`}
      onClick={() => { onSelectChat(chat.id); closeMenus(); }}
      onContextMenu={(e) => handleChatContextMenu(e, chat.id)}
    >
      <div className="chat-sidebar__item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div className="chat-sidebar__item-content">
        <span className="chat-sidebar__item-title">{chat.title}</span>
        <span className="chat-sidebar__item-preview">{getPreview(chat)}</span>
      </div>
      <span className="chat-sidebar__item-time">{formatDate(chat.updatedAt)}</span>
    </div>
  );

  return (
    <>
      {/* Оверлей для мобильных */}
      {sidebarOpen && (
        <div className="chat-sidebar__overlay" onClick={onToggleSidebar} />
      )}

      <aside className={`chat-sidebar ${sidebarOpen ? 'chat-sidebar--open' : ''}`}>
        <div className="chat-sidebar__header">
          <h3 className="chat-sidebar__title">Чаты</h3>
          <div className="chat-sidebar__header-actions">
            <button
              className="chat-sidebar__icon-btn"
              onClick={onCreateGroup}
              title="Создать группу"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                <line x1="12" y1="11" x2="12" y2="17"/>
                <line x1="9" y1="14" x2="15" y2="14"/>
              </svg>
            </button>
            <button className="chat-sidebar__new-btn" onClick={onNewChat}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Новый чат
            </button>
          </div>
        </div>

        <div className="chat-sidebar__list" onClick={closeMenus}>
          {/* Группы чатов */}
          {chatsByGroup.map((group) => (
            <div key={group.id} className="chat-sidebar__group">
              <div
                className="chat-sidebar__group-header"
                onClick={() => toggleGroup(group.id)}
                onContextMenu={(e) => handleGroupContextMenu(e, group.id)}
              >
                <svg
                  className={`chat-sidebar__group-chevron ${collapsedGroups[group.id] ? '' : 'chat-sidebar__group-chevron--open'}`}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
                {editingGroupId === group.id ? (
                  <input
                    className="chat-sidebar__group-rename"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={finishRename}
                    onKeyDown={(e) => e.key === 'Enter' && finishRename()}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                ) : (
                  <span className="chat-sidebar__group-name">{group.name}</span>
                )}
                <span className="chat-sidebar__group-count">{group.chats.length}</span>
              </div>
              {!collapsedGroups[group.id] && (
                <div className="chat-sidebar__group-items">
                  {group.chats.map(renderChatItem)}
                </div>
              )}
            </div>
          ))}

          {/* Чаты без группы */}
          {ungroupedChats.length > 0 && (
            <div className="chat-sidebar__section">
              {chatsByGroup.length > 0 && (
                <div className="chat-sidebar__section-label">Без группы</div>
              )}
              {ungroupedChats.map(renderChatItem)}
            </div>
          )}

          {chats.length === 0 && (
            <div className="chat-sidebar__empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <p>Нет чатов</p>
              <span>Создайте новый чат, чтобы начать</span>
            </div>
          )}
        </div>
      </aside>

      {/* Контекстное меню чата */}
      {contextMenu && (
        <div
          className="chat-sidebar__context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {groups.length > 0 && (
            <div className="chat-sidebar__context-submenu">
              <button className="chat-sidebar__context-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                Переместить в группу
              </button>
              <div className="chat-sidebar__context-sub">
                <button
                  onClick={() => { onMoveToGroup(contextMenu.chatId, null); closeMenus(); }}
                >
                  Без группы
                </button>
                {groups.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { onMoveToGroup(contextMenu.chatId, g.id); closeMenus(); }}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            className="chat-sidebar__context-btn chat-sidebar__context-btn--danger"
            onClick={() => { onDeleteChat(contextMenu.chatId); closeMenus(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Удалить чат
          </button>
        </div>
      )}

      {/* Контекстное меню группы */}
      {groupContextMenu && (
        <div
          className="chat-sidebar__context-menu"
          style={{ top: groupContextMenu.y, left: groupContextMenu.x }}
        >
          <button
            className="chat-sidebar__context-btn"
            onClick={() => startRenameGroup(groupContextMenu.groupId)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            Переименовать
          </button>
          <button
            className="chat-sidebar__context-btn chat-sidebar__context-btn--danger"
            onClick={() => { onDeleteGroup(groupContextMenu.groupId); closeMenus(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Удалить группу
          </button>
        </div>
      )}
    </>
  );
}
