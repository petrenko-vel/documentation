import React, { useState, useEffect, useRef } from "react";

import './NetworkManager.scss'
import NetworkItem from "../NetworkItem";


const IconArrow = () => (
    <span className="network__arrow">
        <svg width="18" height="10" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 9.65857L11.25 0.658569L21.5 9.65857" stroke="#343434" strokeLinecap="round"/>
        </svg>
    </span>
)



export default function NetworkManager() {

    const [networkData, setNetworkData] = useState([]);
    const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);

    const [isOpenList, setIsOpenList] = useState(false);                           // для открытия плашки с вифи
    
    // РАЗДЕЛЕНИЕ СОСТОЯНИЙ
    const [connectedNetworkId, setConnectedNetworkId] = useState(null);    // факт подключения
    const [expandedNetworkId, setExpandedNetworkId] = useState(null);      // UI-выбор

    const dropdownRef = useRef(null);                                      // для оверлея вокруг плашки

    const connectedNetwork = networkData.find(
        (item) => item.id === connectedNetworkId
    );


    // Закрытие по клику вне блока
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Если в реф что-то лежит (а не null) и клик был НЕ по нему и не по его детям
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenList(false);
                setExpandedNetworkId(null);
            }
        };
        if (isOpenList) {
            document.addEventListener("pointerdown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
        };
    }, [isOpenList]);                                                          // Следим за изменением состояния isOpenList, иначе зачем следить, если окошко закрыто?



    useEffect(() => {

        const fetchNetworks = async () => {
            try {

                // ----- СКАНИРОВАНИЕ ДОСУТПНЫХ СЕТЕЙ ---------
                // const scan = await fetch('/api/wifi/scan');
                // if (!scan.ok) {
                //     throw new Error('Ошибка получения списка доступных Wi-fi сетей');
                // }
                // const scanData = await scan.json();
                // const scannedNetworks = scanData.map(
                //     ({ssid, signal, security}, index) => ({
                //     id: `scan-${index}`,
                //     ssid,
                //     signal,
                //     security,
                // }));

                const scannedNetworks = [
                    {
                        id: 1,
                        ssid: 'jkjcnи рпfkds',
                        signal: 'warsac',
                        security: 'dcosjnc',
                    },
                    {
                        id: 2,
                        ssid: 'jkjcnfkds',
                        signal: 'warsac',
                        security: 'dcosjnc',
                    },
                    {
                        id: 3,
                        ssid: 'jkjcnfkds',
                        signal: 'warsac',
                        security: 'dcosjnc',
                    },
                    {
                        id: 4,
                        ssid: 'jkjcnfkds',
                        signal: 'warsac',
                        security: 'dcosjnc',
                    },

                ]

                // ----- СКАНИРОВАНИЕ СТАТУСА СЕТИ ---------
                // const status = await fetch('/api/wifi/status');
                // if(!status.ok) {
                //     throw new Error('Ошибка получения статуса подключения');
                // }
                // const statusData = await status.json();

                // объявляем переменную которая хранит в себе подключенную сеть (для того, чтобы отфильтровать и не дублировать эту сеть)
                let connectedItem = null;     
                
                const statusData = [
                    {
                        "connected":true,"ssid":"Hotspot","mode":"access_point","ip":"10.42.0.1"
                    },
                     {
                        "connected": false,"ssid":" ","mode":"client","ip":"10.42.0.1"
                     }
                ]
                
                if (statusData.mode === "client" || statusData.mode === "access_point") {
                    connectedItem = {
                        id: "connected",
                        ssid: statusData.ssid,
                    };
                    setConnectedNetworkId("connected");
                }

                // Если подключённая сеть есть — убираем её из списка сканирования.
                if (connectedItem) {
                    const filtered = scannedNetworks.filter(
                        (item) => item.ssid !== connectedItem.ssid
                    );
                    setNetworkData([connectedItem, ...filtered]);
                } else {
                    setNetworkData(scannedNetworks);
                }
            
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoadingNetwork(false);
            }
        };

        fetchNetworks();
    }, []);

    return (
        <div className="network" ref={dropdownRef}>
            <div className="network__wrapper">
                <div className="network__start"  onClick={() => setIsOpenList(prev => !prev)}>
                    {isLoadingNetwork 
                        ? 'Загрузка данных...' 
                        : 
                        <>
                        <div className="network__button-on">
                            {connectedNetwork ? (
                                <>
                                Подключено к: <span>«{connectedNetwork.ssid}»</span>
                                </>
                            ) : 'Работает в точке доступа'        
                            }
                        </div>
                        <IconArrow isOpenList={isOpenList} />
                        </> 
                    }
                </div>

                {!isLoadingNetwork && isOpenList && (
                    <ul className="network__list">
                        {networkData.map(({id, ssid, security}) => (
                            <NetworkItem
                                id={id}
                                key={id}
                                ssid={ssid} 
                                security={security}          // добавляем информацию о защите сети
                                isConnected={id === connectedNetworkId}
                                isExpanded={id === expandedNetworkId}
                                onExpand={() =>
                                    setExpandedNetworkId(
                                        prev => prev === id ? null : id
                                    )
                                }
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}