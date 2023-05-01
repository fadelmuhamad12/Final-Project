import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style.css'
import Activities from "./components/Activities";
import Banner from "./components/Banner";
import Categories from "./components/Categories";
import Higlight from "./components/Higlight";
import Promo from "./components/Promo";


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

      </Routes>
    </Router>
    </div>
  ) 

  

}

export default App;
