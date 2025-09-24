
import React, { useState } from "react";
// import './Search.scss'

export default function Search() {

    const [query, setQuery] = useState("");

     const handleSubmit = (e) => {
        e.preventDefault(); // отменяем перезагрузку страницы
        console.log("Искать:", query);
        // тут можно вызвать API или фильтровать данные
    };


    return(
        <>
        <div className="header__search search">
            <form className='search__form' onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className='seacr__input' 
                    placeholder="Введите запрос..."
                    name="" id="" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
            </form>
        </div>
        </>
    )
}