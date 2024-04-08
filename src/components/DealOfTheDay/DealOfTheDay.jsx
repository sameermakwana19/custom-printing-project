import React from "react";
import fixedBackground from "../../assets/full-bg-photo.jpg";
import Banner from "../Banner/Banner";

const DealOfTheDay = () => {
  return (
    <div className="deal-of-the-day-container">
      <Banner
        style={{ padding: "14rem 8rem" }}
        background={fixedBackground}
        tagline={"Hurry Up!"}
        heading={`Deal of the Day!`}
        subHeading={"Buy This T-shirt At 20% Discount, Use Code Off20"}
        buttonText={"shop now"}
        isDividerLineRequire={false}
      />
    </div>
  );
};

export default DealOfTheDay;
