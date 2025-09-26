import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@/style/main.scss'

// import '@/modules/PromoClose.js'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
  </React.StrictMode>,
)
