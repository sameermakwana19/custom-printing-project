import React from "react";
import photo from "../../../assets/popular-1.jpg";

const PopularSectionCard = ({ imageUrl, subHeading, heading }) => {
  return (
    <div className="popular-card">
      <div className="popular__image-container">
        <img src={imageUrl} alt="popular product photo" />
      </div>
      <p className="popular__sub-heading">{subHeading}</p>
      <p className="popular__heading">{heading}</p>
    </div>
  );
};

export default PopularSectionCard;
