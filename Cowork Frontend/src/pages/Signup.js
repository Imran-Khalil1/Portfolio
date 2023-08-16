import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./signup.scss";
import img1 from "../assets/signup.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postService } from "../services/service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const naviagte = useNavigate();
  const [role, setRole] = useState();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
    confirm_password: Yup.string().required("This field is required"),
  });
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      type: "",
    },

    onSubmit: async (data) => {
      data["type"] = role;
      const result = await postService("signup", data);
      if (result?.data?.success) {
        toast.success("signup successful");
        naviagte("/login");
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
            <p className="title_signup">Sign Up</p>
            <div className="signup_input_div">
              <input
                className="signup-input"
                placeholder="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("name")}
              <input
                className="signup-input"
                placeholder="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("email")}
              <select
                className="signup-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected disabled>
                  Select role
                </option>
                <option value="tenet">Tenet</option>
                <option value="lessor">lessor</option>
              </select>
              <input
                className="signup-input"
                placeholder="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("password")}
              <input
                className="signup-input"
                placeholder="confirm Password"
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              ></input>
              {getFormErrorMessage("confirm_password")}
              <div>
                <input type="checkbox"></input>
                <label>By signin up you accept terms and services</label>
              </div>
              <button className="signup___button" type="submit">
                Sign up
              </button>
              <center>
                <p>
                  Dont have an account? <Link to="/login">Sign In</Link>
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

export default Signup;
