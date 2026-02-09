import React, { useState } from "react";


import WifiIcon from "../WifiIcon";

export default function NetworkItem(props) {
    const { id, ssid, activeNetwork, setActiveNetwork } = props
    const [isInputVisible, setIsInputVisible] = useState(false);       // для показать инпут
    
    return (
        <li 
            className='network__item' 
            onClick={() => {
                setActiveNetwork(activeNetwork === id ? null : id);
                setIsInputVisible(false);
            }}
        >
            <div className="network__contain">
                <WifiIcon />
                <span className="network__title-network">{ssid}</span>
            </div>
                {activeNetwork === id && (
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
                        <form className="network__form" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
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
    )
}