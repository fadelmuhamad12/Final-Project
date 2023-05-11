import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';

const BannersAdmin = () => {
  const key = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [banners, setBanners] = useState([]);
  const [modal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");

  const showModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchBanners = async () => {
    try {
      const banners = await axiosInstance.get("/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(banners.data.data);
      setBanners(banners.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
    },
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-banner",
          {
            name: values.name,
            imageUrl: values.imageUrl,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then(() => {
          fetchBanners();
        });
    },
  });

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/delete-banner/${id}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      })
      .then(() => {
        axiosInstance
          .get("/banners", {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          })
          .then((response) => {
            setBanners(response.data.data);
          });
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        `/update-banner/${id}`,
        {
          name,
          imageUrl,
        },
        {
          headers: {
            apiKey: key,
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
          },
        }
      )
      .then(() => {
        alert("category updated");
        window.location.reload();
        fetchBanners();
      })
      .catch((error) => {
        console.log(error, "Update Failed");
      });
  };

  const fetchBannerById = async (id) => {
    const bannerById = await axiosInstance.get(`banner/${id}`, {
      headers: {
        apiKey: key,
      },
    });
    setId(bannerById.data.data.id);
    setImageUrl(bannerById.data.data.imageUrl);
    setName(bannerById.data.data.name);

    showModal();
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <>
      <div className="coverCategoriesAdmin mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Banner Id</th>
              <th>Banner Image</th>
              <th>Banner Name</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          {banners.slice(1,20).map((banner)=> {
            return (
              <tbody key={banner.id}>
            <tr>
              <td>{banner.id}</td>
              <td><img src={banner.imageUrl}  style={{ width: "100px" }} /></td>
              <td>{banner.name}</td>
              <td><button onClick={() => fetchBannerById(banner.id)}>Edit</button></td>
              <td><button onClick={() => handleDelete(banner.id)}>Delete</button></td>

            </tr>
          </tbody>

            )
          })}
        
        </Table>
  
      </div>

      {/* FORM UNTUK CREATE */}
      <div className="cardUpdateCategoriesAdmin">
        <span className="title">Create Banner</span>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="group">
            <input
              placeholder=""
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label htmlFor="name">Nama Kategori</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={formik.handleChange}
              value={formik.values.imageUrl}
            />
            <label htmlFor="imageUrl">Img Url</label>
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
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="cardUpdateCategoriesAdmin">
            <span className="title">Update Banner</span>

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
              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BannersAdmin;
