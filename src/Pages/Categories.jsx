import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url
import { Card, Col, Image, Form, Button, Container } from "react-bootstrap";
import NextArrow from "../components/NextArrow";
import PrevArrow from "../components/PrevArrow";

const Categories = () => {
  const [categories, setCategoies] = useState([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 936,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="destination">
        <h1>Rekomendasi Tempat Untukmu (Kategori)</h1>
        <p className="text-white">a</p>
        {categories.slice(14,15).map((category) => {
          return (
            <div className="first-desc" key={category.id}>
              <div className="desc-text">
                <h2>{category.name}</h2>
                <p>
                  Experience the breathtaking beauty of the Swiss Alps! Nestled
                  in the heart of Europe, this stunning mountain range boasts
                  snow-capped peaks, lush green valleys, and crystal-clear
                  lakes. Whether you're seeking adventure or relaxation, there's
                  something for everyone in the Swiss Alps. Take a cable car up
                  to the top of the mountains and be awed by the panoramic views
                  of the surrounding landscape. Hike along the winding trails
                  and discover hidden waterfalls and meadows dotted with
                  wildflowers. Ski down powdery slopes or go snowshoeing through
                  the silent forests. And after a day of outdoor activities,
                  unwind in a cozy chalet and savor the local cuisine. But the
                  Swiss Alps offer more than just natural beauty. Immerse
                  yourself in the local culture by visiting charming Alpine
                  villages, attending traditional festivals, or exploring
                  historic castles and museums. And don't forget to indulge in
                  Swiss chocolate, cheese, and wine! With its majestic scenery
                  and endless activities, the Swiss Alps are a must-visit
                  destination. Book your trip now and discover the magic of this
                  alpine wonderland.
                </p>
              </div>
              <div className="image">
                <img src={category.imageUrl} alt="" />
                <img src={category.imageUrl} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
