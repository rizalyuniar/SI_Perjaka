import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './assets/css/sb-admin-2.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Pelatihan from './Pages/Pelatihan/index'
import Jampelatihan from './Pages/JamPelatihan/index'
import Dashboard from './Pages/Dashboard/index'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/register'
import Listpengajar from '../src/Pages/listPengajar/index'
import Buatpelatihan from './Pages/menuPelatihan/index'
import Verif from './Pages/Auth/verif'
import ListPelatihan from './Pages/listPelatihan/index'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pelatihan/:id" element={<Pelatihan />} />
      <Route path="/jampelatihan" element={<Jampelatihan />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/listpengajar" element={<Listpengajar />} />
      <Route path="/buatpelatihan" element={<Buatpelatihan />} />
      <Route path="/verification" element={<Verif />} />
      <Route path="/listpelatihan" element={<ListPelatihan />} />
    </Routes>
  )
}

export default App
