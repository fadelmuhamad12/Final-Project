import React from "react";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";
import Slider from "react-slick/lib/slider";
import { Card, Image, Col } from "react-bootstrap";

const Banner = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  const [banners, setBanners] = useState([]);

  const fetchBanner = async () => {
    try {
      const banners = await axiosInstance.get("/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(banners.data.data);
      setBanners(banners.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    // <div>
    //   <h2>Banner</h2>
    //   <Slider {...settings}>
    //   {banners.slice(0,4).map((banner) => {
    //     return (
    //       <div key={banner.id}>
    //         <h4>{banner.name}</h4>
    //         <p>{banner.id}</p>
    //         <img src={banner.imageUrl} alt="" />
    //       </div>
    //     );
    //   })}

    //   </Slider>
    // </div>

    <div className="fullCoverPromo d-flex">
      <h3 className="activitiesText">Rekomendasi Tempat <br/> Untukmu</h3>
      {banners.slice(0, 2).map((banner) => {
        return (
         
            <Col key={banner.id}>
             <div className="coveraActivitiesCards">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={banner.imageUrl} />
                <Card.Body>
                  <Card.Title>{banner.name}</Card.Title>
                </Card.Body>
              </Card>
              </div>
            </Col>
          
        );
      })}
    </div>
  );
};

export default Banner;
