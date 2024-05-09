import Heading from "../ui/Heading/Heading";
import DividerLine from "../ui/DividerLine/DividerLine";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTshirtsFromFirestore } from "../../queries/getAllProducts";
import { Link } from "react-router-dom";

const MostLovedProduct = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tshirts"],
    queryFn: getAllTshirtsFromFirestore,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }

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
