import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Higlight from "../components/Higlight";
import Navigationbar from "../components/NavigationBar";
import Promo from "../components/Promo";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Activities from "../components/Activities";


const Home = () => {
  return (
    <>
      <div className="FullBg">
     <Navigationbar />
     <Higlight />
     </div>
     
     <div >
       <Promo />
       <Banner/>
       <Categories />
       <Activities />
     </div>
     </>
 

  );
};

export default Home;
