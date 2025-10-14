import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Panel from './pages/Panel';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Layout from './layouts/Layout';
import Chat from './pages/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />      
          <Route path="/documentation/*" element={<Docs />} /> 
          <Route path="panel" element={<Panel />} /> 
          <Route path="chat" element={<Chat />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;










