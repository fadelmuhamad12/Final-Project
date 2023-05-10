import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ActivityAdmin = () => {
  const [activities, setActivities] = useState([]);

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
      locations_maps: "",
    },
    validationSchema: Yup.object({
      price_discount: Yup.number().integer().required(),
      price: Yup.number().integer().required(),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-activity",
          {
            categoryId: values.categoryId,
            title: values.title,
            description: values.description,
            imageUrls: values.imageUrls,
            price: values.price, 
            price_discount: values.price_discount,
            rating: values.rating,
            total_reviews: values.total_reviews,
            facilities: values.facilities,
            address: values.address,
            province: values.province,
            city: values.city,
            locations_maps: values.locations_maps,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then(() => {
          fetchActivities();
        });
    },
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <>
      {/* TABEL */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>ImageUrls</th>
            <th>Price</th>
            <th>Price Discount</th>
            <th>Rating</th>
            <th>Total Review</th>
            <th>Facilities</th>
            <th>Address</th>
            <th>Province</th>
            <th>City</th>
            <th>Location Maps</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        {activities.slice(0, 2).map((activity) => {
          return (
            <tbody key={activity.id}>
              <tr>
                <td>{activity.id}</td>
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>
                  <img
                    src={activity.imageUrls}
                    alt={activity.title}
                    style={{ width: "150px" }}
                  />
                </td>
                <td>{activity.price}</td>
                <td>{activity.price_discount}</td>
                <td>{activity.rating}</td>
                <td>{activity.reviews}</td>
                <td>{activity.facilities}</td>
                <td>{activity.address}</td>
                <td>{activity.province}</td>
                <td>{activity.city}</td>
                <td>{activity.locations_maps}</td>
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

      {/* FORM CREATE*/}
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
              name="title"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <label htmlFor="title">title</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="description"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <label htmlFor="description">description</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="imageUrls"
              id="imageUrls"
              onChange={formik.handleChange}
              value={formik.values.imageUrls}
              
            />
            <label htmlFor="imageUrls">imageUrls</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              name="price"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <label htmlFor="price">price</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="price_discount"
              id="price_discount"
              onChange={formik.handleChange}
              value={formik.values.price_discount}
            />
            <label htmlFor="price_discount">price_discount</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="rating"
              id="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
            <label htmlFor="rating">rating</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="total_reviews"
              id="total_reviews"
              onChange={formik.handleChange}
              value={formik.values.total_reviews}
            />
            <label htmlFor="total_reviews">total_reviews</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="facilities"
              id="facilities"
              onChange={formik.handleChange}
              value={formik.values.facilities}
            />
            <label htmlFor="facilities">facilities</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="address"
              id="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <label htmlFor="address">address</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="province"
              id="province"
              onChange={formik.handleChange}
              value={formik.values.province}
            />
            <label htmlFor="province">province</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="city"
              id="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            <label htmlFor="city">city</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              name="location_maps"
              id="location_maps"
              onChange={formik.handleChange}
              value={formik.values.locations_maps}
            />
            <label htmlFor="location_maps">location_maps</label>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default ActivityAdmin;
