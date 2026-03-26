// -------- ХУКИ И БИБЛИОТЕКИ -------------- 
import { useState } from 'react';
import { NavLink } from "react-router-dom";

// -------- КОМПОНЕНТЫ -------------- 
import Logo from "@/components/ui/Logo";
import Search from "@/components/ui/Search";
import Burger from "@/components/ui/Burger";
import Promo from '@/components/ui/Promo';
import Social from '@/components/ui/Social';

// -------- СТИЛИ -------------- 
import './Header.scss'



export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const menuItems = [
        { id: 1, name: "Документация", link: '/documentation' },
        { id: 2, name: "Управление", link: '/panel' },
        { id: 3, name: "Чат", link: '/chat' }
    ]


    return(
        <div className="header-sticky-wrapper">
            <Promo />
            <header className="header">
                <div className="header__inner container">
                    <Logo divClassName="header__logo" classNameLink="logo__link"/>
                    <Search />
                    <div className={`header__actions ${isBurgerOpen ? 'header__actions--active' : ''}`}>
                        <nav className="header__nawbar">
                            <ul className="header__menu">
                                {menuItems.map(({id, name, link}) => (
                                    <li key={id} className="header__item">
                                    <NavLink
                                        to={link}
                                        className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                                        onClick={() => setIsBurgerOpen(false)}
                                    >
                                        {name}
                                    </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Social />
                    </div>
                    <Burger isOpen={isBurgerOpen} toggle={() => setIsBurgerOpen(prev => !prev)} />
                </div>                 
            </header>
        </div>
    )
}