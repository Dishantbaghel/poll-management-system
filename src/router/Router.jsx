import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import Admin from '../pages/Admin'
import EditPoll from '../components/EditPoll'
import AddPolls from '../components/AddPolls'
import AddOptions from '../components/AddOptions'

const Router = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<SignIn/>} />
    <Route path='/signin' element={<SignIn/>} />
    <Route path='/signup' element={<SignUp/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Admin' element={<Admin/>} />
    <Route path='/AddPolls' element={<AddPolls/>} />
    <Route exact path='/editPoll/:edittitleId' element={<EditPoll/>} />
    <Route path='/AddOptions/:optionId' element={<AddOptions/>} />
    </Routes>
    </>
  )
}

export default Router