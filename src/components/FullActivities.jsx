import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import NavigationBar from "./NavigationBar";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
} from "react-bootstrap";

const FullActivities = () => {
  const [activities, setActivities] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAct, setSelectedAct] = useState([]);

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
      <NavigationBar />
      <Container>
        <Row>
          <h1>Cek Semua Aktivitas yang lagi ramai Disini!</h1>
          {activities.map((activity) => {
            return (
              <Col
                xs={6}
                s={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="justify-content-center text-align-center d-flex mt-3 "
                key={activity.id}
              >
                <Card
                  className="text-center cards"
                  onClick={() => showModal(activity)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="listcard">
                    <Image
                      src={activity.imageUrls}
                      alt="Obx"
                      className="rounded"
                      style={{ width: "100%" }}
                    />
                    <div>
                      <Card.Title> {activity.title}</Card.Title>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

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

export default FullActivities;
