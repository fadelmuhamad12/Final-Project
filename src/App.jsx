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


function App() {
  return (
    <div >
      <Router>
      <Routes>
        <Route exact path='/' Component={Home}></Route>
        <Route exact path='/Activities' Component={Activities}></Route>
        <Route exact path='/Banner' Component={Banner}></Route>
        <Route exact path='/Categories' Component={Categories}></Route>
        <Route exact path='/Higlight' Component={Higlight}></Route>
        <Route exact path='/Promo' Component={Promo}></Route>
        <Route exact path='/Register' Component={Register}></Route>

        {/* PATH ADMIN */}
        <Route exact path='/CategoriesAdmin' Component={CategoriesAdmin}></Route>
        <Route exact path='/ActivitiesAdmin' Component={ActivitiesAdmin}></Route>



      </Routes>
    </Router>
    </div>
  ) 

  

}

export default App;
