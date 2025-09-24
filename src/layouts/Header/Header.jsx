import React from "react";
import Logo from "@/components/Logo";
import Search from "@/components/Search";


export default function Header() {

    const menuItem = [
        {name: "О нас", link: "/"},
        {name: "пункт 1", link: "/"},
        {name: "пункт 1", link: "/"},
        {name: "пункт 1", link: "/"},
        {name: "Блог", link: "/"},
    ]
    return(
        <header className="header">
            <div className="header__inner container">
                <Logo />
                <Search />
                <nav className="header__nawbar">
                    <ul className="header__menu">
                        {menuItem.map((item, index) => {
                            return (
                                <li key={index} className="header__item">
                                    <a href={item.link} className="header__link link">{item.name}</a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {/* <Soc1al /> */}
            </div>
        </header>
    )
}