import React from "react";
import Button from "../../../components/ui/Button/Button";
import Heading from "../../../components/ui/Heading/Heading";

const OfferBanner = () => {
  return (
    <div className="offer-banner">
      <div className="offer-banner__content">
        <p className="offer-banner__text">
          Get Best Offers On Customized Designs!
        </p>
        <Button variant="transparent">Get started</Button>
      </div>
    </div>
  );
};

export default OfferBanner;
