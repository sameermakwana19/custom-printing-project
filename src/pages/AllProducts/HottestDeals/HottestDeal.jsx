import React from "react";
import Heading from "../../../components/ui/Heading/Heading";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { query } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { getAllHottestDealsFromFirestore } from "../../../queries/getAllProducts";
import { Link, useLocation } from "react-router-dom";
import useCurrentLocation from "../../../hooks/useCurrentLocation";

const HottestDeal = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hottest-deals"],
    queryFn: getAllHottestDealsFromFirestore,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="hottest-deals">
      <Heading>Hottest Deals</Heading>

      <div className="product-container">
        {data?.map((product, index) => (
          <Link
            to={`/${product.category.toLowerCase()}/${product.id}`}
            key={index}
          >
            <ProductCard
              {...product}
              isOnSale={[1, 4, 7].indexOf(index + 1) !== -1 ? true : false}
              oldPrice={30}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HottestDeal;
