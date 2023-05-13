import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
        <div className="top"></div>
        <div className="bottom"></div>
        <div>
            <h1>Go.Travel</h1>
            <p>Go.Travel is a Travel Website designed by Fadel</p>
        </div>
        <div>
            <Link to= "">
                <i className="fa-brands fa-facebook-square"></i>
            </Link>
        </div>

      </div>
   
  );
};

export default Footer;
