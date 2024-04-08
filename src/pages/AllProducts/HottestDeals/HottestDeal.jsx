import React from "react";
import Heading from "../../../components/ui/Heading/Heading";
import ProductCard from "../../../components/ProductCard/ProductCard";

const HottestDeal = () => {
  return (
    <div className="hottest-deals">
      <Heading>Hottest Deals</Heading>

      <div className="product-container">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <ProductCard
            key={index}
            isOnSale={[1, 4, 7].indexOf(index + 1) !== -1 ? true : false}
            oldPrice={30}
          />
        ))}
      </div>
    </div>
  );
};

export default HottestDeal;
