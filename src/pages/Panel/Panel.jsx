import React, { useState } from "react";
import './Panel.scss'



export default function Interface() {

  // ЗАГЛУШКА проверки подклбчения приборов
  const devise = [
    "Осцилограф Rigol", "Генератор"
  ]

  const isActive = devise.length > 0;

  return (
    <>
    <section className="interface">
      <div className="interface__inner container">
        <div className="interface__head">
          <div className="interface__connect">
            {/* <span className={`interface__title ${ isActive ? "interface-active" : ""}`}>
            {isActive ? 'Вы подключены к приборам:' : 'Нет активных соединений'}
            </span>
              {devise.map((item, index) => (
                <span key={index} className="interface__devises">
                  {item}
                  {index < devise.length - 1 ? ", " : ""}
                </span>
              ))} */}
          </div>
        </div>
        <div className="interface__body generate-interface">
          <div className="generate-interface__title">
            
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
