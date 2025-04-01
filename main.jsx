import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from "./Header"; // Import Header

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
