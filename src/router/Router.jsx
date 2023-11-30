import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import EditPoll from '../components/EditPoll';
import AddPolls from '../components/AddPolls';
import AddOptions from '../components/AddOptions';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = token && role;
  return (
    <>
      <Routes>
        {isLoggedIn && <Route path='/' element={role === 'admin' ? <Admin/> : <Home/>} />}
        <Route path='/' element={<SignIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/AddPolls' element={<AddPolls />} />
        <Route exact path='/editPoll/:edittitleId' element={<EditPoll />} />
        <Route path='/AddOptions/:optionId' element={<AddOptions />} />

        <Route
          path='/private/*'
          element={<PrivateRoute />}
        >
          <Route path='admin' element={<Admin />} />
          <Route path='home' element={<Home />} />
        </Route>

      </Routes>
    </>
  );
};

export default Router;