import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Form, Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import NavigationBar from "../components/NavigationBar";
import Table from 'react-bootstrap/Table';


import Modal from "react-bootstrap/Modal";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [id, setId] = useState("");

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
      setCategories(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchCategoriesById = async (id) => {
    const categoryById = await axiosInstance.get (`/category/${id}`, {
      headers: {
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      }
    })
    setId(categoryById.data.data.id);
    setName(categoryById.data.data.name);
    setImageUrl(categoryById.data.data.imageUrl);

    handleModalShow();
   
  }

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
            setCategories(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
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
        alert("category updated");
        window.location.reload();
        fetchCategories();
      })
      .catch((error) => {
        console.log(error, "failed");
      });
  };


  useEffect(() => {
    fetchCategories();
    // const storedData = localStorage.getItem("datas");
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   setName(parsedData.name);
    //   setId(parsedData.id);
    //   setImageUrl(parsedData.imageUrl);
    // }
  }, []);

  return (
    <>
  
      <div className="coverCategoriesAdmin">
      <Table striped bordered hover>
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
                    <button onClick={() => fetchCategoriesById(category.id)}>Edit</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
            </Table>
      </div>

        

        {/* CREATE MODAL */}
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


      {/* Modal Update */}
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
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                  />
                  <label htmlFor="imageUrl">Img Url</label>
                </div>
                <button type="submit" >Submit</button>
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
