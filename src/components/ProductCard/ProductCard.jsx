import PropTypes from "prop-types";
import product from "../../assets/product1.jpg";
import Rating from "../ui/Rating/Rating";

const ProductCard = ({
  imageUrl = product,
  category = "Mugs",
  name = "Black Coffee Mug",
  rating = 4,
  price = 17.11,
  isOnSale = false,
  oldPrice,
}) => {
  return (
    <div className="product-card">
      {isOnSale && <div className="sale-label">Sale!</div>}
      <div className="product__image-container">
        <img loading="lazy" src={imageUrl} alt="product image" />
      </div>
      <p className="product__category">{category}</p>
      <p className="product__name">{name}</p>
      <div className="product__rating">
        <Rating ratingValue={rating} />
      </div>
      <p className="product__price">
        {" "}
        {isOnSale && <span className="old-price">${oldPrice.toFixed(2)}</span>}
        <span>${price.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  imageUrl: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  price: PropTypes.number,
  isOnSale: PropTypes.bool,
  oldPrice: PropTypes.number,
};
