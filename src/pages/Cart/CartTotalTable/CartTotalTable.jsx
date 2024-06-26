import { useContext } from "react";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";
import { getCartTotalAndNoOfItems } from "../../../queries/CartQueries";
import { useQuery } from "@tanstack/react-query";
import { TotalAmountContext } from "../../../context/TotalAmount/TotalAmountProvider";
import { useNavigate } from "react-router-dom";
import { UserContext, useUserContext } from "../../../context/User/UserContext";

const CartTotalTable = () => {
  const {
    user: { uid },
  } = useUserContext();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", "totalPrice"],
    queryFn: () => getCartTotalAndNoOfItems(uid),
    keepPreviousData: true,
  });

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { total } = useContext(TotalAmountContext);

  const { isDiscountApplied } = useContext(TotalAmountContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error... ,cardTable</div>;
  }

  if (data.noOfItems === 0) {
    return;
  }

  const proceedToCheckOut = () => {
    if (!user) {
      navigate("/login");
      return;
    }
  };

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
      <Button
        variant="large"
        isIconPresent={false}
        onClick={() => proceedToCheckOut()}
      >
        proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotalTable;
