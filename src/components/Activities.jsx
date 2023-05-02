import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      // const createActivities = await axiosInstance.post("/create-activity", {
      //     headers: {
      //         apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
      //         Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`
      //     }
      // });
      // console.log(createActivities);
      const activities = await axiosInstance.get("/activities", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(activities.data.data);
      setActivities(activities.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="fullCoverPromo d-flex">
      <h3 className="activitiesText">Rekomendasi Tempat <br/> Untukmu</h3>
      {activities.slice(0, 2).map((activity) => {
        return (
         
            <Col key={activity.id}>
             <div className="coveraActivitiesCards">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={activity.imageUrls} />
                <Card.Body>
                  <Card.Title>{activity.title}</Card.Title>
                  <p>Rating {activity.rating}</p>
                </Card.Body>
                <Card.Footer>
                  <h4>Rp.{activity.price}</h4>
                </Card.Footer>
              </Card>
              </div>
            </Col>
          
        );
      })}
    </div>
  );
};

export default Activities;
