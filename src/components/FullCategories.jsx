import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import NavigationBar from "./NavigationBar";


const FullCategories = () => {
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
      <NavigationBar />
      <Container>
         <Row>
          <h1>Cek Semua Kategori yang tersedia Disini!</h1>
          {categories.map((category) => {
            return (
              <Col
                xs={6}
                s={4}
                sm={4}
                md={4}
                lg={3}
                xl={2}
                className="justify-content-center text-align-center d-flex mt-3 "
                key={category.id}
             >
                <Card
                  className="text-center cards"
                >
                  <div className="listcard">
                    <Image
                      src={category.imageUrl}
                      alt="Obx"
                      className="rounded"
                      style={{width:"100%"}}
                    />
                    <div>
                      <Card.Title> {category.name}</Card.Title>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        </Container>
      </>
   


  );
};

export default FullCategories;
