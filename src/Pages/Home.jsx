
import React from "react";
import Banner from "../Pages/Banner";
import Categories from "../Pages/Categories";
import Higlight from "../Pages/Higlight";
import NavigationBar from "../components/NavigationBar";
import Promo from "../Pages/Promo";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Activities from "../Pages/Activities";
import TesPromo from "./TesPromo";
import TesPromoDua from "./TesPromoDua";
import CardBaru from "./CardBaru";
import CategoryDua from "./CategoryDua";
import Footer from "../components/Footer";




const Home = () => {
  return (
    <>
      <div className="FullBg">
     <NavigationBar />
     <Higlight />
     </div>
     <div >
       <Promo />
       {/* <TesPromo />
       <TesPromoDua /> */}
       <Categories />
       <CategoryDua />
       {/* <Banner/> */}
       <Activities />
       {/* <TesPromo /> */}
       {/* <TesPromoDua /> */}
       {/* <CardBaru /> */}
       <Footer />
     </div>
     </>
 

  );
};

export default Home;
