import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Image, Container, Row } from "react-bootstrap";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import Slider from "react-slick/lib/slider";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../components/SliderSettings";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState([]);
  const [modal, setShowModal] = useState(false);

  const handleShowModal = (promo) => {
    setSelectedPromo(promo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


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
    <>
      <div className="cardWrapper">
        <section className="r-wrapper">
          <div className="paddings innerWidth r-container">
            <div className="r-Head flexColStart">
              <span className="judulCard"></span>
              <br />
              <span className="textCard">Cek Promo Yang Tersedia Yuk</span>
            </div>

            <Swiper {...sliderSettings}>
            <SliderButtons/>
            {promos.slice(0, 10).map((promo) => {
              return (
                <SwiperSlide key={promo.id}>
                <div className="coverPromoCards" key={promo.id}>
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src={promo.imageUrl} alt="" />
                        <p className="title">{promo.title}</p>
                      </div>
                      <div className="flip-card-back ">
                        <p>{promo.description}</p>

                        <div className="d-flex justify-content-center">
                          <button
                            className="learn-more"
                            onClick={() => handleShowModal(promo)}
                          >
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
                </SwiperSlide>
              );
            })}
             </Swiper>
          </div>
        </section>
      </div>
    

      {/* MODAL SEE DETAILS */}
      <Modal show={modal} onHide={handleCloseModal} animation={true}>
        {selectedPromo && (
          <Modal.Body>
            <h5>Get the Discount of Rp.{selectedPromo.promo_discount_price}</h5>
            <p>
              When You Claim a Minimum Price of Rp.
              {selectedPromo.minimum_claim_price}
            </p>
            <h5>Terms Condition:</h5>
            <p>{selectedPromo.terms_condition}</p>
            <h4 className="promoCodeCard">Use the promo code now</h4>

            <p className="promoCodeCard">"{selectedPromo.promo_code}"</p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Promo;
const SliderButtons = () => {
  const swiper = useSwiper();
 
  return (
    <div className="flexCenter r-buttons">
      <button  onClick={() => swiper.slidePrev()}>&lt;</button>
      <button  onClick={() => swiper.slideNext()}> &gt;</button>
    </div>
  )
 }