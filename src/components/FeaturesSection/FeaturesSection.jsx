import React from "react";
import DividerLine from "../ui/DividerLine/DividerLine";
import ProductCard from "../ProductCard/ProductCard";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";
import product4 from "../../assets/product4.jpg";
import { getAllMugsFromFirestore } from "../../queries/getAllProducts";
import NotFound from "../../pages/NotFound/NotFound";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mugs"],
    queryFn: getAllMugsFromFirestore,
  });

  if (isError) {
    return <NotFound />;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="features-section-container">
      <p className="features__heading">Our Featured Products</p>

      <DividerLine />
      <div className="features__products-container">
        {data.slice(0, 4).map((product) => (
          <Link
            to={`/${product.category.toLowerCase()}/${product.id}`}
            key={product.id}
          >
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
