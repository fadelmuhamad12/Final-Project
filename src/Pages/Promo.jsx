import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import Slider from "react-slick/lib/slider";

const Promo = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [promos, setPromos] = useState([]);

  const fetchPromos = async () => {
    try {
      const promos = await axiosInstance.get("/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      setPromos(promos.data.data);
      // console.log(promos.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPromos();
  }, []);

  return (
    <div className="fullCoverPromo">
      <h3 className="promoText">Cek Promo yang tersedia yuk </h3>
      <Slider {...settings}>
        {promos.map((promo) => {
          return (
            <div className="coverPromoCards" key={promo.id}>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={promo.imageUrl} alt="" />
                    <p className="title">{promo.title}</p>
                    {/* <p>{promo.title}</p> */}
                  </div>

                  <div className="flip-card-back ">
                    <p className="title">Minimum Claim Price</p>
                    <p>{promo.minimum_claim_price}</p>
                    <p>Promo code:</p>
                    <p>{promo.promo_code}</p>
                    <p>
                      dan Dapatkan diskon sebesar {promo.promo_discount_price}
                    </p>
                    <div className="d-flex justify-content-center">
                    <button className="learn-more ">
                      <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                      </span>
                      <span className="button-text">See Details</span>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            // <Col
            //   className="justify-content-center text-align-center d-flex mt-3  "
            //   key={promo.id}
            // >
            //   <Card className="text-center cards bg-transparent">
            //     <div className="card bg-transparent">
            //       <Image src={promo.imageUrl} className="imgPromo" />
            //       <div className="judul mt-2">
            //         <Card.Title>{promo.title}</Card.Title>
            //       </div>
            //     </div>
            //   </Card>
            // </Col>
          );
        })}
        {/* <Card className="bg-transparent ">
                
                  <Card.Img variant="top" src={promo.imageUrl} className="imgPromo" />
               
                  <Card.Body>
                    <Card.Title>{promo.title}</Card.Title>
                    <Card.Text>{promo.description}</Card.Text>
                  </Card.Body>
                </Card>
        );
        })} */}
      </Slider>
    </div>
  );
};

export default Promo;
