// must be imported before React and React DOM
import { scan } from 'react-scan'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './app'

scan({ enabled: process.env.NODE_ENV === 'development' }); // 💥 At the very top, before React

const rootElement = document.getElementById('app')
// ensures React only renders once in HMR or micro-frontends
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
