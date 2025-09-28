import React from "react";
import { Link, useLocation } from "react-router-dom";

import './Header.scss'

import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Promo from "@/components/Promo";
import Social from "@/components/Social";


export default function Header() {

    const menuItem = [
        {name: "Документация", link: "/documentation"},
        {name: "Пульт", link: "/control-panel"},
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
                    <div className="header__actions">
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
                </div>
            </header>
        </>
    )
}