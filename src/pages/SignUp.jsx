import React, { useEffect } from "react";
import { dispatch } from "../redux/Store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetReducer, signup } from "../redux/reducers/SignUpSlice";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from '@mui/material'
import './signUp.css'

const SignUp = () => {
  const navigate = useNavigate();
  const signupSlice = useSelector((state) => state.SignUpSlice);
  const status = useSelector((state) => state.SignUpSlice.isLoading);

  useEffect(() => {
    dispatch(signup());
  }, [status]);

  useEffect(() => {
    if (signupSlice.isSuccess && !signupSlice.data.message) {
      toast.success('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      navigate("/");
      dispatch(resetReducer());}  
    if (signupSlice.data.message) {
      toast.error("User allready exist.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [signupSlice.isSuccess]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        role: "admin",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
        console.log(values);
        dispatch(signup(values));
        if (status) {
          dispatch(resetReducer());
        }
      },
    });

  return (
    <div className="signUp-container">
    <div className="signUp-box1">
      <form onSubmit={handleSubmit}>
        <h1>SIGN UP</h1>
        <br />
        <div>
          <label htmlFor="name">Name: </label>
          <br />
          <TextField
          className="signUp-input"
            autoComplete="off"
            name="name"
            id="name"
            placeholder="Enter Name here..."
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            />
          {errors.name && touched.name ? (
            <div className="form-error">{errors.name}</div>
          ) : null}
        </div>
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <TextField 
          className="signUp-input"
          name="password"
          type="password"
          placeholder="Enter Password here..."
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.name ? (
          <div className="form-error">{errors.password}</div>
        ) : null}
        <br />
        <br />

        <label htmlFor="role">Choose a role: </label>
        <select
          className="signUp-dropdown"
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="admin">admin</option>
          <option value="guest">guest</option>
        </select>
        <br />
        <br />
        <br />
        <button className="btn" type="submit">
          Sign Up
        </button>
        <Link to="/signin" className="btn" type="submit">
          Sign In
        </Link>
      </form>
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
    </div>
  );
};

export default SignUp;
