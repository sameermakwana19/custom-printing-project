import React, { useState } from "react";
import ReviewSection from "./ReviewSection/ReviewSection";

const ProductReviewAndDescription = () => {
  const [currentSection, setCurrentSection] = useState("description");

  const handleSectionChange = (value) => {
    setCurrentSection(value);
  };

  return (
    <div className="product-review-and-description">
      <div className="product-review-and-description__header">
        <p
          className={`description-label ${
            currentSection === "description" ? "active-label" : ""
          }`}
          onClick={() => handleSectionChange("description")}
        >
          Description
        </p>
        <p
          className={`review-label ${
            currentSection === "review" ? "active-label" : ""
          }`}
          onClick={() => handleSectionChange("review")}
        >
          Review <span className="no-of-reviews">({0})</span>
        </p>
      </div>

      <div className="product-review-and-description__body">
        {currentSection === "description" ? (
          <p className="descrition-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
            incidunt impedit tempora sit et, doloribus amet aspernatur illo
            facere inventore!
          </p>
        ) : (
          <ReviewSection />
        )}
      </div>
    </div>
  );
};

export default ProductReviewAndDescription;
