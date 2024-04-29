import React from "react";
import Heading from "../ui/Heading/Heading";
import DividerLine from "../ui/DividerLine/DividerLine";
import ProductCard from "../ProductCard/ProductCard";
import mvp1 from "../../assets/mostLovedProducts1.jpg";
import mvp2 from "../../assets/mostLovedProducts2.jpg";
import mvp3 from "../../assets/mostLovedProducts3.jpg";
import mvp4 from "../../assets/mostLovedProducts4.jpg";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "firebase/remote-config";
import { getAllTshirtsFromFirestore } from "../../queries/getAllProducts";
import { Link } from "react-router-dom";

const mostLovedProducts = [
  {
    id: crypto.randomUUID(),
    imageUrl: mvp1,
    category: "Tshirts",
    name: "green printed tshirts",
    rating: 4,
    price: 34,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: mvp2,
    category: "Tshirts",
    name: "printed brown tshirt",
    isOnSale: true,
    oldPrice: 34,
    rating: 2,
    price: 25,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: mvp3,
    category: "Tshirts",
    name: "printed dark blue tshirt",
    rating: 3,
    price: 34,
  },
  {
    id: crypto.randomUUID(),
    imageUrl: mvp4,
    category: "Tshirts",
    name: "printed green tshirt",
    isOnSale: true,
    oldPrice: 35,
    rating: 2,
    price: 34,
  },
];

const MostLovedProduct = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tshirts"],
    queryFn: getAllTshirtsFromFirestore,
  });
  return (
    <div className="most-loved-products-container">
      <Heading>Most Loved Product</Heading>
      <DividerLine />
      <div className="product-container">
        {data?.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            to={`/${product.category.toLowerCase()}/${product.id}`}
          >
            <ProductCard key={product.id} {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostLovedProduct;
