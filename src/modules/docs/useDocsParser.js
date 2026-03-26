import { useMemo } from 'react';
import normalizeDocsData, { flattenSections } from './normalizeDocsData';

/**
 * useDocsParser(rawJson)
 *
 * React hook: принимает сырой JSON прибора,
 * возвращает нормализованную структуру + плоский список секций.
 *
 * @param {Object} rawJson — сырой JSON прибора
 * @returns {{ device: string, sections: Array, flatSections: Array }}
 */
export default function useDocsParser(rawJson) {
  return useMemo(() => {
    const { device, sections } = normalizeDocsData(rawJson);
    const flat = flattenSections(sections);
    return { device, sections, flatSections: flat };
  }, [rawJson]);
}
