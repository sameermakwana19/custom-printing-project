import React from "react";

const VARIANTS = ["h1", "h2", "h3", "h4", "h5"];

const Heading = ({ children, variant }) => {
  const Tag = VARIANTS.indexOf(variant) !== -1 ? variant : "p";
  return <Tag className="heading">{children}</Tag>;
};

export default Heading;
