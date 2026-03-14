import React, { useState } from "react";
import WifiIcon from "../../../../components/ui/WifiIcon";



export default function NetworkItem(props) {
    const { 
        id,
        ssid,
        isConnected,
        isExpanded,
        onExpand, 
    } = props
    
    const [showForm, setShowForm] = useState(false);

    const handleItemClick = () => {
        onExpand();
        if (isExpanded) setShowForm(false); // закрывать форму если пункт с вифи закрыт
    };
    const [savedPassword, setSavedPassword] = useState(null); // Храним "запомненный" пароль

    return (
        <li
            role="button"
            className={`network__item ${
                isConnected ? "network__item--connected" : ""
            }`}
            onClick={handleItemClick}
        >
            <div className="network__contain">
                <WifiIcon />
                <span className="network__title-network">{ssid}</span>
            </div>

            {isExpanded && (
                <div
                    className="network__controls"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        className="network__button-connect"
                    >
                        {!isConnected ? "Подключиться" : "Отключиться"}
                    </button>
                </div>
            )}

        
        </li>
    )
}