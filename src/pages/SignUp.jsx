import React, { useEffect, useState } from "react";
import { dispatch } from "../redux/Store";
import {  useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../redux/reducers/SignUpSlice";


const SignUp = () => {
  const navigate = useNavigate();
  const signupSlice = useSelector((state) => state.SignUpSlice);
  const status = useSelector((state) => state.SignUpSlice.isLoading);
  const error = useSelector((state) => state.SignUpSlice.isError);
  console.log(signupSlice, status, error  );

  useEffect(() => {
    dispatch(signup());
  }, []);



  const [username, setUserName] = useState("");
  const [password, setUserPass] = useState("");
  const [role, setUserRole] = useState("admin");


  const handleFormSubmit = (e) => {
    e.preventDefault();
    let userCredentials = {
      username,
      password,
      role
    };
    dispatch(signup(userCredentials));
    navigate('/signin')
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleFormSubmit}>
        <h1>Sign Up</h1>
        <br />
        <label >Name: </label><br />
        <input
          className="signup-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br/><br/>
        <label >Password: </label><br />
        <input
          className="signup-input"
          type="password"
          value={password}
          onChange={(e) => setUserPass(e.target.value)}
        />
        <br/><br/>
        <label htmlFor="roles">Choose a role: </label>

        <select className="dropdown" id="roles" name="roles" value={role} onChange={(e) => setUserRole(e.target.value)}>
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select><br/><br/><br />
        <button className="btn" type="submit">Sign Up</button>
        <Link to="/signin" className="btn" type="submit">Sign In</Link>
      </form>
    </div>
  );
};

export default SignUp;
