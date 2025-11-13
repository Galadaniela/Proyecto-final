import React from 'react'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Shomanager from './pages/shopmanager'
import { Navigate } from "react-router-dom"
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import './styles.css'
function App() {
  return(
    <Routes>
     <Route path="/" element={ <Navigate to="/login" />} />
      

     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/shopmanager" element={<Shomanager />} />
     
    </Routes>
  )
}

export default App
