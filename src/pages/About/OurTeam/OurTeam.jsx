import React from "react";
import Heading from "../../../components/ui/Heading/Heading";
import DividerLine from "../../../components/ui/DividerLine/DividerLine";
import PopularSectionCard from "../../../components/PopularSection/PopularSectionCard/PopularSectionCard";

import photo1 from "../../../assets/team-member-1.jpg";
import photo2 from "../../../assets/team-member-2.jpg";
import photo3 from "../../../assets/team-member-3.jpg";

const OurTeam = () => {
  return (
    <div className="our-team-section">
      <Heading>Meet our creative Team</Heading>
      <DividerLine />

      <div className="card-container">
        <PopularSectionCard imageUrl={photo1} />
        <PopularSectionCard imageUrl={photo2} />
        <PopularSectionCard imageUrl={photo3} />
      </div>
    </div>
  );
};

export default OurTeam;
