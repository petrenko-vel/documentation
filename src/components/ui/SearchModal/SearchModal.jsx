import { useState } from 'react'
import './SearchModal.scss'

export default function SearchModal(props) {
    const { closeButton } = props

    const [isOverlow, setIsOverlow] = useState(true);
    const notActiveOverlow = () => {
        setIsOverlow(false)
    }

    return (
        <>
            <div className="search-modal">
                <div className="search-modal__inner">
                    <div className="search-modal__top">
                        <input 
                            className='search-modal__input'
                            type="text"  
                            placeholder='Поиск документов'/>
                        <button className="search-modal__close" onClick={closeButton}>
                            x
                        </button>
                    </div>
                    
                    <div className="search-modal__result">
                        ничего не найдено
                    </div>
                </div>
            </div>
            {isOverlow && <div className="search-modal__overlow" onClick={notActiveOverlow && closeButton}></div>}
           
        </>
    )
}