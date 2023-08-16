import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./login.scss";
import img1 from "../assets/login.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postService } from "../services/service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const naviagte = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (data) => {
      const result = await postService("/signIn", data);
      if (result?.data?.success) {
        toast.success("login successful");
        localStorage.setItem("coWorkToken", result?.data?.data?.Token);
        localStorage.setItem(
          "coWorkUser",
          JSON.stringify(result?.data?.data?.user)
        );
        localStorage.setItem("coworkRole", result?.data?.data?.user?.type);
        naviagte("/location");
      }
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error" style={{ color: "red" }}>
          {formik.errors[name]}
        </small>
      )
    );
  };
  return (
    <div className="signup_main">
      <Header />
      <div className="signup_left">
        <div className="signup_inner_card">
          <form onSubmit={formik.handleSubmit}>
            <p className="signin_title">Log In</p>
            <div className="signup_input_div">
              <input
                className="signup-input"
                placeholder="Email"
                type="email "
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("email")}
              <input
                className="signup-input"
                placeholder="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("password")}
              <div>
                <input type="checkbox"></input>
                <label>remember me</label>
              </div>
              <button className="signup___button">Login</button>
              <div className="line"></div>
              <center>
                <p className="innier_pp_sigfnup">
                  Dont have an account?{" "}
                  <Link to="/signup">create a new one</Link>
                </p>
              </center>
            </div>
          </form>
        </div>
      </div>
      <div
        className="signup_right"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      >
        <div>
          <p>CoWork</p>
          <p>Rent with us</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
