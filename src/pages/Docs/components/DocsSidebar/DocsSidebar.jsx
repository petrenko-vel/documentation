import React, { useState, useCallback } from 'react';
import './DocsSidebar.scss';

/**
 * Рекурсивный элемент sidebar-дерева.
 */
function SidebarItem({ section, activeSectionId, onNavigate, depth = 0 }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = section.children?.length > 0;
  const isActive = activeSectionId === section.id;

  // Проверяем, есть ли активный элемент среди потомков
  const isChildActive = useCallback((sec) => {
    if (sec.id === activeSectionId) return true;
    return sec.children?.some(isChildActive) || false;
  }, [activeSectionId]);

  const containsActive = hasChildren && section.children.some(isChildActive);

  const handleClick = () => {
    onNavigate(section.id);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded((v) => !v);
  };

  return (
    <li className="docs-sidebar__item">
      <div
        className={`docs-sidebar__link ${isActive ? 'docs-sidebar__link--active' : ''} ${containsActive ? 'docs-sidebar__link--parent-active' : ''}`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <button
            className={`docs-sidebar__toggle ${expanded ? 'docs-sidebar__toggle--open' : ''}`}
            onClick={handleToggle}
            aria-label="Развернуть/свернуть"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
        <span className="docs-sidebar__text">{section.title}</span>
      </div>

      {hasChildren && expanded && (
        <ul className="docs-sidebar__children">
          {section.children.map((child) => (
            <SidebarItem
              key={child.id}
              section={child}
              activeSectionId={activeSectionId}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function DocsSidebar({ sections, activeSectionId, onNavigate }) {
  return (
    <aside className="docs-sidebar">
      <nav className="docs-sidebar__nav">
        <h3 className="docs-sidebar__heading">Содержание</h3>
        <ul className="docs-sidebar__list">
          {sections.map((section) => (
            <SidebarItem
              key={section.id}
              section={section}
              activeSectionId={activeSectionId}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
