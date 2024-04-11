import React from "react";
import BenefitCard from "./BenefitsCard/BenefitCard";
import OfferBanner from "./OfferBanner/OfferBanner";
import AboutDetails from "./AboutDetails/AboutDetails";
import OurTeam from "./OurTeam/OurTeam";
import FlexibleBorder from "../../components/ui/FlexibleBorder/FlexibleBorder";
import ServicesProvided from "./ServicesProvided/ServicesProvided";

const About = () => {
  return (
    <div className="about">
      <div className="about__banner">
        <p className="heading">about Us</p>
        <p className="sub-heading">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
          nisi! amet consectetur adipisicing elit.
        </p>
      </div>
      <AboutDetails />
      <OfferBanner />
      <OurTeam />
      <FlexibleBorder />
      <ServicesProvided />
    </div>
  );
};

export default About;

// function AboutDetails({}) {
//   return (
//     <div className="about__details">
//       <div className="about__details__left">
//         <p className="heading">We Are Your Favourite, Online Store.</p>
//         <p className="content">
//           Dui habitasse provident eu etiam praesent placeat maiores temporibus,
//           accumsan parturient autem, mi animi ipsa. Lobortis maxime quos,
//           pellentesq.
//         </p>
//         <p className="content">
//           {" "}
//           Ee platea animi commodo tincidunt ridiculus tempora, ornare lorem quam
//           sit possimus? Quam cras facilisi officia fusce. Ac, excepteur
//           excepteur fusce? Sunt minim expedita magnis!
//         </p>
//       </div>
//       <div className="about__details__right">
//         <BenefitCard />
//         <BenefitCard />
//         <BenefitCard />
//         <BenefitCard />
//       </div>
//     </div>
//   );
// }
