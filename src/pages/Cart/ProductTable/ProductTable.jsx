import React, { useContext, useEffect, useState } from "react";
import photo from "../../../assets/mostLovedProducts1.jpg";
import {
  calculateDiscount,
  checkCouponCode,
  twoDigitAfterDecimal,
} from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";
import {
  deleteProductFromCartInFirestore,
  getAllCartProductsFromFirestore,
  getCartTotalAndNoOfItems,
  updateQuantityInCartInFirestore,
} from "../../../queries/CartQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Heading from "../../../components/ui/Heading/Heading";
import { TotalAmountContext } from "../../../context/TotalAmount/TotalAmountProvider";
import { UserContext } from "../../../context/User/UserContext";
import { set } from "firebase/database";

const ProductTable = () => {
  // const [couponCode, setCouponCode] = useState("");
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
  } = useContext(UserContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getAllCartProductsFromFirestore(uid),
    keepPreviousData: true,
  });

  const { data: OriginalCartData } = useQuery({
    queryKey: ["cart", "details"],
    queryFn: () => getCartTotalAndNoOfItems(uid),
  });

  useEffect(() => {
    if (isDiscountApplied && data && OriginalCartData) {
      const { discount } = checkCouponCode(couponCode);
      setTotal(
        OriginalCartData.total -
          calculateDiscount(OriginalCartData.total, discount)
      );
    }

    return () => {};
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (data.length === 0) {
    return <Heading>No items in the cart</Heading>;
  }

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
        {data?.map((product) => (
          <CartProductDetail {...product} key={product.id} />
        ))}
      </div>
      <div className="product-table__footer">
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
              id="apply-coupon-btn"
              onClick={() => {
                const { isValidCouponCode, discount } =
                  checkCouponCode(couponCode);

                if (isValidCouponCode) {
                  setTotal((prev) => prev - calculateDiscount(prev, discount));
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
          {isWrongCoupon && <p style={{ color: "red" }}>Invalid coupon code</p>}
        </div>

        {/* <Button isIconPresent={false} variant="small">
          Update Cart
        </Button> */}
      </div>
    </div>
  );
};

export default ProductTable;

function CartProductDetail({
  id,
  name,
  imageUrl,
  price,
  quantity,
  oldPrice,
  isOnSale,
}) {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const uid = user ? user.uid : null;

  const { mutate, isError } = useMutation({
    mutationFn: deleteProductFromCartInFirestore,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const {
    mutate: updateQuantity,
    isLoading,
    isError: updateQuantityError,
  } = useMutation({
    mutationFn: updateQuantityInCartInFirestore,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { isDiscountApplied } = useContext(TotalAmountContext);

  if (isError) {
    return <div>Error...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-table__row">
      <span className="remove-btn">
        <div
          className="icon-container"
          onClick={() => {
            mutate({ id, uid });
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </span>
      <span className="product-img">
        <img src={imageUrl} alt="" />
      </span>
      <span className="product-name">{name}</span>
      <span className="product-price">
        {isOnSale && (
          <span className="product_old-price">
            ${twoDigitAfterDecimal(oldPrice)}
          </span>
        )}
        <span className="product_new-price">
          ${twoDigitAfterDecimal(price)}
        </span>
      </span>
      <span className="product-quantity">
        <input
          type="number"
          min={1}
          max={10}
          defaultValue={quantity}
          disabled={isDiscountApplied}
          onChange={(e) => {
            updateQuantity({ id, quantity: +e.target.value, uid });
          }}
        />
      </span>
      <span className="product-subtotal">
        ${twoDigitAfterDecimal(quantity * price)}
      </span>
    </div>
  );
}
