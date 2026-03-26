/**
 * normalizeDocsData(json)
 *
 * Приводит произвольный JSON прибора к единой нормализованной структуре.
 * Поддерживает:
 *  - произвольную вложенность (children)
 *  - отсутствующие поля
 *  - генерацию уникальных id (slug) для якорей
 *
 * Возвращает:
 * {
 *   device: string,
 *   sections: NormalizedSection[]
 * }
 *
 * NormalizedSection:
 * {
 *   id: string,
 *   title: string,
 *   content: string | null,
 *   depth: number,
 *   children: NormalizedSection[]
 * }
 */

const slugCounters = new Map();

function toSlug(text, counters) {
  const base = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'section';

  const count = counters.get(base) || 0;
  counters.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function normalizeSection(raw, depth, counters) {
  if (!raw || typeof raw !== 'object') return null;

  const title = raw.title || raw.name || raw.label || 'Без названия';
  const id = raw.id || toSlug(title, counters);
  const content = raw.content || raw.text || raw.description || raw.body || null;

  const rawChildren = raw.children || raw.sections || raw.items || raw.subsections || [];
  const children = Array.isArray(rawChildren)
    ? rawChildren
        .map((child) => normalizeSection(child, depth + 1, counters))
        .filter(Boolean)
    : [];

  return { id, title, content, depth, children };
}

export default function normalizeDocsData(json) {
  if (!json || typeof json !== 'object') {
    return { device: 'Неизвестный прибор', sections: [] };
  }

  const device = json.device || json.name || json.title || 'Неизвестный прибор';
  const rawSections = json.sections || json.chapters || json.content || json.children || [];
  const counters = new Map();

  const sections = Array.isArray(rawSections)
    ? rawSections
        .map((s) => normalizeSection(s, 0, counters))
        .filter(Boolean)
    : [];

  return { device, sections };
}

/**
 * flattenSections(sections)
 *
 * Рекурсивно "разворачивает" дерево секций в плоский массив.
 * Нужен для IntersectionObserver.
 */
export function flattenSections(sections) {
  const result = [];

  function walk(list) {
    for (const section of list) {
      result.push({ id: section.id, title: section.title, depth: section.depth });
      if (section.children?.length) {
        walk(section.children);
      }
    }
  }

  walk(sections);
  return result;
}
