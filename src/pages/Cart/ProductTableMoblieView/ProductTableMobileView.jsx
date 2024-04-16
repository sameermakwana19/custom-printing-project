import React from "react";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import photo from "../../../assets/mostLovedProducts1.jpg";

const ProductTableMobileView = () => {
  return (
    <div className="product-table-mobile">
      <div className="product-table-mobile__row">
        <div className="remove-btn">
          <div className="icons-container">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="product-img">
          <img src={photo} alt="" />
        </div>
        <div className="product-name">
          <span className="label">product</span>
          <span className="value">Black printed coffee mug</span>
        </div>
        <div className="product-price">
          <span className="label">price</span>
          <span className="value">${twoDigitAfterDecimal(49)}</span>
        </div>
        <div className="product-quantity">
          <span className="label">Quantity</span>
          <span className="value">
            {" "}
            <input type="number" min={1} max={10} defaultValue={1} />
          </span>
        </div>
        <div className="product-subtotal">
          <span className="label">subtotal</span>
          <span className="value">${twoDigitAfterDecimal(49)}</span>
        </div>
      </div>
      <div className="product-table-mobile__row">
        <div className="remove-btn">
          <div className="icons-container">
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="product-img">
          <img src={photo} alt="" />
        </div>
        <div className="product-name">
          <span className="label">product</span>
          <span className="value">Black printed coffee mug</span>
        </div>
        <div className="product-price">
          <span className="label">price</span>
          <span className="value">${twoDigitAfterDecimal(49)}</span>
        </div>
        <div className="product-quantity">
          <span className="label">Quantity</span>
          <span className="value">
            {" "}
            <input type="number" min={1} max={10} defaultValue={1} />
          </span>
        </div>
        <div className="product-subtotal">
          <span className="label">subtotal</span>
          <span className="value">${twoDigitAfterDecimal(49)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductTableMobileView;
