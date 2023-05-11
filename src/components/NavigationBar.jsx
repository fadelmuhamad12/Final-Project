import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Modal,
  Button,
  Image,
} from "react-bootstrap";
import axiosInstance from "../api/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useNavigate } from "react-router-dom";


const NavigationBar = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [number, setNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLogin = JSON.parse(localStorage.getItem("datas"));

  const navigate = useNavigate();



  // Modal Login
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // Modal Profile
  const handleProfileShow = () => {
    setShowProfile(true);
  };
  const handleProfileClose = () => {
    setShowProfile(false);
  };


  const handleLogout = () => {
    axiosInstance.get("/logout", {
      headers: {
        apiKey: apiKeys,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
      },
    });
    localStorage.removeItem("token", token);
    localStorage.removeItem("datas");
    // localStorage.removeItem("idCategories");
    // localStorage.removeItem("nameCategories");
    // localStorage.removeItem("imageCategories")
    alert("Logout Success");
    navigate("/")
    
  };

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     name: "",
  //     password: "",
  //     passwordRepeat: "",
  //     role: "",
  //     profilePictureUrl: "",
  //     phoneNumber: "",
  //   },
  //   validationSchema: yup.object().shape({
  //     email: yup.string().required().email(),
  //     password: yup.string().required(),
  //     passwordRepeat: yup.string().required(),
  //     name: yup.string().required(),
  //     role: yup.string().required(),
  //     profilePictureUrl: yup.string().required(),
  //     phoneNumber: yup.string().required(),
  //   }),
  //   onSubmit: (values) => {
  //     axiosInstance
  //       .post(
  //         "/register",
  //         {
  //           email: values.email,
  //           name: values.name,
  //           password: values.password,
  //           passwordRepeat: values.passwordRepeat,
  //           role: values.role,
  //           profilePictureUrl: values.profilePictureUrl,
  //           phoneNumber: values.phoneNumber,
  //         },
  //         {
  //           headers: {
  //             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         alert("Register Berhasil");
  //         window.location.reload();
  //       });
  //   },
  // });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/login",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        )
        .then((response) => {
          alert("Login Berhasil");
          const token = response.data.token;
          setToken(token);
          localStorage.setItem("token", token);
          localStorage.setItem("datas", JSON.stringify(response.data));
          window.location.reload();
          console.log(response);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value); // <--- untuk mengganti isi
  };

  useEffect(() => {
    const storedData = localStorage.getItem("datas");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.data.name);
      setNumber(parsedData.data.number);
      setAvatar(parsedData.data.profilePictureUrl);
      setRole(parsedData.data.role);
    }
  });

  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand> JUDUL </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav className="gap-4 ">
                {/* <Link to="/">Home</Link> */}
                <Link to="/Categories">Categories</Link>
                <Link to="/Promo">Promos</Link>
                <Link to="/Activities">Activities</Link>
                <Link to>Contact Us</Link>
                <Link to>About</Link>
              </Nav>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {isLogin ? (
                <div className="text-white mt-2" onClick={handleProfileShow}>
                  Profile
                </div>
              ) : (
                <Nav.Link className="mt-2" onClick={handleShow}>
                  Login
                </Nav.Link>
              )}
            </Form>
            <div className="btn-register">
              <Link to="/Register">Register</Link>
            </div>
          </Navbar.Collapse>
        </Container>

        {/* Modal Login */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  values={formik.values.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="Password"
                  name="password"
                  values={formik.values.name}
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="password"
                  placeholder="Password"
                  name="password"
                  values={formik.values.password}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Repeat</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="password"
                  placeholder="Password"
                  name="password"
                  values={formik.values.passwordRepeat}
                />
              </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="Password"
                  name="password"
                  values={formik.values.role}
                />
              </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="text"
                  name="password"
                  values={formik.values.profilePictureUrl}
                />
              </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Phone Number: </Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="text"
                  name="password"
                  values={formik.values.phoneNumber}
                />
              </Form.Group> */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal Profile */}
        <Modal show={showProfile} onHide={handleProfileClose}>
          <Modal.Header closeButton>
            <Modal.Title className="titlePremiumProfile">Welcome, {name}!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="profile">
              <Image src={"avatar"} className="img-profile" />
              <div className="username">Name: {name}</div>
              <div className="username">Role: {role}</div>
              {(isLogin && role === "admin") || "Admin" ? (

                <Link to ="/DashboardAdmin"> Dashboard Admin</Link>
                // <DropdownButton
                //   id="dropdown-basic-button"
                //   title="Kelola Travel"
                // >
                //   <div className="">
                //     <Link to="/CategoriesAdmin">Kelola Kategori </Link>
                //     <Link to="/ActivitiesAdmin">Kelola Activities </Link>
                //     <Link to="/BannersAdmin">Kelola Banner</Link>
                //     <Link to="/PromosAdmin">Kelola Promo </Link>
                //     <Link to="/UserAdmin">Kelola User </Link>
                //   </div>
                // </DropdownButton>
              ) : (
                "Bukan Admin"
              )}
              {/* <DropdownButton
                id="dropdown-basic-button"
                title="Kelola Travel"
              >
                    <div className="">
                    <Link to="/CategoriesAdmin">Kelola Banner </Link>
                    <Link to="/CategoriesAdmin">Kelola Banner </Link>
                    <Link to="/CategoriesAdmin">Kelola Banner </Link>
                    </div>
              </DropdownButton> */}
            </div>
            <Button
              variant="danger"
              type="submit"
              className="btn-subs"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Modal.Body>
        </Modal>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
