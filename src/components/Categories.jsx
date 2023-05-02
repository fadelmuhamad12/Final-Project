import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Col, Image } from "react-bootstrap";

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

  // const renderCategories = (()=> {
  //     return categories.map((category)=> {
  //         return (
  //             <div key={category.id}>
  //                 <h1>{category.name}</h1>
  //                 <h1>{category.id}</h1>
  //                 <img src= {category.imgUrl} />
  //             </div>

  //         );
  //     });
  // });

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1>Kategori yang cocok buat kamu</h1>
      <div className="fullCategories d-flex justify-content-center mt-5">
      
        {categories.slice(0, 4).map((category) => {
          return (
            <div key={category.id} className="coverCategories"> 
            <Col xs={6} s={4} sm={4} md={4} lg={4} xl={4}  className= "justify-content-center text-align-center ">
              <Card style={{ width: "18rem", margin: "10px" }}>
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
