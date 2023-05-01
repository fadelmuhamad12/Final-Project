import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Modal, Button } from "react-bootstrap";
import axiosInstance from "../api/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [show, setShow] = useState(false);
  // Modal Login
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
      passwordRepeat: yup.string().required(),
      name: yup.string().required(),
      role: yup.string().required(),
      profilePictureUrl: yup.string().required(),
      phoneNumber: yup.string().required(),
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
          console.log(response);
          alert("Register Berhasil");
          window.location.reload();
        });
    },
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value); // <--- untuk mengganti isi
  };

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
              <Nav.Link className="mt-2" onClick={handleShow}>
                Register
              </Nav.Link>
            </Form>
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="Password"
                  name="password"
                  values={formik.values.name}
                />
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password Repeat</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="password"
                  placeholder="Password"
                  name="password"
                  values={formik.values.passwordRepeat}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="Password"
                  name="password"
                  values={formik.values.role}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="text"
                  name="password"
                  values={formik.values.profilePictureUrl}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Phone Number: </Form.Label>
                <Form.Control
                  onChange={handleForm}
                  type="text"
                  placeholder="text"
                  name="password"
                  values={formik.values.phoneNumber}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
