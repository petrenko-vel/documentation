import React, { useState, useRef, useEffect } from 'react';
import './DeviceSelector.scss';

export default function DeviceSelector({ devices, activeDeviceId, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const activeDevice = devices.find((d) => d.id === activeDeviceId);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="device-selector" ref={ref}>
      <button
        className={`device-selector__trigger ${open ? 'device-selector__trigger--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="device-selector__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <span className="device-selector__name">
          {activeDevice?.name || 'Выберите прибор'}
        </span>
        <svg className="device-selector__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="device-selector__dropdown">
          {devices.map((device) => (
            <button
              key={device.id}
              className={`device-selector__option ${device.id === activeDeviceId ? 'device-selector__option--active' : ''}`}
              onClick={() => { onSelect(device.id); setOpen(false); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              {device.name}
              {device.id === activeDeviceId && (
                <svg className="device-selector__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
