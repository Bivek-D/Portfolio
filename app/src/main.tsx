import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages arrive pre-rendered (see scripts/prerender.mjs): attach to that HTML instead of rebuilding it.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
