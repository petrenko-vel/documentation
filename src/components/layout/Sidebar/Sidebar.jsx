
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.scss'
import { docsContent } from '@/pages/Docs/data/docsData';  // импорт данных




export default function Sidebar() {

    const [openId, setOpenId] = useState(null);

    // Генерируем дерево из плоского объекта
    const sidebarTree = useMemo(() => {
        const tree = {};
        Object.entries(docsContent).forEach(([slug, data]) => {
        if (!tree[data.category]) tree[data.category] = [];
        tree[data.category].push({ title: data.title, slug });
        });
        return Object.entries(tree).map(([title, children]) => ({ title, children }));
    }, []);
    

    return(
        <aside className="sidebar__inner">
            <ul className="sidebar__menu">
                {sidebarTree.map((cat, i) => (
                <li key={i} className="sidebar__item">
                    <div className="sidebar__body" onClick={() => setOpenId(openId === cat.title ? null : cat.title)}>
                        <h3 className="sidebar__title">{cat.title}</h3>
                    </div>
                    {openId === cat.title && (
                    <ul className="sidebar__submenu">
                        {cat.children.map((child, index) => (
                        <li key={index} className="sidebar__subitem">
                            <Link to={`/documentation/${child.slug}`}>{child.title}</Link>
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
                ))}
            </ul>
            <p className="sidebar__footer">
                Увидели ошибку? <a href="#" className="link">Сообщите нам.</a>
            </p>
        </aside>
    )
}

