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
                  The promo card may only be used for tickets purchased through
                  official channels, including the Chase Center website or box
                  office The promo card may only be used for tickets purchased
                  through official channels, including the Chase Center website
                  or box office The promo card may only be used for tickets
                  purchased through official channels, including the Chase
                  Center website or box office The promo card may only be used
                  for tickets purchased through official channels, including the
                  Chase Center website or box office
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
