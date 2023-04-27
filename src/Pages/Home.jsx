import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Higlight from "../components/Higlight";
import Navigationbar from "../components/NavigationBar";
import Promo from "../components/Promo";

const Home = () => {
  return (
    <>
      <div className="FullBg">
     <Navigationbar />
     <Higlight />
     </div>
     <div>
       <Promo />
       <Banner/>
       <Categories />
     </div>
     </>
 

  );
};

export default Home;
