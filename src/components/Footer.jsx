import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3 className="text-white">
          GO.<span style={{ color: "#27408b" }}>Travel</span>
        </h3>
        <p>
          We are an online platform that aims to provide you with the best
          travel experiences possible. We believe that every trip should be a
          valuable investment in your personal growth and well-being. <br />{" "}
          Designed by Fadel
        </p>
        <div className="socials" id="medsos">
          {/* <p id="hit">Hit Me Up</p> */}
        </div>
        <div className="footer-bottom">
          <p>copyright ©2023 F2k. Dibimbing.id</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
