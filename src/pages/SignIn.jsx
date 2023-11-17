import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { dispatch } from "../redux/Store";
import { login } from "../redux/reducers/LoginSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from 'jwt-decode';


const SignIn = () => {
  const [username, setUserName] = useState('');
  const [password, setUserPass] = useState('');
  const [test1, setTest1] = useState(false)
  const [test2, setTest2] = useState(false)





  const navigate = useNavigate()
  const loginSlice = useSelector((state) => state.loginSlice);
  const status = useSelector((state) => state.loginSlice.isLoading);
  const error = useSelector((state) => state.loginSlice.isError);


  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role);
      if (decoded.role === "admin" || decoded.role === "Admin" ) {
        navigate("/Admin");
      } else if (decoded.role === "Guest" || decoded.role === "guest") {
        navigate("/Home");
      }
    }
    else {
    }
  }, [loginSlice.isSuccess])





  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim() == '' || password.trim() == '') {
      setTest1(true)
      setTest2(true)
    }
    let userCredentials = {
      username,
      password
    };
    dispatch(login(userCredentials));
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleFormSubmit}>
        <h1>Sign In</h1>
        <br />
        <label >Name: </label><br />
        <input
          className="signup-input"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {test1 && <p> please enter name</p>}
        <br/><br/>
        <label >Password: </label><br />
        <input
          className="signup-input"
          type="password"
          value={password}
          onChange={(e) => setUserPass(e.target.value)}
        />
         {test2 && <p> please enter password</p>}
        <br/><br/>
        <button type="submit" className="btn" >Sign In</button>
        <Link to='/signup' className="btn" type="submit">Sign Up</Link>
      </form>
    </div>
  )
}

export default SignIn