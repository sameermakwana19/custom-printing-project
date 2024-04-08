import React from "react";
import PopularSectionCard from "./PopularSectionCard/PopularSectionCard";
import popular1 from "../../assets/popular-1.jpg";
import popular2 from "../../assets/popular-2.jpg";
import popular3 from "../../assets/popular-3.jpg";

const PopularSection = () => {
  return (
    <div className="popular-section">
      <PopularSectionCard
        subHeading="Most Loved Designs"
        heading={"Customize your T-shirt"}
        imageUrl={popular1}
      />
      <PopularSectionCard
        subHeading="Design of the Week"
        heading={"Rubber Print Your T-Shirt"}
        imageUrl={popular2}
      />
      <PopularSectionCard
        subHeading="New T-shirt Edition"
        heading={"Customize Plain Colors"}
        imageUrl={popular3}
      />
    </div>
  );
};

export default PopularSection;
