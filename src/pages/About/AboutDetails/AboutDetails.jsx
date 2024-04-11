import React from "react";
import BenefitCard from "../BenefitsCard/BenefitCard";

const AboutDetails = () => {
  return (
    <div className="about__details">
      <div className="about__details__left">
        <p className="heading">We Are Your Favourite, Online Store.</p>
        <p className="content">
          Dui habitasse provident eu etiam praesent placeat maiores temporibus,
          accumsan parturient autem, mi animi ipsa. Lobortis maxime quos,
          pellentesq.
        </p>
        <p className="content">
          {" "}
          Ee platea animi commodo tincidunt ridiculus tempora, ornare lorem quam
          sit possimus? Quam cras facilisi officia fusce. Ac, excepteur
          excepteur fusce? Sunt minim expedita magnis!
        </p>
      </div>
      <div className="about__details__right">
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
        <BenefitCard />
      </div>
    </div>
  );
};

export default AboutDetails;
