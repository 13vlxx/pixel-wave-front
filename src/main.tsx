import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18n} defaultNS={"translation"}> */}
    <App />
    {/* </I18nextProvider> */}
  </React.StrictMode>,
)
