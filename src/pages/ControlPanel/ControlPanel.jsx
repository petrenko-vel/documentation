import React, { useEffect, useState } from "react";
import './ControlPanel.scss'
import FormCommand from "@/features/instrument/components/FormCommand";



export default function Interface() {

  const [dataInstruments, setDataInstrumets] = useState([

    // Массив приборов приходит такой
    {
      "available_instruments": [
        {
          "resource":"USB0::26198::2100::1243741340::0::INSTR",
          "idn":"UNI-T Technologies,UTG900E,1243741340,1.09"
        }
      ]
    }

    // Ретернится такой:

    // [
    //   idn => ['UNI-T Technologies', 'UTG900E'],
    //   resource => "USB0",
    // ]
  ]);

  // const scanInsrtuments = async () => {                     // Сканирование подключенных приборов
  //   const scanResultInstruments = await fetch('/api/insrtuments/scan', {
  //     method: POST,
  //   })

  //   const scanInstrumentsData = await scanResultInstruments.json();
  //   setDataInstrumets(scanInstrumentsData);
  //   // console.log(setDataInstrumets);
    
  // }

  // useEffect(() => {     // Сразу при загрузке страницы фетчим поделюченные приборы
  //   scanInsrtuments();
  // }, [])


  useEffect(() => {
    const scanInsrtuments = dataInstruments.flatMap(item => {
      return item.available_instruments.map(inst => {

        // Разбиваем resource по '::' и берем первый элемент (индекс 0)
        const resourcePart = inst.resource.split('::');
        const idnPart = inst.idn.split(',')

        return {
          "resource": resourcePart[0],
          "idn": [idnPart[0], idnPart[1]],
        } 
      })
    })
    setDataInstrumets(scanInsrtuments);
  }, [])
  
  

  const isActiveInstruments = dataInstruments.length > 0;         // проверка, что актвные устройства существуют

  return (
    <>
     <section className="interface">
      <div className="interface__inner container">
        <div className="interface__head">
          <div className="interface__connect">
            <span className={`interface__title ${ isActiveInstruments ? "interface-active" : ""}`}>
            {isActiveInstruments ? 'Вы подключены к приборам:' : 'Отсутвует подключенный прибор'}
            </span>
              {dataInstruments.map((item, index) => (
                <span key={index} className="interface__devises">
                  {item.idn}
                  {index < dataInstruments.length - 1 ? ", " : ""}
                </span>
              ))}
          </div>
        </div>
        <div className="interface__body interface-instruments">
            <FormCommand />
        </div>
      </div>
    </section>

    
    </>
  )
}
