import React, { useEffect } from "react";
import { dispatch } from "../redux/Store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetReducer, signup } from "../redux/reducers/SignUpSlice";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const signupSlice = useSelector((state) => state.SignUpSlice);
  const status = useSelector((state) => state.SignUpSlice.isLoading);
  // const error = useSelector((state) => state.SignUpSlice.isError);

  useEffect(() => {
    dispatch(signup());
  }, []);

  useEffect(() => {
    if (signupSlice.isSuccess && !signupSlice.data.message) {
      alert("Successfully Signed Up");
      navigate("/");
      dispatch(resetReducer());
    } else if (signupSlice.data.message) {
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
        role: "guest",
      },
      validationSchema: signupSchema,
      onSubmit: (values) => {
        dispatch(signup(values));
        // if (status) {
        //   dispatch(resetReducer());
        // }
      },
    });

  return (
    <div className="parent">
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <br />
        <div>
          <label htmlFor="name">Name: </label>
          <br />
          <input
            className="signup-input"
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
            <p className="form-error">{errors.name}</p>
          ) : null}
        </div>
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input
          className="signup-input"
          name="password"
          type="password"
          placeholder="Enter Password here..."
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.name ? (
          <p className="form-error">{errors.password}</p>
        ) : null}
        <br />
        <br />
        <label htmlFor="role">Choose a role: </label>

        <select
          className="dropdown"
          id="role"
          name="role"
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
