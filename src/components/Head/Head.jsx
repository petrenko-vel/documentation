import React, { useState, useEffect } from 'react'
import './Head.scss'
import Button from '../Button'
import Modal from '../Modal'
// import ScaleOnScroll from '../ScaleOnScroll'

import memories from '@/modules/ButtonMemoris'

import HeaderImage1 from '@/assets/image/home/header-1.png'
import HeaderImage2 from '@/assets/image/home/header-2.png'
import Clouds from '@/assets/image/home/clouds.png'
// import OneCloud from '@/assets/image/home/one-cloud.png'



export default() => {

    const [selectedMemory, setSelectedMemory] = useState(null)

    useEffect(() => {
        // Находим кнопку через атрибут
        const button = document.querySelector('[data-js-button-memories]')
        if (!button) return

        const handleClick = () => {
            const randomIndex = Math.floor(Math.random() * memories.length)
            setSelectedMemory(memories[randomIndex])
        }

        button.addEventListener('click', handleClick)
            return () => button.removeEventListener('click', handleClick)
    }, [])

    const onClose = () => setSelectedMemory(null)


    return (
        
        <>
        <section className="hero">
            <div className="hero__inner container">
                <div className="hero__offer">
                    <h1 className="hero__title">
                        Мы вместе уже
                    </h1>
                    <Button 
                        classColor={"button-orange"}  
                        label="Случайное воспоминание"
                        data-js-button-memories=""
                    />
                </div>
                <div className="hero__images">
                    <img className="hero__image" src={HeaderImage1} alt="" />
                    <img className="hero__image" src={HeaderImage2} alt="" />
                </div>
                <img className='hero__decoration-clouds' src={Clouds} alt=""/>
            </div>
        </section>

        <Modal memory={selectedMemory} onClose={onClose} />

        {/* <ScaleOnScroll>
            <img src={OneCloud} className='scale-on-scroll__image left' alt="" />
            <img src={OneCloud} className='scale-on-scroll__image right' alt="" />
        </ScaleOnScroll> */}
        </>
    )
}
