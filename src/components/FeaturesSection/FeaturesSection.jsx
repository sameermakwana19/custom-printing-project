import React from "react";
import DividerLine from "../ui/DividerLine/DividerLine";
import ProductCard from "../ProductCard/ProductCard";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";

const fetauresProductDetails = [
  {
    id: crypto.randomUUID(),
    imageUrl: product1,
    category: "Mugs",
    name: "Black Printed Coffee Mug",
    rating: 2,
    price: 17.0,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: product2,
    category: "Mugs",
    name: "Father's Coffee Mug",
    rating: 4,
    price: 19.0,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: product3,
    category: "Mugs",
    name: "Personalised Mug",
    rating: 3,
    price: 15.0,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: product4,
    category: "Mugs",
    name: "Valentine's Day Special Mug",
    rating: 1,
    price: 25.0,
  },
];

const FeaturesSection = () => {
  return (
    <div className="features-section-container">
      <p className="features__heading">Our Featured Products</p>

      <DividerLine />
      <div className="features__products-container">
        {fetauresProductDetails.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {/* <ProductCard key={crypto.randomUUID()} />
        <ProductCard key={crypto.randomUUID()} />
        <ProductCard key={crypto.randomUUID()} /> */}
      </div>
    </div>
  );
};

export default FeaturesSection;
