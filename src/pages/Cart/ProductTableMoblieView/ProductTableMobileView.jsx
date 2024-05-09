import React, { useContext, useState } from "react";
import {
  calculateDiscount,
  checkCouponCode,
  twoDigitAfterDecimal,
} from "../../../utlis/helper";
import photo from "../../../assets/mostLovedProducts1.jpg";
import {
  deleteProductFromCartInFirestore,
  getAllCartProductsFromFirestore,
  getCartTotalAndNoOfItems,
  updateQuantityInCartInFirestore,
} from "../../../queries/CartQueries";
import { useUserContext } from "../../../context/User/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "../../../components/ui/Heading/Heading";
import Button from "../../../components/ui/Button/Button";
import { TotalAmountContext } from "../../../context/TotalAmount/TotalAmountProvider";

const ProductTableMobileView = () => {
  const queryClient = useQueryClient();

  const [isWrongCoupon, setIsWrongCoupon] = useState(false);
  const {
    setTotal,
    isDiscountApplied,
    setIsDiscountApplied,
    couponCode,
    setCouponCode,
  } = useContext(TotalAmountContext);

  const {
    user: { uid },
  } = useUserContext();
  const {
    data: cartProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getAllCartProductsFromFirestore(uid),
  });

  const { mutate, isError: deletionError } = useMutation({
    mutationFn: deleteProductFromCartInFirestore,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { mutate: updateQuantity, isError: updateQuantityError } = useMutation({
    mutationFn: updateQuantityInCartInFirestore,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { data: OriginalCartData } = useQuery({
    queryKey: ["cart", "details"],
    queryFn: () => getCartTotalAndNoOfItems(uid),
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error ...</div>;
  }
  if (cartProducts.length === 0) {
    return (
      <Heading id="no-item-in-cart-text--mobile">No products in cart</Heading>
    );
  }

  return (
    <div className="product-table-mobile">
      {deletionError && <div>Error deleting product</div>}
      {cartProducts.map(
        ({ id, imageUrl, isOnSale, name, oldPrice, price, quantity }) => (
          <div className="product-table-mobile__row" key={id}>
            <div className="remove-btn">
              <div
                className="icons-container"
                onClick={() => {
                  mutate({ id, uid });
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="product-img">
              <img loading="lazy" src={imageUrl} alt="" />
            </div>
            <div className="product-name">
              <span className="label">product</span>
              <span className="value">{name}</span>
            </div>
            <div className="product-price">
              <span className="label">price</span>
              {isOnSale && (
                <span className="product_old-price">
                  ${twoDigitAfterDecimal(oldPrice)}
                </span>
              )}
              <span className="value">${twoDigitAfterDecimal(price)}</span>
            </div>
            <div className="product-quantity">
              <span className="label">Quantity</span>
              <span className="value">
                {" "}
                <input
                  type="number"
                  min={"1"}
                  max={"10"}
                  defaultValue={quantity}
                  disabled={isDiscountApplied}
                  onChange={(e) => {
                    if (e.target.value > 10) e.target.value = 10;
                    if (e.target.value < 1) e.target.value = 1;
                    updateQuantity({ id, quantity: +e.target.value, uid });
                  }}
                />
              </span>
            </div>
            <div className="product-subtotal">
              <span className="label">subtotal</span>
              <span className="value">
                ${twoDigitAfterDecimal(quantity * price)}
              </span>
            </div>
          </div>
        )
      )}
      <div className="product-table__footer">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="coupon-container">
            <input
              type="text"
              className="coupon-input"
              placeholder="Coupon Code"
              value={couponCode}
              disabled={isDiscountApplied}
              onChange={(e) => {
                setCouponCode(e.target.value.toUpperCase());
              }}
            />
            {!isDiscountApplied ? (
              <Button
                isIconPresent={false}
                variant="large"
                id="apply-coupon-btn"
                onClick={() => {
                  const { isValidCouponCode, discount } =
                    checkCouponCode(couponCode);

                  if (isValidCouponCode) {
                    setTotal(
                      (prev) => prev - calculateDiscount(prev, discount)
                    );
                    setIsDiscountApplied(true);
                    setIsWrongCoupon(false);

                    return;
                  }

                  setIsWrongCoupon(true);
                }}
              >
                Apply coupon
              </Button>
            ) : (
              <Button
                variant="large"
                isIconPresent={false}
                onClick={() => {
                  setTotal(OriginalCartData.total);
                  setIsDiscountApplied(false);
                  setCouponCode("");
                }}
              >
                Remove Coupon
              </Button>
            )}
            {isWrongCoupon && (
              <p className="invalid-coupon-text--mobile">Invalid coupon code</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductTableMobileView;
