import { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.scss'

export default function Sidebar({ activeItem, setActiveItem }) {

    const [openId, setOpenId] = useState(null); // какой заголовок открыт

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const menuItems = [
        {
            id: 1,
            title: "Старт",
            path: "/",       // ссылка родителя
            subItems: [],    // нет подзаголовков
        },
        {
            id: 2,
            title: "Установка",
            subItems: [
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka" },
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka-2" },
            ],
        },
        {
            id: 3,
            title: "Настройка",
            path: "/settins", // ссылка родителя
            subItems: [
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka" },
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka-2" },
            ],
        },
        {
            id: 4,
            title: "Компилятор",
            subItems: [
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka" },
            { title: "Подзаголовок статьи статьистатьи", path: "/documentation/ystanovka-2" },
            ],
        },
    ];

    return(
        <aside className="sidebar">
            <div className="sidebar__inner">
                <ul className="sidebar__menu">
    
                    {menuItems.map((item) => (

                        <li key={item.id} className="sidebar__item">
                           {item.subItems.length > 0 ? (
                            <>
                                <div className={`sidebar__body ${openId === item.id ? "open" : ""}`} onClick={() => toggle(item.id)}>
                                    <h3 className="sidebar__title">
                                        {item.title}
                                    </h3>
                                    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L8.5 7L1 13" stroke="#343434" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>

                                {openId === item.id &&
                                    <ul className="sidebar__submenu">
                                        {item.subItems.map((subitem, idx) => (
                                            <li key={idx} className="sidebar__subitem">
                                                <Link to={subitem.path}>
                                                    {subitem.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </>) : (
                                <>
                                <h3 className="sidebar__title sidebar__title--one"><Link to={item.path}>{item.title}</Link></h3>
                                </>
                            )}
                        </li>

                    ))}
                </ul>

                <p className="sidebar__footer">
                    Увидели ошибку? <a href="#" className="link">Сообщите нам.</a>
                </p>
            </div>
        </aside>
    )
}

