import React, { useState, useEffect, useRef, useMemo } from "react";

import './NetworkManager.scss'

export default function NetworkManager() {

    const [networkData, setNetworkData] = useState([]);
    const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);
    const [isOpen, setIsOpen] = useState(false);                     // для открытия плашки с вифи
    const [activeNetwortTab, setActiveNetwortTab] = useState(null);  // открыт таб - обнуляем, не открыт - записываем его id, сравниваем и открываем
    const [isInputVisible, setIsInputVisible] = useState(false);       // для показать инпут

    const dropdownRef = useRef(null);                                // для оверлея вокруг плашки


    //Если список измениться в вифи, тогда будем перерисовыввать компонент нужный
    const activeNet = useMemo(() => {
        return networkData.find(item => item.on === true)
    }, [networkData]) 


    useEffect(() => {
        // Функция проверки клика
        const handleClickOutside = (event) => {
            // Если в реф что-то лежит (а не null) и 
            // клик был НЕ по нему и не по его детям
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setActiveNetwortTab(null)
            }
        };
        
        if (isOpen) {
            // вешаем событие на документ
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            // убираем событие при закрытии или удалении компонента
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]); // Следим за изменением состояния isOpen, иначе зачем следить, если окошко закрыто?

    useEffect(() => {

        setTimeout(() => {
            const dataFromServer = [
                { 'id' : '1', 'ssid' : 'АняВАня', 'signal' : '60', 'security' : 'WPA1 WPA2', 'on' : false },
                { 'id' : '2', 'ssid' : 'Второй вифи', 'signal' : '40', 'security' : 'WPA1 WPA2', 'on' : false },
                { 'id' : '3', 'ssid' : 'Третий вайфай', 'signal' : '30', 'security' : 'WPA1 WPA2', 'on' : false },
                { 'id' : '4', 'ssid' : 'Лешенька вифи', 'signal' : '80', 'security' : 'WPA1 WPA2', 'on' : true },
            ]

            setNetworkData(dataFromServer);
            setIsLoadingNetwork(false);

        }, (1000))
    }, [])
    
    if (isLoadingNetwork) return <div>Загрузка сетей...</div>;
  

  return (
    <div className="network" ref={dropdownRef}>
        <div className="network__wrapper">
            <div className="network__start"  onClick={() => setIsOpen(!isOpen)}>
                <button className="network__button-on" type="button">
                    {activeNet ? (
                        <>
                        Подключено к: <span>«{activeNet.ssid}»</span>
                        </>
                    ) : 'Работает в точке доступа' }
                </button>
                <span className={`network__arrow ${isOpen ? 'network__arrow--is-open' : ''}`} >
                    <svg width="18" height="10" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 9.65857L11.25 0.658569L21.5 9.65857" stroke="#343434" strokeLinecap="round"/>
                    </svg>
                </span>
            </div>
            {isOpen && (
                <ul className="network__list">
                    {networkData.map(({id, ssid}) => (

                        <li 
                            className='network__item' 
                            key={id} 
                            onClick={() => {
                                setActiveNetwortTab(activeNetwortTab === id ? null : id);
                                setIsInputVisible(false);
                            }}
                        >
                            <div className="network__contain">
                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.75 5.20396C3.88528 1.8429 12.2747 -2.86259 20.75 5.20396" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M4.07031 7.73765C6.16463 5.36276 11.7686 2.03793 17.43 7.73765" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path d="M6.67871 10.7247C7.95926 9.25552 11.3858 7.19863 14.8474 10.7247" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                                    <ellipse cx="10.7633" cy="13.2851" rx="2.05534" ry="2.08029" fill="black"/>
                                </svg>
                                <span className="network__title-network">
                                    {ssid}
                                </span>
                            </div>

                            {activeNetwortTab === id && (
                                <div className="network__controls" onClick={(e) => e.stopPropagation()}>
                                    {!isInputVisible ? (
                                    <button 
                                        className="network__button-connect"
                                        type="button"
                                        onClick={(e) => setIsInputVisible(true)}
                                    >
                                        Подключиться
                                    </button>
                                ) : (
                                    <form className="network__form">
                                        <input 
                                            type="password"
                                            className="network__form-input"
                                            autoFocus
                                            placeholder="Введите пароль"
                                        />
                                        <button
                                            type="button"
                                            className="network__form-button"
                                        >
                                            вкл
                                        </button>
                                    </form>
                                )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
  )
}



{/* <button 
                                    className="network__button-connect"
                                    type="button"
                                    onClick={(e) => (e.stopPropagation())}
                                >
                                    Подключиться
                                </button> */}