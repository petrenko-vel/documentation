import { useState } from 'react'
import './Burger.scss'

export default function Burger(props) {
    const {isOpen, toggle} = props
    
    return(
        <>
        <button 
            className={`header__burger ${isOpen ? 'header__burger--active' : ''}`}
            aria-expanded={isOpen}
            aria-controls="main-navigation"
            aria-label={`${isOpen ? 'Закрыть меню навигации' : 'Открыть меню навигации'}`}
            onClick={toggle}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
        </>
    )
}