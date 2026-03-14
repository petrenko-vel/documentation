import React from 'react';
import { Link } from 'react-router-dom'; // Если используешь React Router

import './Breadcrumbs.scss'

export default function Breadcrumbs({items}) {
  return (
    <nav className='breadcrumb' aria-label="breadcrumb">
      <ul className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.name}
              className={`breadcrumb__item${isLast ? ' breadcrumb__item--active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                <a onClick={(e) => e.preventDefault()} className='breadcrumb__noactive-item'>{item.name}</a>
              ) : (
                <Link className='breadcrumb__link' to={item.url}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};