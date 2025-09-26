import React from "react";

import './Header.scss'

import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Promo from "@/components/Promo";
import Social from "@/components/Social";


export default function Header() {

    const menuItem = [
        {name: "Документация", link: "/documentation"},
        {name: "Пульт управления", link: "/control-panel"},
        {name: "AI-помощник", link: "/"},
    ]
    return(
        <>
            <Promo />
            <header className="header">
                <div className="header__inner container">
                    <Logo />
                    <Search />
                    <nav className="header__nawbar">
                        <ul className="header__menu">
                            {menuItem.map((item, index) => {
                                return (
                                    <li key={index} className="header__item">
                                        <a href={item.link} className="header__link is-active">{item.name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                    <Social />
                </div>
            </header>
        </>
    )
}