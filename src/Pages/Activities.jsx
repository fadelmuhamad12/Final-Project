import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Card, Modal, Button } from "react-bootstrap";
import { sliderSettings } from "../components/SliderSettings";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedAct, setSelectedAct] = useState([]);
  const [modal, setModal] = useState(false);


  const showModal = (activity) => {
    setModal(true);
    setSelectedAct(activity);
  };

  const closeModal = () => {
    setModal(false);
  };

  const fetchActivities = async () => {
    try {
      const activities = await axiosInstance.get("/activities", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      // console.log(activities.data.data);
      setActivities(activities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      <div className="cardWrapper">
        <section className="r-wrapper">
          <div className="paddings innerWidth r-container">
            <div className="r-Head flexColStart">
              <span className="judulCard">Cek Yuk,</span>
              <br />
              <span className="textCard">Aktivitias Yang Lagi Ramai Nih</span>
            </div>

            <Swiper {...sliderSettings}>
              <SliderButtons />
              {activities.slice(1, 8).map((activity) => (
                <SwiperSlide key={activity.id}>
                  <div className="flexColStart r-card" onClick={()=> showModal(activity)}>
                    <img src={activity.imageUrls} />
                    <span className="textCard">{activity.title}</span>
                    <br />
                    <span className="secondaryText r-price">
                      <span style={{ color: "orange" }}>Rp.</span>
                      <span>{activity.price}</span>
                    </span>
                    <br />
                    <span className="secondaryText">
                      Rating: {activity.rating}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>

      {/* Modal */}
      <Modal show={modal} onHide={closeModal} animation={false}>
        {selectedAct && (
          <Modal.Body>
            <div className="cardContent">
              <h3>{selectedAct.title}</h3>
              <img
                className="rounded"
                src={selectedAct.imageUrls}
                alt=""
                style={{ width: "250px" }}
              />
              <p>"{selectedAct.description}"</p>
              <h5>Rp.{selectedAct.price}</h5>
              <span>Rating: {selectedAct.rating}</span>
              <h6>Total Review: {selectedAct.total_reviews}</h6>
            </div>
            <p>Location: {selectedAct.address}</p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Activities;

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}> &gt;</button>
    </div>
  );
};
