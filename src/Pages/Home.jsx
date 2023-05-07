
import React from "react";
import Banner from "../Pages/Banner";
import Categories from "../Pages/Categories";
import Higlight from "../Pages/Higlight";
import NavigationBar from "../components/NavigationBar";
import Promo from "../Pages/Promo";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Activities from "../Pages/Activities";




const Home = () => {
  return (
    <>
      <div className="FullBg">
     <NavigationBar />
     <Higlight />
     </div>
     <div >
       <Promo />
       <Categories />
       <Banner/>
       <Activities />
     </div>
     </>
 

  );
};

export default Home;
