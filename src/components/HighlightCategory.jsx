import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axiosInstance from "../api/axios";

const HighlightCategory = () => {
  const key = "24405e01-fbc1-45a5-9f5a-be13afcd757c"
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [id, setId] = useState("");



  const fetchCategoryId = async (id) => {
    try{
      const categoryId = await axiosInstance.get(`/category/${id}`, {
        headers: {
          apiKey: key
        }
      })
      const idCategories = categoryId.data.data.id;
      const imgCategories = categoryId.data.data.imageUrl;
      const nameCategories = categoryId.data.data.name;

      setId = (categoryId.data.data);
      setImgUrl = (imgCategories);
      setName = (nameCategories)


    }catch (error) {
      console.log(error);
    }
  }


    useEffect (()=> {
      fetchCategoryId();
    }, [])



  return (
     <>
    <div className="fullCoverHighlight">
      <div className="CoverHighlight">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2022/10/26/0ed8360a-d4ec-4d2d-8f68-180e5d0d9165-1666795976680-6a7f9f0240f20f4a160c154cfc3943b2.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Disneyland</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2022/04/hkdlioa267497381.jpeg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="https://lajollamom.com/wp-content/uploads/2011/05/hong-kong-disneyland-characters.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
    </>
  );
};

export default HighlightCategory;
