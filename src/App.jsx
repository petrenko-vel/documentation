import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Panel from './pages/Panel';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Chat from './pages/Chat';
import NotDefind from './components/NotDefind/NotDefind';
import NetworkManager from './components/NetworkManager';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />      
          <Route path="/documentation/*" element={<Docs />} /> 
          <Route path="panel" element={<Panel />} /> 
          <Route path="chat" element={<Chat />} /> 
          <Route path='*' element={<NotDefind />} />
        </Route>
      </Routes>
      <NetworkManager />
    </BrowserRouter>
  );
}
export default App;










