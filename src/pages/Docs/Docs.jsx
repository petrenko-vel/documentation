import React, { useState, useEffect, useRef, useCallback } from 'react';

// -------- КОМПОНЕНТЫ ----------------
import DocsSidebar from './components/DocsSidebar';
import DocsContent from './components/DocsContent';
import DeviceSelector from './components/DeviceSelector';

// -------- ДАННЫЕ --------------------
import devices from './data/devices';

// -------- HOOK ----------------------
import { useDocsParser } from '@/modules/docs';

// -------- СТИЛИ ---------------------
import './Docs.scss';


export default function Docs() {
  const [activeDeviceId, setActiveDeviceId] = useState(devices[0]?.id);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const contentRef = useRef(null);
  const observerRef = useRef(null);

  // Текущий прибор
  const activeDevice = devices.find((d) => d.id === activeDeviceId);
  const { device, sections, flatSections } = useDocsParser(activeDevice?.data);

  // ─── IntersectionObserver — подсветка активной секции при скролле ───
  useEffect(() => {
    // Отключаем предыдущий observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const sectionElements = flatSections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Находим самый верхний видимый элемент
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [flatSections]);

  // ─── Навигация по клику в sidebar ───
  const handleNavigate = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(sectionId);
    }
  }, []);

  // ─── Смена прибора ───
  const handleDeviceChange = useCallback((deviceId) => {
    setActiveDeviceId(deviceId);
    setActiveSectionId(null);
    // Скролл наверх при смене прибора
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="docs">
      <div className="docs__inner container">
        {/* Device Selector */}
        <div className="docs__toolbar">
          <DeviceSelector
            devices={devices}
            activeDeviceId={activeDeviceId}
            onSelect={handleDeviceChange}
          />
        </div>

        <div className="docs__layout">
          {/* Sidebar */}
          <DocsSidebar
            sections={sections}
            activeSectionId={activeSectionId}
            onNavigate={handleNavigate}
          />

          {/* Content */}
          <div className="docs__content-area" ref={contentRef}>
            <DocsContent
              sections={sections}
              device={device}
            />
          </div>
        </div>
      </div>
    </div>
  );
}