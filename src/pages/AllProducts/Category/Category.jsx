import React from "react";
import Heading from "../../../components/ui/Heading/Heading";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="category">
      <Heading>Categories</Heading>
      <div className="link-container">
        <div className="link">
          <Link to="/mugs">Mugs</Link>
          <span>(5)</span>
        </div>
        <div className="link">
          <Link to="/tshirts">Tshirts</Link>
          <span>(6)</span>
        </div>
      </div>
    </div>
  );
};

export default Category;
