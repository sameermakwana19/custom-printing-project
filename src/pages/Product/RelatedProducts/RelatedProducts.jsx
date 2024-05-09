import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {
  getAllMugsFromFirestore,
  getAllTshirtsFromFirestore,
} from "../../../queries/getAllProducts";
import { useQuery } from "@tanstack/react-query";

// eslint-disable-next-line
export const CATEGORY_QUERY_FUNCTIONS = {
  mugs: getAllMugsFromFirestore,
  tshirts: getAllTshirtsFromFirestore,
};

const RelatedProducts = ({ category, id }) => {
  const appliedCategory = category === "t-shirts" ? "tshirts" : category;

  const { data, isLoading, isError } = useQuery({
    queryKey: [appliedCategory],
    queryFn: CATEGORY_QUERY_FUNCTIONS[appliedCategory],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const newData = data.filter((product) => product.id !== id).slice(0, 4);
  return (
    <div className="related-products-section">
      <p className="related-products-section__heading">related products</p>

      <div className="related-products__container">
        {newData?.map((product) => (
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

export default RelatedProducts;

RelatedProducts.propTypes = {
  category: PropTypes.String,
  id: PropTypes.String,
};
