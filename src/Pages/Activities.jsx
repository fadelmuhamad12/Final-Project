import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { sliderSettings } from "../components/SliderSettings";

const Activities = () => {
  const [activities, setActivities] = useState([]);




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
    <div className="cardWrapper">
      <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
          <div className="r-Head flexColStart">
            <span className="judulCard">Cek Yuk,</span>
            <br/>
            <span className="textCard">Aktivitias Yang Lagi Ramai Nih</span>
          </div>

          <Swiper {...sliderSettings}>
            <SliderButtons/>
            {activities.slice(1, 8).map((activity) => (
              <SwiperSlide key={activity.id}>
                <div className="flexColStart r-card">
                  <img src={activity.imageUrls} />
                  <span className="textCard">{activity.title}</span>
                  <br/>
                  <span className="secondaryText r-price">
                    <span style={{ color: "orange" }}>Rp.</span>
                    <span>{activity.price}</span>
                  </span>
                  <br/>
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
    // <div className="fullCoverActivity d-flex">
    //   <h3 className="activitiesText">Aktivitias Yang lagi Ramai</h3>
    //   {activities.slice(3,5).map((activity) => {
    //     return (
    //         <Col key={activity.id}>
    //          <div className="coveraActivitiesCards">
    //           <Card style={{ width: "20rem"}}>
    //             <Card.Img variant="top" src={activity.imageUrls} />
    //             <Card.Body>
    //               <Card.Title>{activity.title}</Card.Title>
    //               <p>Rating {activity.rating}</p>
    //             </Card.Body>
    //             <Card.Footer>
    //               <h4>Rp.{activity.price}</h4>
    //             </Card.Footer>
    //           </Card>
    //           </div>
    //         </Col>

    //     );
    //   })}
    // </div>
  );
};

export default Activities;

const SliderButtons = () => {
 const swiper = useSwiper();

 return (
   <div className="flexCenter r-buttons">
     <button  onClick={() => swiper.slidePrev()}>&lt;</button>
     <button  onClick={() => swiper.slideNext()}> &gt;</button>
   </div>
 )
}