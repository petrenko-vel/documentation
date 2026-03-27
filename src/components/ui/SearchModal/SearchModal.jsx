import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import devices from '@/pages/Docs/data/devices';
import normalizeDocsData, { flattenSections } from '@/modules/docs/normalizeDocsData';
import './SearchModal.scss';

export default function SearchModal({ closeButton }) {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Фокус на поле ввода при открытии
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Подготовка индекса для поиска по всем приборам
    const searchIndex = useMemo(() => {
        const index = [];
        devices.forEach(device => {
            const { sections } = normalizeDocsData(device.data);
            const flat = flattenSections(sections);
            flat.forEach(s => {
                index.push({
                    ...s,
                    deviceId: device.id,
                    deviceName: device.name
                });
            });
        });
        return index;
    }, []);

    // Фильтрация результатов
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return searchIndex.filter(item => 
            item.title.toLowerCase().includes(q)
        ).slice(0, 10); // Ограничиваем количество результатов
    }, [query, searchIndex]);

    const handleResultClick = (deviceId, sectionId) => {
        navigate('/documentation', { state: { deviceId, sectionId } });
        closeButton();
    };

    return (
        <div className="search-modal-overlay" onClick={closeButton}>
            <div className="search-modal" onClick={e => e.stopPropagation()}>
                <div className="search-modal__inner">
                    <div className="search-modal__top">
                        <div className="search-modal__input-wrapper">
                            <svg className="search-modal__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                            </svg>
                            <input 
                                ref={inputRef}
                                className='search-modal__input'
                                type="text"  
                                placeholder='Поиск по документации...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <button className="search-modal__close" onClick={closeButton} aria-label="Закрыть">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div className="search-modal__results-container">
                        {results.length > 0 ? (
                            <ul className="search-modal__results">
                                {results.map((item, index) => (
                                    <li 
                                        key={`${item.deviceId}-${item.id}-${index}`}
                                        className="search-modal__result-item"
                                        onClick={() => handleResultClick(item.deviceId, item.id)}
                                    >
                                        <div className="search-modal__result-title">{item.title}</div>
                                        <div className="search-modal__result-category">{item.deviceName}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : query.trim() ? (
                            <div className="search-modal__no-results">
                                Ничего не найдено по запросу «{query}»
                            </div>
                        ) : (
                            <div className="search-modal__placeholder">
                                Начните вводить название раздела...
                            </div>
                        )}
                    </div>
                    
                    <div className="search-modal__footer">
                        <span>Нажмите Esc, чтобы закрыть</span>
                    </div>
                </div>
            </div>
        </div>
    );
}