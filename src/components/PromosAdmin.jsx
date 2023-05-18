import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import { Card, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import Modal from "react-bootstrap/Modal";
import axios from "axios";


const PromosAdmin = () => {
  const apiKeys = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const [promos, setPromos] = useState([]);
  const [modal, setModal] = useState(false);  // <== BIKIN USE STATE UNTUK MODALNYA
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [terms_condition, setTermsCondition] = useState("");
  const [promo_code, setPromoCode] = useState("");
  const [promo_discount_price, setPromoDiscountPrice] = useState("");
  const [minimum_claim_price, setMinimumClaimPrice] = useState("")

  const fetchPromo = async () => {
    const promos = await axiosInstance.get("/promos", {
      headers: {
        apiKey: apiKeys,
      },
    });
    console.log(promos.data.data);
    setPromos(promos.data.data);
  };

  const fetchPromosById = async(id) => {
    const promoById = await axiosInstance.get(`/promo/${id}`, {
      headers: {
        apiKey: apiKeys,
      }
    })
    setId(promoById.data.data.id)
    setTitle(promoById.data.data.title);
    setDescription(promoById.data.data.description);
    setImageUrl(promoById.data.data.imageUrl);
    setTermsCondition(promoById.data.data.terms_condition);
    setPromoCode(promoById.data.data.promo_code);
    setPromoDiscountPrice(promoById.data.data.promo_discount_price);
    setMinimumClaimPrice(promoById.data.data.promo_discount_price);

    handleModalShow();
  }


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
      promo_discount_price: Yup.number().nullable().required(),
      minimum_claim_price: Yup.number().nullable().required(),
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


  const handleUpdate = (e) => {
    e.preventDefault();
    axiosInstance.post(`update-promo/${id}`, {
      title,
      description,
      imageUrl,
      terms_condition,
      promo_code,
      promo_discount_price: parseInt(promo_discount_price),
      minimum_claim_price: parseInt(minimum_claim_price),
    }, {
      headers: {
        apiKey: apiKeys,
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k"}`,
      }
    }).then(() => {
      alert("Update Success");
      window.location.reload();
      fetchPromo();
    }).catch((error) => {
      console.log(error);
    })
  }

  const handleModalShow = () => {  //INI BUAT MODAL AGAR MUNCUL
    setModal(true);                //INI BUAT MODAL AGAR MUNCUL
  }                                //INI BUAT MODAL AGAR MUNCUL

  const handleModalClose = () => {       //INI BUAT MODAL close           
    setModal(false);                    
  }

  useEffect(() => {
    fetchPromo();
  }, []);

  return (
    <>
    {/* TABEL */}
      <div>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image Url</th>
              <th>Terms Condition</th>
              <th>Discount Price</th>
              <th>Minimum Claim Price</th>
              <th>Promo Code</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          {promos.slice(0,10).map((promo) => {
            return (
              <tbody key={promo.id}>
                <tr>
                  <td>{promo.id}</td>
                  <td>{promo.title}</td>
                  <td>{promo.description}</td>
                  <td>
                    <img src={promo.imageUrl} style={{ width: "100px" }} />
                  </td>
                  <td>{promo.terms_condition}</td>
                  <td>{promo.promo_discount_price}</td>
                  <td>{promo.minimum_claim_price}</td>
                  <td>{promo.promo_code}</td>
                  <td>
                    <button onClick={()=> fetchPromosById(promo.id)}>Edit</button>
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

      {/* FORM CREATE */}
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


      {/* MODAL EDIT */}
      <Modal
        show={modal}
        onHide={handleModalClose} //<== ini buat manggil button modal close
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div className="cardUpdateCategoriesAdmin">
              <span className="title">Update Promo</span>
              <form className="form" onSubmit={handleUpdate} >

                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  <label htmlFor="title">Title</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  <label htmlFor="description">Description</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                  />
                  <label htmlFor="imageUrl">Image Url</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="terms_condition"
                    name="terms_condition"
                    onChange={(e) => setTermsCondition(e.target.value)}
                    value={terms_condition}
                  />
                  <label htmlFor="terms_condition">Terms Condition</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    type="text"
                    id="promo_code"
                    name="promo_code"
                    onChange={(e) => setPromoCode(e.target.value)}
                    value={promo_code}
                  />
                  <label htmlFor="promo_code">Promo Code</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    type="number"
                    id="promo_discount_price"
                    name="promo_discount_price"
                    onChange={(e) => setPromoDiscountPrice(e.target.value)}
                    value={promo_discount_price}
                  />
                  <label htmlFor="promo_discount_price">Promo Discount Price</label>
                </div>

                <div className="group">
                  <input
                    placeholder=""
                    type="number"
                    id="minimum_claim_price"
                    name="minimum_claim_price"
                    onChange={(e) => setMinimumClaimPrice(e.target.value)}
                    value={minimum_claim_price}
                  />
                  <label htmlFor="minimum_claim_price">Minimum Claim Price</label>
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

export default PromosAdmin;
