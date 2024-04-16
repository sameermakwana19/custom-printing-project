import React from "react";
import photo from "../../../assets/mostLovedProducts1.jpg";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";

const ProductTable = () => {
  return (
    <div className="product-table">
      <div className="product-table__header">
        <div className="product-table__row">
          <span className="remove-btn"></span>
          <span className="product-img"></span>
          <span className="product-name">Products</span>
          <span className="product-price-heading">price</span>
          <span className="product-quantity-heading">Quantity</span>
          <span className="product-subtotal-heading">Subtotal</span>
        </div>
      </div>
      <div className="product-table__body">
        <div className="product-table__row">
          <span className="remove-btn">
            <div className="icons-container">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </span>
          <span className="product-img">
            <img src={photo} alt="" />
          </span>
          <span className="product-name">Black Printed Coffee Mug</span>
          <span className="product-price">${twoDigitAfterDecimal(30)}</span>
          <span className="product-quantity">
            <input type="number" min={1} max={10} defaultValue={1} />
          </span>
          <span className="product-subtotal">${twoDigitAfterDecimal(30)}</span>
        </div>
        <div className="product-table__row">
          <span className="remove-btn">
            <div className="icons-container">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </span>
          <span className="product-img">
            <img src={photo} alt="" />
          </span>
          <span className="product-name">Black Printed Coffee Mug</span>
          <span className="product-price">${twoDigitAfterDecimal(30)}</span>
          <span className="product-quantity">
            <input type="number" min={1} max={10} defaultValue={1} />
          </span>
          <span className="product-subtotal">${twoDigitAfterDecimal(30)}</span>
        </div>
      </div>
      <div className="product-table__footer">
        <div className="coupon-container">
          <input
            type="text"
            className="coupon-input"
            placeholder="Coupon Code"
          />
          <Button isIconPresent={false} id="apply-coupon-btn">
            Apply coupon
          </Button>
        </div>

        <Button isIconPresent={false} variant="small">
          Update Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductTable;
