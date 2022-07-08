import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { MainPage } from './pages/MainPage/MainPage'
import { Register } from './pages/Register/Register'

import { useAuth } from './context/AuthContext'
import { Confirmation } from './Confirmation'

export const App = () => {

  const { currentUser } = useAuth();

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={currentUser ? <MainPage/> : <Navigate to='/login'/>}/>
        <Route path='/bookings/confirmation/:id' element={<Confirmation/>}/>
      </Routes>
    </>
  )
}