
import React from 'react';
import {Route, Routes, Outlet } from 'react-router-dom';

import Sidebar from '@/components/Sidebar'

import './Docs.scss'
import Home from '../Home';
import Panel from '../Panel';


// export default function Docs() {
//     return(
//         <>
//         {/* <section className="documentation">
//             <div className="documentation__inner container">
//                 <Sidebar />
//                 <div className='documentation__content'>
//                     <Outlet />
//                 </div>
//             </div>
//         </section> */}
//             <Routes>
//                 <section className="documentation">
//                     <div className="documentation__inner container">
//                         <Route path="/" element={<Sidebar />}>
//                             <div className='documentation__content'>
//                                 <Outlet />
//                         </div>
//                         </Route>
//                     </div>
//                 </section>
//             </Routes>
//         </>
//     )
// }

const DocsLayout = () => (
  <section className="documentation">
    <div className="documentation__inner container">
      <Sidebar />
      <div className="documentation__content">
        <Outlet /> {/* Здесь рендерятся вложенные маршруты */}
      </div>
    </div>
  </section>
);

export default function Docs() {
  return (
    <Routes>
      <Route element={<DocsLayout />}>
        <Route index element={<Home />} /> {/* /docs */}
        <Route path="ystanovka" element={<Panel />} /> {/* /docs/ustanovka */}
        {/* Добавьте другие маршруты по необходимости */}
      </Route>
    </Routes>
  );
}