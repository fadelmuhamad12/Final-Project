import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Modal, Button } from "react-bootstrap";
import axiosInstance from "../api/axios";

const NavigationBar = () => {
  const [show, setShow] = useState(false);

  // Modal Login
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal Login End --------------

  // Handle Login
  const handleSubmit = async () => {
    try {
      const register = await axiosInstance.post("/register", {
      
          "email": "miftahfarhan@gmail.com",
          "name": "Miftah Farhan",
          "password": "qwerty123",
          "passwordRepeat": "qwerty123",
          "role": "admin",
          "profilePictureUrl": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
          "phoneNumber": "08976041232"
      }, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
        },
      }).then((response2) => {
        console.log(register);
        axiosInstance.post('/login', {
          "email": "miftahfarhan@gmail.com",
          "password": "qwerty123"
        }, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
          }
        })
        console.log(response2);
      }).then((response3)=> {
        axiosInstance.get('/logout', {
          headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`          }
        })
           console.log(response3);
      })
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
      handleSubmit();
  }, [])

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
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Categories</Nav.Link>
              <Nav.Link>Promos</Nav.Link>
              <Nav.Link>Activities</Nav.Link>
              <Nav.Link>Contact Us</Nav.Link>
              <Nav.Link>About</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Nav.Link className="mt-2" onClick={handleShow}>
                Login
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
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
