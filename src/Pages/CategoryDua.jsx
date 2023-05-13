import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Col, Image, Form, Button, Container } from "react-bootstrap";
import React, { Component } from "react";

const CategoryDua = () => {
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

  return (
    <>
      <div className="destination">
        {categories.slice(1, 2).map((category) => {
          return (
            <div className="first-descdua" key={category.id}>
              <div className="image">
                <img src={category.imageUrl} alt="" />
                <img src={category.imageUrl} alt="" />
              </div>
              <div className="desc-text">
                <h2>{category.name}</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryDua;
