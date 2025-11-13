import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './contexts/useContext.jsx'
import { CarritoProvider } from './contexts/carritoContext.jsx'
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <UserProvider>
     <CarritoProvider>
       <App />
    </CarritoProvider>
    </UserProvider>
   
  </StrictMode>
  </BrowserRouter>,
)
