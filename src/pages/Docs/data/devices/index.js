import oscilloscopeData from './oscilloscope.json';
import multimeterData from './multimeter.json';

/**
 * Список доступных приборов.
 * Для добавления нового — импортируй JSON и добавь объект в массив.
 */
const devices = [
  {
    id: 'oscilloscope',
    name: 'Осциллограф XYZ-2000',
    data: oscilloscopeData,
  },
  {
    id: 'multimeter',
    name: 'Мультиметр DMM-340',
    data: multimeterData,
  },
];

export default devices;
