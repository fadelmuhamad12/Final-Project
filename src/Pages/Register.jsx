import React from "react";
import axiosInstance from "../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Register = () => {
  const navigate = useNavigate();

  // Formik Register
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      name: Yup.string()
        .min(3, "Must be 15 Characters or less")
        .required("Required"),
      password: Yup.string().required(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
      role: Yup.string()
        .oneOf(["user", "admin"], "Select Role")
        .required("Required"),
      profilePictureUrl: Yup.string(),
      phoneNumber: Yup.string(),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/register",
          {
            email: values.email,
            name: values.name,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            role: values.role,
            profilePictureUrl: values.profilePictureUrl,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        )
        .then((response) => {
          alert("register berhasil");
          console.log(response);
          navigate("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  return (
    <div className="FullRegisterPage d-flex">
      <div className="left-side">
        <div className="left-side-title">
          <h3>collection of the most beautiful places and experience</h3>
        </div>
        <div className="left-side-signup">
          <h5>Sign Up To get the Benefit!</h5>
          <br />
        </div>
        <div className="left-side-or">
          <h5>Or</h5>
          <br />
        </div>
        <div className="left-side-button">
          <Link to="/home">
            <button className="button"></button>
          </Link>
          <br />
        </div>
      </div>

      <div className="right container d-flex justify-content-center align-item-center ">
        <form onSubmit={formik.handleSubmit}>
          <div className="cardRegister">
            <a className="singup">Sign Up</a>
            <div className="inputBox1">
              <input
                id="email"
                name="email"
                value={formik.values.email}
                // onChange={handleEmailChange}
                onChange={formik.handleChange}
                type="text"
                required="required"
              />
              <span className="user">Email</span>
            </div>
            <div className="inputBox">
              <input
                id="name"
                name="name"
                value={formik.values.name}
                // onChange={handleNameChange}
                onChange={formik.handleChange}
                type="text"
                required="required"
              />
              <span>Name</span>
            </div>
            <div className="inputBox">
              <input
                id="password"
                name="password"
                value={formik.values.password}
                // onChange={handlePasswordChange}
                onChange={formik.handleChange}
                type="password"
                required="required"
              />
              <span>Password</span>
            </div>
            <div className="inputBox">
              <input
                id="passwordRepeat"
                name="passwordRepeat"
                value={formik.values.passwordRepeat}
                // onChange={handlePasswordRepeatChange}
                onChange={formik.handleChange}
                type="password"
                required="required"
              />
              <span>Password Repeat</span>
            </div>
            {/* <div className="inputBox">
              <input
                id="role"
                name="role"
                value={formik.values.role}
                // onChange={handleRoleChange}
                onChange={formik.handleChange}
                type="text"
                required="required"
              />
              <span>Role</span>
            </div> */}
            <div className="inputBox">
              <input
                id="profilePictureUrl"
                name="profilePictureUrl"
                value={formik.values.profilePictureUrl}
                // onChange={handleProfilePictureUrlChange}
                onChange={formik.handleChange}
                type="text"
                required="required"
              />
              <span>Profile Picture Url</span>
            </div>
            <div className="inputBox">
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                // onChange={handlePhoneNumberChange}
                onChange={formik.handleChange}
                type="text"
                required="required"
              />
              <span>Phone Number</span>
            </div>
            <div className="inputBox">
              <Form.Select
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                type="text"
                required="required"
              >
                <option select="true">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </div>

            <button className="enter">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
