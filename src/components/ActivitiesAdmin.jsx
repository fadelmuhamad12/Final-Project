import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Card from "react-bootstrap/Card";
import { Col, Button } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const ActivitiesAdmin = () => {
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
      imageUrls: [""],
      price: 0,
      price_discount: 0,
      rating: 0,
      total_reviews: 0,
      facilities: "",
      address: "",
      province: "",
      city: "",
      location_maps: "",
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      imageUrls: Yup.string().required(),
      price: Yup.string().required(),
      price_discount: Yup.string().required(),
      rating: Yup.string().required(),
      total_reviews: Yup.string().required(),
      facilities: Yup.string().required(),
      address: Yup.string().required(),
      province: Yup.string().required(),
      city: Yup.string().required(),
      location_maps: Yup.string().required(),
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
            location_maps: values.location_maps,
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



  useEffect(() => {
    fetchActivities();
  }, []);

  return (
      <>
    <div className="coverCategoriesAdmin mt-5">
        <table width={1000}>
            <thead>
                <tr>
                    <th>Category Id</th>
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
                </tr>
            </thead>
            {activities.map((activity) => {
                return (
                    <tbody key={activity.id}>
                        <tr>
                            <td>{activity.id}</td>
                            <td>{activity.title}</td>
                            <td>"......"</td>
                            <td>imageUrls</td>
                            <td><img src={activity.imageUrls[1]} style={{width: "100px"}}/></td>
                            <td>{activity.price}</td>
                            <td>{activity.price_discount}</td>
                            <td>{activity.rating}</td>
                            <td>{activity.total_reviews}</td>
                            <td>{activity.facilities}</td>
                            <td>{activity.address}</td>
                            <td>{activity.province}</td>
                            <td>{activity.city}</td>
                            <td>....</td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
        {/* FORM ADD */}
        <div className="cardUpdateCategoriesAdmin">
        <span className="title">Create Activities</span>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="group">
            <input
              placeholder=""
              type="text"
              name="categoryId"
              id="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
            />
            <label htmlFor="name">Category Id</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">title</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">description</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="imageUrls"
              name="imageUrls"
              value={formik.values.imageUrls}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">Img Url</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">price</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="number"
              id="price_discount"
              name="price_discount"
              value={formik.values.price_discount}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">price_discount</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="rating"
              name="rating"
              value={formik.values.rating}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">rating</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="number"
              id="total_reviews"
              name="total_reviews"
              value={formik.values.total_reviews}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">total_reviews</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="facilities"
              name="facilities"
              value={formik.values.facilities}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">facilities</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">address</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="province"
              name="province"
              value={formik.values.province}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">province</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">city</label>
          </div>
          <div className="group">
            <input
              placeholder=""
              type="text"
              id="location_maps"
              name="location_maps"
              value={formik.values.location_maps}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">location_maps</label>
          </div>

          {/* <button type="submit">Submit</button> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default ActivitiesAdmin;
