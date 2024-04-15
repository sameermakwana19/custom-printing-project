import React from "react";
import photo from "../../../assets/mostLovedProducts1.jpg";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";

const ProductTable = () => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <td className="remove-btn"></td>
          <td className="product-img"></td>
          <td className="product-name">Products</td>

          <td className="product-price-heading">price</td>
          <td className="product-quantity-heading">Quantity</td>
          <td className="product-subtotal-heading">Subtotal</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="remove-btn">
            <div className="icons-container">
              <i className="fa-solid fa-xmark"></i>
            </div>
          </td>
          <td className="product-img">
            <img src={photo} alt="" />
          </td>
          <td className="product-name">Black Printed Coffee Mug</td>
          <td className="product-price">${twoDigitAfterDecimal(30)}</td>
          <td className="product-quantity">
            <input type="number" min={1} max={10} defaultValue={1} />
          </td>
          <td className="product-subtotal">${twoDigitAfterDecimal(30)}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
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
          </td>
          <td colSpan={1}>
            <Button isIconPresent={false} variant="small">
              Update Cart
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ProductTable;
