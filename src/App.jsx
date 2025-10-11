import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Panel from './pages/Panel';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />        {/* / */}
          <Route path="docs" element={<Docs />} />  {/* /docs */}
          <Route path="chat" element={<Panel />} /> {/* /chat */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;