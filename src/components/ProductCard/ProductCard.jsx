import React from "react";
import product from "../../assets/product1.jpg";
import Rating from "../ui/Rating/Rating";

const ratingArray = [1, 2, 3, 4, 5];
// const RATING = 4;
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

{
  /* <i class="fa-solid fa-star"></i>
<i class="fa-regular fa-star"></i> */
}

//
{
  /* {ratingArray.map((number) =>
          number <= RATING ? (
            <i class="fa-solid fa-star"></i>
          ) : (
            <i class="fa-regular fa-star"></i>
          )
        )} */
}
{
  /* {ratingArray.map((number) => (
          <i
            key={number}
            className={`${
              number <= rating ? "fa-solid" : "fa-regular"
            } fa-star`}
          ></i>
        ))} */
}
