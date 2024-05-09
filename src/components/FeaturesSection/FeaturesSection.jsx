import DividerLine from "../ui/DividerLine/DividerLine";
import ProductCard from "../ProductCard/ProductCard";
import { getAllMugsFromFirestore } from "../../queries/getAllProducts";
import NotFound from "../../pages/NotFound/NotFound";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
