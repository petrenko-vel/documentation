import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react';
import Header from "./layouts/Header"
import Documentary from './components/Documentary'


function App() {
  

      // Получаем страницы документации
    const docPages = import.meta.glob('./pages/documentation/*.jsx', { eager: false });

    // Генерируем маршруты
    const routes = Object.keys(docPages).map((path) => {
      const name = path
        .replace('./pages/documentation/', '')
        .replace('.jsx', '');
      const Component = React.lazy(() => docPages[path]());
      const routePath = name.toLowerCase();
      return { path: routePath, Component };
    });

  return (
    <Router>
      <Header />


      <main>
        <Suspense fallback={<div className="text-center p-4">...Загрузка</div>}>
          <Routes>
            <Route path="/documentation" element={<Documentary />}>
              {routes.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Component />}
                />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </main>
    </Router>
  )
}

export default App
