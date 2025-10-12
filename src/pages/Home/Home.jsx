import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '@/assets/image/logo.svg'
import './Home.scss'
import Logo from '@/components/Logo';

export default function Home() {
    return (
        <>
        <section className="offer">
          <div className="offer__inner container">
            <div className="offer__logo-inner">
              <Logo />
            </div>
            <h1 className="offer__title">Умная лаборатория начинается здесь</h1>
            <p className="offer__decriprtion">
              Пусть Signal-master возьмёт на себя рутину — от поиска документации до управления
            </p>
           <div className="offer__links">
             <Link to={"/docs"} className='offer__link'>Начать</Link>
              <Link to={"/telegram"} className='offer__link'>Присоединиться к комьюнити</Link>
           </div>
          </div>
        </section>
        </>
    )
}