import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Form, Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import NavigationBar from "../components/NavigationBar";

import Modal from "react-bootstrap/Modal";

const CategoriesAdmin = () => {
  const [categories, setCategoies] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImgUrl] = useState("");

  const handleModalShow = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

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

  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      imageUrl: Yup.string().required(),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-category",
          {
            name: values.name,
            imageUrl: values.imageUrl,
            id: values.id,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then((response) => {
          console.log(response, "berhasil");
          fetchCategories();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const handleDelete = (id) => {
    axiosInstance
      .delete(`delete-category/${id}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      })
      .then(() => {
        axiosInstance
          .get("/categories", {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          })
          .then((response) => {
            setCategoies(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    axiosInstance
      .post(
        `update-category/${id}`,
        {
          name,
          imageUrl,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
          },
        }
      )
      .then(() => {
        fetchCategories();
        localStorage.setItem("datas", JSON.stringify(data));
        alert("category updated");
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error, "failed");
      });
  };

  const editClicked = (categoryId) => {
    setName(category.name);
    setImgUrl(category.imageUrl);
    setId(category.id);
    setModal(true);
  };

  useEffect(() => {
    fetchCategories();
    const storedData = localStorage.getItem("datas");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name);
      setId(parsedData.id);
      setImgUrl(parsedData.imageUrl);
    }
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="coverCategoriesAdmin">
        <table border="1" width={1000}>
          <thead>
            <tr>
              <th>id</th>
              <th>Category</th>
              <th>Image</th>
              <th colSpan={2}>Manage</th>
            </tr>
          </thead>
          {categories.map((category) => {
            return (
              <tbody key={category.id}>
                <tr>
                <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    {" "}
                    <Card.Img
                      src={category.imageUrl}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(category.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={handleModalShow}>Update</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      {/* <div className="fullCategories d-flex justify-content-center mt-5">
        {categories.map((category) => {
          return (
            <div key={category.id} className="coverCategories">
              <Col
                xs={6}
                s={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
                className="justify-content-center text-align-center "
              >
                <Card style={{ width: "50px", margin: "10px" }}>
                  <Card.Img variant="top" src={category.imageUrl} />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          );
        })}
      </div> */}

      <div className="cardUpdateCategoriesAdmin">
        <span className="title">Create Category</span>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="group">
            <input
              placeholder=""
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <label htmlFor="name">Nama Kategori</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">Img Url</label>
          </div>

          {/* <button type="submit">Submit</button> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>

      {/* <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Kategori"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Img Url"
            id="imageUrl"
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> */}

      {/* Modal Edit */}
      <Modal
        show={modal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="cardUpdateCategoriesAdmin">
        
              <span className="title">Update Kategori</span>
              <form className="form" onSubmit={handleUpdate}>
                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                  <label htmlFor="name">id</label>
                </div>
                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label htmlFor="name">Nama Kategori</label>
                </div>
                <div className="group">
                  <input
                    placeholder=""
                    id="imageUrl"
                    name="imageUrl"
                    onChange={(e) => setImgUrl(e.target.value)}
                    value={imageUrl}
                  />
                  <label htmlFor="email">Img Url</label>
                </div>

                <button type="submit" onClick={()=> editClicked(categories.id)}>Submit</button>
              </form>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoriesAdmin;
