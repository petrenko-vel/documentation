import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from "react-router-dom";

import './Header.scss'

import Logo from "@/components/Logo";
import Search from "@/components/Search";
import Burger from "@/components/Burger";
import Promo from '@/components/Promo';
import Social from '@/components/Social';

// Динамическая загрузка компонентов Promo и Social
// const Promo = lazy(() => import('@/components/Promo'));
// const Social = lazy(() => import('@/components/Social'));

export default function Header() {
    

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState(null);
    const location = useLocation();
    
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

    if (loading) {
        return <div>Загрузка меню...</div>;
    }

    if (error) {
        return  <div>Ошибочка... {error.message}</div>;
    }


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
                                {menuItems.map((item, index) => {
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

                        {/* <Suspense fallback={<div>Загрузка...</div>}>
                            <Social />
                        </Suspense> */}
                        <Social />
                    </div>
                    <Burger isOpen={isBurgerOpen} toggle={() => setIsBurgerOpen(prev => !prev)} />
                </div>
                
            </header>
        </>
    )
}