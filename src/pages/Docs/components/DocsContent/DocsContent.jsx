import React from 'react';
import './DocsContent.scss';

/**
 * Лёгкий markdown-рендер (без внешних зависимостей).
 * Поддерживает: ## заголовки, **bold**, `code`, ```блоки```, списки (- / 1.), таблицы, \n
 */
function renderMarkdown(text) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Блок кода ```
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // пропускаем закрывающие ```
      elements.push(
        <pre key={key++} className="docs-content__code-block">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Таблица (|...|)
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (row) =>
          row.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).map((c) => c.trim());

        const headers = parseRow(tableLines[0]);
        // Пропускаем строку-разделитель (|---|---|)
        const dataRows = tableLines.slice(2).map(parseRow);

        elements.push(
          <div key={key++} className="docs-content__table-wrapper">
            <table className="docs-content__table">
              <thead>
                <tr>{headers.map((h, hi) => <th key={hi}>{inlineMarkdown(h)}</th>)}</tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{inlineMarkdown(cell)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Заголовки ##
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const Tag = `h${Math.min(level + 1, 6)}`; // сдвигаем, т.к. h1 = device name
      elements.push(<Tag key={key++} className="docs-content__heading">{inlineMarkdown(headingMatch[2])}</Tag>);
      i++;
      continue;
    }

    // Нумерованный список
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="docs-content__list docs-content__list--ordered">
          {listItems.map((item, li) => <li key={li}>{inlineMarkdown(item)}</li>)}
        </ol>
      );
      continue;
    }

    // Маркированный список (- / •)
    if (/^[-•*]\s/.test(line.trim())) {
      const listItems = [];
      while (i < lines.length && /^[-•*]\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-•*]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="docs-content__list">
          {listItems.map((item, li) => <li key={li}>{inlineMarkdown(item)}</li>)}
        </ul>
      );
      continue;
    }

    // Пустая строка
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Обычный параграф
    elements.push(<p key={key++} className="docs-content__paragraph">{inlineMarkdown(line)}</p>);
    i++;
  }

  return elements;
}

/**
 * Inline markdown: **bold**, `code`, обычный текст
 */
function inlineMarkdown(text) {
  if (!text) return text;

  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // **bold**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // `code`
    const codeMatch = remaining.match(/`([^`]+)`/);

    // Находим ближайший match
    let firstMatch = null;
    let firstIndex = remaining.length;

    if (boldMatch && boldMatch.index < firstIndex) {
      firstMatch = { type: 'bold', match: boldMatch };
      firstIndex = boldMatch.index;
    }
    if (codeMatch && codeMatch.index < firstIndex) {
      firstMatch = { type: 'code', match: codeMatch };
      firstIndex = codeMatch.index;
    }

    if (!firstMatch) {
      parts.push(remaining);
      break;
    }

    // Текст до match
    if (firstIndex > 0) {
      parts.push(remaining.slice(0, firstIndex));
    }

    const m = firstMatch.match;
    if (firstMatch.type === 'bold') {
      parts.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      parts.push(<code key={key++} className="docs-content__inline-code">{m[1]}</code>);
    }

    remaining = remaining.slice(firstIndex + m[0].length);
  }

  return parts;
}


/**
 * Рекурсивный рендер секций документации.
 */
function DocsSection({ section, depth = 0 }) {
  // Уровень заголовка: depth 0 → h2, depth 1 → h3, depth 2 → h4, и т.д.
  const HeadingTag = `h${Math.min(depth + 2, 6)}`;

  return (
    <section id={section.id} className={`docs-content__section docs-content__section--depth-${depth}`}>
      <HeadingTag className="docs-content__section-title">
        {section.title}
      </HeadingTag>

      {section.content && (
        <div className="docs-content__body">
          {renderMarkdown(section.content)}
        </div>
      )}

      {section.children?.map((child) => (
        <DocsSection key={child.id} section={child} depth={depth + 1} />
      ))}
    </section>
  );
}


export default function DocsContent({ sections, device }) {
  return (
    <div className="docs-content">
      <header className="docs-content__header">
        <h1 className="docs-content__device-title">{device}</h1>
        <p className="docs-content__device-subtitle">Документация прибора</p>
      </header>

      <div className="docs-content__sections">
        {sections.map((section) => (
          <DocsSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
