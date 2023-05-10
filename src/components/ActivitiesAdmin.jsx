import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Col, Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ActivitiesAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [activities, setActivities] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [price, setPrice] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [totalReviews, setTotalReviews] = useState("");
  const [facilities, setFacilities] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [locationMaps, setLocationMaps] = useState("")

  const fetchActivities = async () => {
    try {
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


  const handleUpdate = (e) => {
    e.preventDefault();
    axiosInstance.post(`update-activity/${id}`, {
      categoryId,
      title,
      description,
      imageUrls,
      price,
      priceDiscount,
      rating,
      totalReviews,
      facilities,
      address,
      province,
      city,
      locationMaps,
    }, {
      headers: {
        apiKey: apiKeys,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
      }
    }).then(()=> {
      alert("Update Success");
      window.location.reload();
      fetchActivities();
    }).catch((error)=> {
      console.log(error);
    })
  }

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      title: "",
      description: "",
      imageUrls: "",
      price: "",
      price_discount: "",
      rating: "",
      total_reviews: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
      location_maps: "",
    },
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-activity",
          {
            categoryId: values.categoryId,
            title: values.title,
            description: values.description,
            imageUrls: values.imageUrls,
            price: values.imageUrls,
            price_discount: price_discount,
            rating: values.rating,
            total_reviews: values.total_reviews,
            facilities: values.facilities,
            address: values.address,
            province: values.province,
            city: values.city,
            location_maps: values.location_maps,
          },
          {
            headers: {
              apiKey: apiKeys,
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then(() => {
          fetchActivities();
        });
    },
  });


  const fetchActivityById = async (id) => {
    const activityById = await axiosInstance.get(`acitivy/${id}`,{
      headers: {
        apiKey: apiKeys,
      }
    })
    setId(activityById.data.data.categoryId);
    setTitle(activityById.data.data.title);
    setDescription(categoryId.data.data.description);
    setImageUrls(categoryId.data.data.imageUrls);
    setPrice(categoryId.data.data.price);
    setPriceDiscount(categoryId.data.data.price_discount);
    setRating(categoryId.data.data.rating);
    setTotalReviews(categoryId.data.data.total_reviews);
    setFacilities(categoryId.data.data.facilities);
    setAddress(categoryId.data.data.address);
    setProvince(categoryId.data.data.province);
    setCity(categoryId.data.data.city);
    setLocationMaps(categoryId.data.data.location_maps);

    showModal();
  }

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      {/* TABEL */}
      <div className="coverCategoriesAdmin mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>categoryId</th>
              <th>title</th>
              <th>description</th>
              <th>imageUrls</th>
              <th>price</th>
              <th>price_discount</th>
              <th>rating</th>
              <th>total_reviews</th>
              <th>facilities</th>
              <th>address</th>
              <th>province</th>
              <th>city</th>
              <th>location_maps</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          {activities.map((activity) => {
            return (
              <tbody key={activity.id}>
                <tr>
                  <td>{activity.id}</td>
                  <td>{activity.title}</td>
                  <td>{activity.description}</td>
                  <td>
                    <img src={activity.imageUrls} style={{ width: "50px" }} />
                  </td>
                  <td>{activity.price}</td>
                  <td>{activity.price_discount}</td>
                  <td>{activity.rating}</td>
                  <td>{activity.total_reviews}</td>
                  <td>{activity.facilities}</td>
                  <td>{activity.address}</td>
                  <td>{activity.province}</td>
                  <td>{activity.city}</td>
                  <td>maps</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

      {/* CREATE FORM */}
      <div className="cardUpdateCategoriesAdmin">
        <span className="title">Create Activity</span>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="group">
            <input
              placeholder=""
              type="text"
              name="categoryId"
              id="categoryId"
              onChange={formik.handleChange}
              value={formik.values.categoryId}
            />
            <label htmlFor="categoryId">Category Id</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <label htmlFor="description">Img Url</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="imageUrls"
              name="imageUrls"
              onChange={formik.handleChange}
              value={formik.values.imageUrls}
            />
            <label htmlFor="imageUrls">imageUrls</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <label htmlFor="price">price</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              id="price_discount"
              name="price_discount"
              onChange={formik.handleChange}
              value={formik.values.price_discount}
            />
            <label htmlFor=" price_discount">price_discount</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              id="rating"
              name="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
            <label htmlFor="rating">rating</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              id="total_reviews"
              name="total_reviews"
              onChange={formik.handleChange}
              value={formik.values.total_reviews}
            />
            <label htmlFor="total_reviews">total_reviews</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="facilities"
              name="facilities"
              onChange={formik.handleChange}
              value={formik.values.facilities}
            />
            <label htmlFor="facilities">facilities</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <label htmlFor="address">address</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="province"
              name="province"
              onChange={formik.handleChange}
              value={formik.values.province}
            />
            <label htmlFor="province">province</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <label htmlFor="city">city</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="location_maps"
              name="location_maps"
              onChange={formik.handleChange}
              value={formik.values.location_maps}
            />
            <label htmlFor="location_maps">location_maps</label>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>

      {/* MODAL UPDATE */}
      {/* <Modal
        show={modal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="cardUpdateCategoriesAdmin">
            <span className="title">Update Kategori</span>

            <form className="form">
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
      </Modal> */}
    </>
  );
};

export default ActivitiesAdmin;
