import React from 'react';
import './Home.scss'
import Logo from '@/components/Logo';
import Button from '@/components/Button';

import { telegramLink } from '@/assets/links'

export default function Home() {
    return (
        <>
        <section className="offer">
          <div className="offer__inner container">
            <div className="offer__logo-inner">
              <Logo classNameImage="logo__image--home" display='none' />
            </div>
            <h1 className="offer__title">Умная лаборатория начинается здесь</h1>
            <p className="offer__decriprtion">
              Пусть Signal-master возьмёт на себя рутину — от поиска документации до управления
            </p>
           <div className="offer__links">
              <Button className='offer__link blue-bg' href='/documentation'>Начать</Button>
              <Button className='offer__link white-bg' href={telegramLink} target="_blank">Присоединиться к комьюнити</Button>
           </div>
          </div>
        </section>
        </>
    )
}