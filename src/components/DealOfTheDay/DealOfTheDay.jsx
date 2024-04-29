import React, { lazy } from "react";
import fixedBackground from "../../assets/full-bg-photo.jpg";
import Banner from "../Banner/Banner";

import DarkPhoto from "../../assets/full-bg-photo.png";
import { useThemeContext } from "../../context/ThemeContext/ThemeContextProvider";

const DealOfTheDay = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="deal-of-the-day-container">
      <Banner
        background={isDarkMode ? DarkPhoto : fixedBackground}
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
// export default lazy(() => import());
