import React from "react";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";
import { query } from "firebase/firestore";
import { getAllCartProductsFromFirestore } from "../../../queries/CartQueries";
import { useQuery } from "@tanstack/react-query";

const CartTotalTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartProductsFromFirestore,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }

  const total = data.reduce((acc, product) => acc + product.price, 0);

  return (
    <div className="cart-total-table">
      <div className="cart-total__heading">Cart totals</div>
      <div className="cart-total__row">
        <span className="label">Subtotal</span>
        <span className="label">${twoDigitAfterDecimal(total)}</span>
      </div>
      <div className="cart-total__row">
        <span className="label">Total</span>
        <span className="label">${twoDigitAfterDecimal(total)}</span>
      </div>
      <Button variant="large" isIconPresent={false}>
        proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotalTable;
