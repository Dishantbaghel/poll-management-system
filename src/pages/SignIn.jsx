import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetReducer } from "../redux/reducers/LoginSlice";
import { jwtDecode } from "jwt-decode";
import {
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signIn.css";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setUserPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSlice = useSelector((state) => state.loginSlice);
  const status = useSelector((state) => state.loginSlice.isLoading);

  useEffect(() => {
    if (loginSlice.isSuccess && loginSlice.data.token) {
      const decoded = jwtDecode(loginSlice.data.token);
      localStorage.setItem("token", loginSlice.data.token);
      localStorage.setItem("role", decoded.role.toLowerCase());
      dispatch(resetReducer());

      const isAdmin = decoded.role.toLowerCase() === "admin";
      navigate(isAdmin ? "/private/Admin" : "/private/Home");
    }
  }, [loginSlice.isSuccess, dispatch, navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      toast.error("🦄 InputField cannot be empty!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const userCredentials = {
        username,
        password,
      };
      dispatch(login(userCredentials));
    }
  };

  return (
    <div className="signIn-container">
      {status && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="signIn-box1">
        <form onSubmit={handleFormSubmit}>
          <h1>SIGN IN</h1>
          <br />
          <label>Name: </label>
          <br />
          <TextField
            className="signIn-input"
            type="text"
            value={username}
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <label>Password: </label>
          <br />
          <TextField
            className="signIn-input"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e) => setUserPass(e.target.value)}
          />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <div>
              <button type="submit" className="btn">
                Sign In
              </button>
            </div>
            <Link to="/signup">Don't have an account? Register now</Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SignIn;
