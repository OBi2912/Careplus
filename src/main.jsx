import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ModalProvider } from './context/ModalContext'
import { DataProvider } from './context/DataContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ModalProvider>
        <DataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataProvider>
      </ModalProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
