import React from "react";

import ProductCart from "../../../components/ProductCard/ProductCard";

const RelatedProducts = () => {
  return (
    <div className="related-products-section">
      <p className="related-products-section__heading">related products</p>

      <div className="related-products__container">
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
      </div>
    </div>
  );
};

export default RelatedProducts;
