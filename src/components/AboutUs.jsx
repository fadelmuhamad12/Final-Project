import React from "react";
import airplane from "../assets/airplane.jpg"

const AboutUs = () => {
  return (
    <div>
      <section className="about">
        <div className="main">
          <img src={airplane} alt="" style={{width: "100px"}}/>
          <div className="about-text">
            <h1>About Us</h1>
            <h5>Go<span>.Travel</span></h5>
            <p>
              Welcome to Go.Travel! We are an online platform that aims to
              provide you with the best travel experiences possible. We believe
              that every trip should be a valuable investment in your personal
              growth and well-being. At Go.Travel, we are committed to
              delivering high-quality travel services that exceed your
              expectations. We work with reputable travel partners around the
              world to curate unique and authentic travel experiences that suit
              your interests and preferences. Our team of experienced travel
              professionals is dedicated to helping you plan and book your dream
              vacation with ease and confidence. From finding the best flight
              deals to selecting the perfect accommodations, we take care of all
              the details so you can focus on making unforgettable memories. At
              Go.Travel, we value your trust and satisfaction above all else.
              That's why we always strive to provide you with exceptional
              customer service and support, no matter where your travels take
              you. We believe that travel is not just a journey, but a
              life-changing adventure, and we are honored to be a part of your
              travel story.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
