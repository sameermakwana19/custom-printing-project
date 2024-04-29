import React from "react";

const VARIANTS = ["h1", "h2", "h3", "h4", "h5"];

const Heading = ({ children, variant, ...delegated }) => {
  const Tag = VARIANTS.indexOf(variant) !== -1 ? variant : "p";
  return Tag !== "p" ? (
    <Tag {...delegated}>{children}</Tag>
  ) : (
    <p className="heading">{children}</p>
  );
};

export default Heading;
