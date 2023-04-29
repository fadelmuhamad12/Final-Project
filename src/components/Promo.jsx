import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios"; // <== Untuk Manggil Base Url

const Promo = () => {
  const [promos, setPromos] = useState([]);
  
  const fetchPromos = async () => {
    try {
      const promos = await axiosInstance.get("/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      setPromos(promos.data.data);
      console.log(promos.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPromos();
  }, []);

  return (
    <div>
      <h1>Promo</h1>
      {/* {promos.map((promo) => {
        return (
          <div key={promo.id}>
            <h1>{promo.title}</h1>
            <p>{promo.description}</p>
            <img src={promo.imageUrl} alt="" />
          </div>
        );
      })} */}
    </div>
  );
};

export default Promo;
