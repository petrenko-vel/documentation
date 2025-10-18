import { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import './Header.scss'

import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Burger from "@/components/Burger";
import Promo from '@/components/Promo';
import Social from '@/components/Social';

export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState(null);

    useEffect(() => {
        async function fetchMenuItems() {
            try {
                const response = await fetch('/api/menu');
                if(!response.ok) {
                    throw new Error("Ошибка при загрузке меню");
                }
                const data = await response.json();
                setMenuItems(data);
            }
            catch(err) {
                seterror(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMenuItems();
    }, [])


    return(
        <>
            <Promo />
            <header className="header">
                    <div className="header__inner container">
                        <Logo divClassName="header__logo" classNameLink="logo__link"/>
                        <Search />
                        <div className={`header__actions ${isBurgerOpen ? 'header__actions--active' : ''}`}>
                            <nav className="header__nawbar">
                                <ul className="header__menu">
                                    {loading && " "}
                                    {error && <li>{error.message}</li>}
                                    {!loading && !error && menuItems.map((item, index) => (
                                        <li key={index} className="header__item">
                                        <NavLink
                                            to={item.link}
                                            className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
                                            onClick={() => setIsBurgerOpen(false)}
                                        >
                                            {item.name}
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
        </>
    )
}