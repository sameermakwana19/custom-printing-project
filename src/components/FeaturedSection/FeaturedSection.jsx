import React from "react";
import Heading from "../ui/Heading/Heading";
import logo1 from "../../assets/logo-1.png";
import logo2 from "../../assets/logo-2.png";
import logo3 from "../../assets/logo-3.png";
import logo4 from "../../assets/logo-4.png";
import logo5 from "../../assets/logo-5.png";

const FeaturedSection = () => {
  return (
    <div className="featured-section">
      <Heading variant={"h4"}>featured in :</Heading>
      <div className="logos-container">
        <div className="logo-image-container">
          <img loading="lazy" src={logo1} alt="logo of company" />
        </div>
        <div className="logo-image-container">
          <img loading="lazy" src={logo2} alt="logo of company" />
        </div>
        <div className="logo-image-container">
          <img loading="lazy" src={logo3} alt="logo of company" />
        </div>
        <div className="logo-image-container">
          <img loading="lazy" src={logo4} alt="logo of company" />
        </div>
        <div className="logo-image-container">
          <img loading="lazy" src={logo5} alt="logo of company" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
