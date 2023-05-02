import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Col, Image, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Categories = () => {
  const [categories, setCategoies] = useState([]);

  const fetchCategories = async () => {
    try {
      const categories = await axiosInstance.get("/categories", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(categories.data.data);
      setCategoies(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      imageUrl: Yup.string().required(),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-category",
          {
            name: values.name,
            imageUrl: values.imageUrl,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then((response) => {
          console.log(response, "berhasil");
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <h1>Kategori yang cocok buat kamu</h1>
      <div className="fullCategories d-flex justify-content-center mt-5">
        {categories.map((category) => {
          return (
            <div key={category.id} className="coverCategories">
              <Col
                xs={6}
                s={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="justify-content-center text-align-center "
              >
                <Card style={{ width: "50px", margin: "10px" }}>
                  <Card.Img variant="top" src={category.imageUrl} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          );
        })}
      </div>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            id="imageUrl"
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Categories;
