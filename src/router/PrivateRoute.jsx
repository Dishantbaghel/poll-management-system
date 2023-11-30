import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  const isLoggedIn = token && role;

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to='/signin' />;
  }
};

export default PrivateRoute;
