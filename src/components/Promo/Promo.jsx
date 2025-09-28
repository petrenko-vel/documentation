import { useState } from 'react';
import './Promo.scss'

export default function Promo() {

    const [isActive, setIsActive] = useState(true)

    if (!isActive) return null;   // польностью убрать из DOM-дерева

    return (
        <div className="promo not-active">
            <div className="promo__inner">
                <p className="promo__text">
                    Присоединяйтесь к нам в <a href="#" className='promo__link link'>Telegram</a>. 
                    Узнайте больше!
                </p>

                <div className="promo__close" 
                    title="Закрыть"
                    aria-label='Закрыть'
                    onClick={() => setIsActive(false)}>
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7M13 13L7 7M7 7L1 13M7 7L13 1" stroke="#343434" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}