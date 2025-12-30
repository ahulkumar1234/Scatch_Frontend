import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfileProvider } from "./Context/ProfileContext";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  // </StrictMode>
)
