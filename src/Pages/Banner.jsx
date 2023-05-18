import React from "react";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";
import Slider from "react-slick/lib/slider";
import { Card, Image, Col } from "react-bootstrap";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../components/SliderSettings";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [banners, setBanners] = useState([]);

  const fetchBanner = async () => {
    try {
      const banners = await axiosInstance.get("/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      // console.log(banners.data.data);
      setBanners(banners.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <>

    <div className="cardWrapper">
      <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
          <div className="r-Head flexColStart">
            <span className="textCard">Inspirasi Buat Kamu</span>
          </div>

          <Swiper {...sliderSettings}>
            <SliderButtons/>
            {banners.slice(1, 8).map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="flexColStart r-card">
                  <img src={banner.imageUrl} />
                  <span className="textCard">{banner.name}</span>
                  <br/>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>



       {/* <div  className="fullCoverKategori ">
    <h2> Inspirasi Tempat Untuk Kamu </h2>
        <Slider {...settings}>
          {banners.map((banner)=> {
            return(
              <div key={banner.id} className="coverCategories">
              <Col
                xs={6}
                s={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="justify-content-center text-align-center "
              >
                <Card style={{ width: "250px", margin: "10px" }}>
                  <Card.Img variant="top" src={banner.imageUrl} />
                  <Card.Body>
                    <Card.Title>{banner.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </div>

          
            )
          })}
  
        </Slider>
      </div> */}
    </>
  );
};

export default Banner;


const SliderButtons = () => {
  const swiper = useSwiper();
 
  return (
    <div className="flexCenter r-buttons">
      <button  onClick={() => swiper.slidePrev()}>&lt;</button>
      <button  onClick={() => swiper.slideNext()}> &gt;</button>
    </div>
  )
 }