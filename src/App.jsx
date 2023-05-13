import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style.css'
import Activities from "./Pages/Activities";
import Banner from "./Pages/Banner";
import Categories from "./Pages/Categories";
import Higlight from "./Pages/Higlight";
import Promo from "./Pages/Promo";
import Register from "./Pages/Register";
import CategoriesAdmin from "./components/CategoriesAdmin";
import ActivitiesAdmin from "./components/ActivitiesAdmin";
import BannersAdmin from "./components/BannersAdmin";
import PromosAdmin from "./components/PromosAdmin";
import UserAdmin from "./components/UserAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import HighlightCategory from "./components/HighlightCategory";
import ActivityAdmin from "./components/ActivityAdmin";



function App() {
  return (
    <div >
      <Router>
      <Routes>
      <Route exact path='/' Component={Register}></Route>
        <Route exact path='/home' Component={Home}></Route>
        <Route exact path='/Activities' Component={Activities}></Route>
        <Route exact path='/Banner' Component={Banner}></Route>
        <Route exact path='/Categories' Component={Categories}></Route>
        <Route exact path='/Higlight' Component={Higlight}></Route>
        <Route exact path='/Promo' Component={Promo}></Route>
        <Route exact path='/Register' Component={Register}></Route>
        <Route exact path='/HighlightCategory' Component={HighlightCategory}></Route>


        {/* PATH ADMIN */}
        <Route exact path='/DashboardAdmin' Component={DashboardAdmin}></Route>
        <Route exact path='/CategoriesAdmin' Component={CategoriesAdmin}></Route>
        <Route exact path='/ActivitiesAdmin' Component={ActivitiesAdmin}></Route>
        <Route exact path='/BannersAdmin' Component={BannersAdmin}></Route>
        <Route exact path='/PromosAdmin' Component={PromosAdmin}></Route>
        <Route exact path='/UserAdmin' Component={UserAdmin}></Route>
        <Route exact path='/ActivityAdmin' Component={ActivityAdmin}></Route>







      </Routes>
    </Router>
    </div>
  ) 

  

}

export default App;
