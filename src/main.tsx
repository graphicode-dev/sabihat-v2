import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "react-phone-input-2/lib/bootstrap.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
