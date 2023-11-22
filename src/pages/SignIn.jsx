import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { dispatch } from "../redux/Store";
import { login } from "../redux/reducers/LoginSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import './signIn.css'
import { TextField } from "@mui/material";
import { resetReducer } from "../redux/reducers/SignUpSlice";

const SignIn = () => {
  const [username, setUserName] = useState('');
  const [password, setUserPass] = useState('');
  const [validationError, setValidationError] = useState(false);

  const navigate = useNavigate();
  const loginSlice = useSelector((state) => state.loginSlice);

  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role.toLowerCase());
      dispatch(resetReducer());
      
      const isAdmin = decoded.role.toLowerCase() === "admin";
      navigate(isAdmin ? "/Admin" : "/Home");
    }
  }, [loginSlice.isSuccess]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setValidationError(true);
    } else {
      setValidationError(false);
      const userCredentials = {
        username,
        password
      };
      dispatch(login(userCredentials));
    }
  };

  return (
    <div className="signIn-container">
      <div className="signIn-box1">
        <form onSubmit={handleFormSubmit}>
          <h1>SIGN IN</h1>
          <br />
          <label>Name: </label><br />
          <TextField 
            className="signIn-input"
            type="text"
            value={username}
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
          {validationError && <p>Please enter a name</p>}
          <br/><br/>
          <label>Password: </label><br />
          <TextField
            className="signIn-input"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e) => setUserPass(e.target.value)}
          />
          {validationError && <p>Please enter a password</p>}
          <br/><br/>
          <button variant='contained' type="submit" className="btn">Sign In</button>
          <Link to='/signup' className="btn" type="submit">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;