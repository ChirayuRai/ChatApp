import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { warn } from 'node:console';

createRoot(document.getElementById('root')!).render(
    <App />
)
