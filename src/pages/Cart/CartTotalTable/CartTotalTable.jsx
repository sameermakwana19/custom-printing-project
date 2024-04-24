import React, { useContext } from "react";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";
import { query } from "firebase/firestore";
import {
  getAllCartProductsFromFirestore,
  getCartTotalAndNoOfItems,
} from "../../../queries/CartQueries";
import { useQuery } from "@tanstack/react-query";
import { TotalAmountContext } from "../../../context/TotalAmount/TotalAmountProvider";

const CartTotalTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", "totalPrice"],
    queryFn: getCartTotalAndNoOfItems,
  });

  const { total } = useContext(TotalAmountContext);

  const { isDiscountApplied } = useContext(TotalAmountContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  if (data.noOfItems === 0) {
    return;
  }

  return (
    <div className="cart-total-table">
      <div className="cart-total__heading">Cart totals</div>
      <div className="cart-total__row">
        <span className="label">Subtotal</span>
        <span className="label">${twoDigitAfterDecimal(data.total)}</span>
      </div>
      <div className="cart-total__row">
        <span className="label">
          {isDiscountApplied ? "Payable Amount" : "Total"}
        </span>
        <span className={`label ${isDiscountApplied && "old_price"}`}>
          ${twoDigitAfterDecimal(data.total)}
        </span>
        {isDiscountApplied && (
          <span className="label">${twoDigitAfterDecimal(total)}</span>
        )}
      </div>
      {/* {isDiscountApplied && (
        <div className="cart-total__row">
          <span className="label">Payable Amount</span>
          <span className="label">${twoDigitAfterDecimal(total)}</span>
        </div>
      )} */}
      <Button variant="large" isIconPresent={false}>
        proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotalTable;
