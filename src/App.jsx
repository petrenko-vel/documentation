import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Header from "./layouts/Header"
import Content from "./layouts/Content"





function App() {
  // const pages = import.meta.glob('./pages/*.jsx')

  // const routes = Object.keys(pages).map((path) => {                            // получаем имя файла без расширения и ./pages/

  //   const name = path.replace('./pages/', '').replace('.jsx', '')              // генерируем компонент для route
  //   const Component = React.lazy(() => pages[path]())                                // динамический импорт с ленивой загрузкой
  //   const routePath = name === 'index' ? '/' : `/${name.toLowerCase()}`        // "/" для index, "/name" для остальных
    
  //   return { path: routePath, Component }
  // })

  return (
    <Router>
      <Header />

      {/* <Content>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
       
          </Routes>
        </React.Suspense>
      </Content> */}

      {/* <Footer /> */}
    </Router>
  )
}

export default App
