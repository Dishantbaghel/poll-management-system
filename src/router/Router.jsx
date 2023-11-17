import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Admin from '../pages/Admin'

const Router = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<SignIn/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Admin' element={<Admin/>} />
    </Routes>
    </>
  )
}

export default Router