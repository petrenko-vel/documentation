import React, { useState, useEffect, useRef, useMemo } from "react";

import './NetworkManager.scss'
import NetworkItem from "../NetworkItem";


const IconArrow = ({ isOpen }) => (
    <span className={`network__arrow ${isOpen ? 'network__arrow--is-open' : ''}`} >
        <svg width="18" height="10" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 9.65857L11.25 0.658569L21.5 9.65857" stroke="#343434" strokeLinecap="round"/>
        </svg>
    </span>
)



export default function NetworkManager() {

    const [networkData, setNetworkData] = useState([]);
    const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);
    const [isOpen, setIsOpen] = useState(false);                     // для открытия плашки с вифи
    const [activeNetwork, setActiveNetwork] = useState(null);  // открыт таб - обнуляем, не открыт - записываем его id, сравниваем и открываем
    
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
                setActiveNetwork(null)
            }
        };
        
        if (isOpen) {
            // вешаем событие на документ
            document.addEventListener("pointerdown", handleClickOutside);
        }
        
        return () => {
            // убираем событие при закрытии или удалении компонента
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isOpen]); // Следим за изменением состояния isOpen, иначе зачем следить, если окошко закрыто?

    useEffect(() => {

        const timer = setTimeout(() => {
            const dataFromServer = [
                { id: '1', ssid: 'АняВАня', signal: '60', security: 'WPA1 WPA2', on: false },
                { id: '2', ssid: 'Второй вифи', signal: '40', security: 'WPA1 WPA2', on: true },
                { id: '3', ssid: 'Третий вайфай', signal: '30', security: 'WPA1 WPA2', on: false },
                { id: '4', ssid: 'Лешенька вифи', signal: '80', security: 'WPA1 WPA2', on: false },
            ];

            setNetworkData(dataFromServer);
            setIsLoadingNetwork(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])
    
    if (isLoadingNetwork) return <div>Загрузка сетей...</div>;
  



  return (
    <div className="network" ref={dropdownRef}>
        <div className="network__wrapper">
            <div className="network__start"  onClick={() => setIsOpen(prev => !prev)}>
                <div className="network__button-on">
                    {activeNet ? (
                        <>
                        Подключено к: <span>«{activeNet.ssid}»</span>
                        </>
                    ) : 'Работает в точке доступа' }
                </div>
                <IconArrow isOpen={isOpen} />
            </div>
            {isOpen && (
                <ul className="network__list">
                    {networkData.map(({id, ssid}) => (
                        <NetworkItem
                            key={id}
                            id={id}
                            ssid={ssid} 
                            activeNetwork={activeNetwork}
                            setActiveNetwork={setActiveNetwork}
                        />
                    ))}
                </ul>
            )}
        </div>
    </div>
  )
}