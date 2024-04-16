import React from "react";
import photo from "../../assets/product2.jpg";
import { twoDigitAfterDecimal } from "../../utlis/helper";
import Button from "../../components/ui/Button/Button";

const Product = () => {
  return (
    <div className="product-page">
      <ProductOverview
        photo={photo}
        twoDigitAfterDecimal={twoDigitAfterDecimal}
      />
      <div className="product__description-and-review-section">
        <header></header>
      </div>
    </div>
  );
};

export default Product;

function ProductOverview({ photo, twoDigitAfterDecimal }) {
  return (
    <div className="product-detail">
      <div className="product-detail__left">
        <div className="image-container">
          <img src={photo} alt="" />
        </div>
      </div>
      <div className="product-detail__right">
        <p className="product__heading">Black Printed Coffee Mug</p>
        <div className="product__price">
          <p className="product__old-price">${twoDigitAfterDecimal(14)}</p>
          <p className="product__new-price">${twoDigitAfterDecimal(14)}</p>
          <p className="product__free-shipping">+ Free Shipping</p>
        </div>
        <p className="product__short-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          repudiandae consequatur, ullam sed vel distinctio tenetur adipisci
          totam et quibusdam veniam provident repellat blanditiis animi
          praesentium veritatis. Pariatur, architecto accusamus?
        </p>
        <div className="product__add-to-cart">
          <div className="product__quantity">
            <input type="number" defaultValue={1} min={1} max={10} />
          </div>
          <Button> Add To cart</Button>
        </div>
        <div className="product__category">
          <p className="label">Category :</p>
          <p className="value">Mug</p>
        </div>
      </div>
    </div>
  );
}
