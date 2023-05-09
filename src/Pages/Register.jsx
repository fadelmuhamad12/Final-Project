import React from "react";
import axiosInstance from "../api/axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";


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
      profilePictureUrl: Yup.string(),
      phoneNumber: Yup.string(),
    }),
    onSubmit: (values) => {
      // const email = values.email;
      // const name = values.name;
      // const password = values.password;
      // const passwordRepeat = values.passwordRepeat;
      // const profilePictureUrl = values.profilePictureUrl;
      // const phoneNumber = values.phoneNumber;
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
          navigate("/")
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });


  return (
    <div>
      <div className="container d-flex justify-content-center align-item-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
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
            <div className="inputBox">
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
            </div>
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
            <button className="enter">Enter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
