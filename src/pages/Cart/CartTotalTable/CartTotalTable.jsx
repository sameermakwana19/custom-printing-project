import React from "react";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";

const CartTotalTable = () => {
  return (
    <div className="cart-total-table">
      <div className="cart-total__heading">Cart totals</div>
      <div className="cart-total__row">
        <span className="label">Subtotal</span>
        <span className="label">${twoDigitAfterDecimal(49)}</span>
      </div>
      <div className="cart-total__row">
        <span className="label">Total</span>
        <span className="label">${twoDigitAfterDecimal(49)}</span>
      </div>
      <Button variant="large" isIconPresent={false}>
        proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotalTable;
