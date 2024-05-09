import OfferBanner from "./OfferBanner/OfferBanner";
import AboutDetails from "./AboutDetails/AboutDetails";
import OurTeam from "./OurTeam/OurTeam";
import FlexibleBorder from "../../components/ui/FlexibleBorder/FlexibleBorder";
import ServicesProvided from "./ServicesProvided/ServicesProvided";
import Footer from "./Footer/Footer";
import Backdrop from "../../components/ui/Backdrop/Backdrop";

const About = () => {
  return (
    <div className="about">
      <div className="about__banner">
        <Backdrop />
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
      <Footer />
    </div>
  );
};

export default About;
