import React, { Component } from "react";
import Slider from "react-slick";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black", borderRadius: "20px" }}
      onClick={onClick}
    />
  );
}

export default PrevArrow;
