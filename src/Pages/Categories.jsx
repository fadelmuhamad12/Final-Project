import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Col, Image, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const Categories = () => {
  const [categories, setCategoies] = useState([]);
  // const [name, setName] = useState(localStorage.getItem("nameCategories"));
  // const [image,setImage] = useState(localStorage.getItem("imageCategories"));
  // const [id, setId] = useState(localStorage.getItem("idCategories"));

  const fetchCategories = async () => {
    try {
      const categories = await axiosInstance.get("/categories", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(categories.data.data);
      setCategoies(categories.data.data);
      // const nameCategories = categories.data.data.map((category)=> category.name);
      // localStorage.setItem("nameCategories", nameCategories);
      // const imageCategories = categories.data.data.map((category)=> category.imageUrl);
      // localStorage.setItem("imageCategories", imageCategories)
      // const idCategories = categories.data.data.map((category)=> category.id);
      // localStorage.setItem("idCategories", idCategories);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  

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
                <Card style={{ width: "150px", margin: "10px" }}>
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


    </>
  );
};

export default Categories;
