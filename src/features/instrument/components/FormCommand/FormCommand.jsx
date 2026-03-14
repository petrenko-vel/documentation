import { useState } from "react";
import './InstrumentInterface.scss'

function FormCommand(props) {

  const {
    selectedResource
  } = props

  const [command, setCommand] = useState("");  // мониторит инпута

  // const handleSubmitForm = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/instruments/command", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       resource: selectedResource,
  //       command: command,
  //     }),
  //   });

  //   const data = await res.text();
  //   console.log(data);
  // };

  // const databaseInstrument = [
  //   {

  //   },
  // ]


  const tabsControls = [
    {
      'name': 'Каналы',
    },
    {
      'name': 'Волна',
    },
    {
      'name': 'Каналы',
    },
    {
      'name': 'Каналы',
    },
    {
      'name': 'Каналы',
    },
    {
      'name': 'Каналы',
    },
    {
      'name': 'Каналы',
    },
  ]

  return (
    // <form onClick={handleSubmitForm}>
    //   <p>Выбран прибор: {selectedResource} </p>

    //   <input
    //     placeholder="Введите SCPI команду"
    //   />

    //   <button type="submit">Отправить</button>
    // </form>

    <div className="interface-instruments__wrapper">
      <h2 className="interface-instruments__title">Заголовок инструмента</h2>
      <div className="interface-instruments__container">
        <div className="interface-instruments__canvas"></div>
        <ul className="interface-instruments__list">
          <li className="interface-instruments__item item-instrument">
            <h3 className="item-instrument__title">Заголовок раздела</h3>
            <ul className="item-instrument__list">
              {/* тут будет map из бд*/}
              <li className="item-instrument__item">
                <button className="item-instrument__button">
                  текст кнопки
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FormCommand;





const USB =  {
    "resource":"USB0::26198::2100::1243741340::0::INSTR",
    "idn":"UNI-T Technologies,UTG900E,1243741340,1.09"
}

const LAN = {
    "resource":"TCPIP::169.254.182.187::INSTR",
    "idn":"RIGOL TECHNOLOGIES,DS1054Z,DS1ZA232806350,00.04.05.SP1"
}