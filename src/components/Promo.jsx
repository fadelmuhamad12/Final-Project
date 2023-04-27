import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Promo = () => {
  const [promo, setPromo] = useState();

  const showPromo = () => {
    axios.get(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo",
      {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
      }
    ).then(response=> {
        console.log(response);
        setPromo(response.data.title)
    }).catch(error => {
        console.log(error);
    })
  };
  return (
    <div>
     <h1>{promo}</h1>
    </div>
  );
};

export default Promo;
