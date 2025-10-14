import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import './Header.scss'

import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Promo from "@/components/Promo";
import Social from "@/components/Social";
import Burger from "@/components/Burger";


export default function Header() {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const menuItem = [
        {name: "Документация", link: "/documentation"},
        {name: "Приборы", link: "/panel"},
        {name: "Чат-помощник", link: "/chat"},
    ]
    const location = useLocation();

    return(
        <>
            <Promo />
            <header className="header">
                <div className="header__inner container">
                    <Logo />
                    <Search />
                    <div className={`header__actions ${isBurgerOpen ? 'header__actions--active' : ''}`}>
                        <nav className="header__nawbar">
                            <ul className="header__menu">
                                {menuItem.map((item, index) => {
                                    return (
                                        <li key={index} className="header__item">
                                            <Link 
                                                to={item.link} 
                                                className={`header__link ${location.pathname.startsWith(item.link) ? 'is-active' : ""}`}>
                                                  {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                        <Social />
                    </div>
                    <Burger isOpen={isBurgerOpen} toggle={() => setIsBurgerOpen(prev => !prev)} />
                </div>
                
            </header>
        </>
    )
}