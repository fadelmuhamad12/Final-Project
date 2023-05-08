import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import { Card, Form, Button } from "react-bootstrap";
import * as Yup from "yup";

const PromosAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [promos, setPromos] = useState([]);

  const fetchPromo = async () => {
    const promos = await axiosInstance.get("/promos", {
      headers: {
        apiKey: apiKeys,
      },
    });
    console.log(promos.data.data);
    setPromos(promos.data.data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_discount_price: "",
      minimum_claim_price: "",
      promo_code: "",
    },
    validationSchema: Yup.object({
      promo_discount_price: Yup.string().required(),
    }),

    onSubmit: (values) => {
      axiosInstance
        .post(
          "/create-promo",
          {
            title: values.title,
            description: values.description,
            imageUrl: values.imageUrl,
            terms_condition: values.terms_condition,
            promo_code: values.promo_code,
            promo_discount_price: values.promo_discount_price,
            minimum_claim_price: values.minimum_claim_price,
          },
          {
            headers: {
              apiKey: apiKeys,
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
            },
          }
        )
        .then(() => {
          fetchPromo();
        });
    },
  });

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/delete-promo/${id}`, {
        headers: {
          apiKey: apiKeys,
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
        },
      })
      .then(() => {
        axiosInstance
          .get("/promos", {
            headers: {
              apiKey: apiKeys,
            },
          })
          .then((response) => {
            setPromos(response.data.data);
          });
      });
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return (
    <>
      <div>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image Url</th>
              <th>Discount Price</th>
              <th>Minimum Claim Price</th>
              <th>Promo Code</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          {promos.slice(15,17).map((promo) => {
            return (
              <tbody key={promo.id}>
                <tr>
                  <td>{promo.id}</td>
                  <td>{promo.title}</td>
                  <td>{promo.description}</td>
                  <td>
                    <img src={promo.imageUrl} style={{ width: "100px" }} />
                  </td>
                  <td>{promo.promo_discount_price}</td>
                  <td>{promo.minimum_claim_price}</td>
                  <td>{promo.promo_code}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(promo.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

      {/* FORM CRETE */}
      <div className="cardUpdateCategoriesAdmin">
        <span className="title">Create Banner</span>
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="group">
            <input
              placeholder=""
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <label htmlFor="title">Nama Promo</label>
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
            <label htmlFor="imageUrl">Desc</label>
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

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="terms_condition"
              name="terms_condition"
              onChange={formik.handleChange}
              value={formik.values.terms_condition}
            />
            <label htmlFor="terms_condition">terms_condition</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="text"
              id="promo_code"
              name="promo_code"
              onChange={formik.handleChange}
              value={formik.values.promo_code}
            />
            <label htmlFor="promo_code">promo_code</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              id="promo_discount_price"
              name="promo_discount_price"
              onChange={formik.handleChange}
              value={formik.values.promo_discount_price}
            />
            <label htmlFor=" promo_discount_price">promo_discount_price</label>
          </div>

          <div className="group">
            <input
              placeholder=""
              type="number"
              id="minimum_claim_price"
              name="minimum_claim_price"
              onChange={formik.handleChange}
              value={formik.values.minimum_claim_price}
            />
            <label htmlFor="minimum_claim_price">minimum_claim_price</label>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default PromosAdmin;
