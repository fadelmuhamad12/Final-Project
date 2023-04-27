import React from 'react'
import axios from 'axios'
import axiosInstance from '../api/axios'
import { useEffect, useState  } from 'react'




const Banner = () => {
  const [] = useState([])

  const fetchBanner = async () => {
    try{
        const banners = await axiosInstance.get("/banners", {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
          }
        });

        console.log(banners.data.data);
    }catch(error) {
      console.log(error);

    }
  }


  useEffect(()=> {
    fetchBanner();
  }, [])




  return (
    <div>
      <h1>Banner</h1>
    </div>
  )
}

export default Banner
