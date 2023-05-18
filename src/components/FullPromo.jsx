import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

const FullPromo = () => {
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
      console.log(promos.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPromos();
  }, []);
  return (
    <>
    <NavigationBar />
    <Container>
       <Row>
        <h1>Cek Semua Promo yang tersedia Disini!</h1>
        {promos.map((promo) => {
          return (
            <Col
              xs={6}
              s={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className="justify-content-center text-align-center d-flex mt-3 "
              key={promo.id}
           >
              <Card
                className="text-center cards"
                onClick={() => handleShowModal(promo)}
                style={{cursor:"pointer"}}
              >
                <div className="listcard">
                  <Image
                    src={promo.imageUrl}
                    alt="Obx"
                    className="rounded"
                    style={{width:"100%"}}
                  />
                  <div>
                    <Card.Title> {promo.title}</Card.Title>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      </Container>




      {/* Modal */}
      <Modal show={modal} onHide={handleCloseModal} animation={false}>
        {selectedPromo && (
          <Modal.Body>
            <div className="cardContents">
              <h3>{selectedPromo.title}</h3>
              <img
                className="rounded"
                src={selectedPromo.imageUrl}
                alt=""
                style={{ width: "250px" }}
              />
              <p>"{selectedPromo.description}"</p>
              <h5>Promo Discount Price: Rp.{selectedPromo.promo_discount_price}</h5>
              <span>Minimum Claim Price: Rp.{selectedPromo.minimum_claim_price}</span>
              <h6>Promo Code: "{selectedPromo.promo_code}"</h6>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FullPromo
