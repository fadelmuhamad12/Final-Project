import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from '../api/axios' // <== Untuk Manggil Base Url

const Promo = () => {
  // const [promo, setPromo] = useState([]);

  // const fetchPromo = async () => {
  //   try {
  //     const createPromo = await axiosInstance.post("/create-promo", {
  //       /* The headers object should be passed as an argument */
  //     }, {
  //       headers: {
  //         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k'
  //       }
  //     });
  //     console.log(createPromo);
      
  //     /* Wait for the createPromo response before making the get request */
  //     const getPromo = await axiosInstance.get("/promos", {
  //       headers: {
  //         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
  //       }
  //     });
  
  //     console.log(getPromo);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchPromo()
  // }, [])

  return (
    <div>
     <h1>Promo</h1>
    </div>
  );
};

export default Promo;
