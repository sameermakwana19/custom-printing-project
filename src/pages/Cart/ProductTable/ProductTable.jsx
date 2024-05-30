import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Heading from "../../../components/ui/Heading/Heading";
import { TotalAmountContext } from "../../../context/TotalAmount/TotalAmountProvider";
import { UserContext } from "../../../context/User/UserContext";

const ProductTable = () => {
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
    placeholderData: keepPreviousData,
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

    // eslint-disable-next-line
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...,productTable</div>;
  }

  if (data.length === 0) {
    return <Heading id="no-item-in-cart-text">No Products in the cart</Heading>;
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
              <p style={{ color: "red" }}>Invalid coupon code</p>
            )}
          </div>
        </form>
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
  const {
    user: { uid },
  } = useContext(UserContext);

  const { mutate, isError } = useMutation({
    mutationFn: deleteProductFromCartInFirestore,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { mutate: updateQuantity, isLoading } = useMutation({
    mutationFn: updateQuantityInCartInFirestore,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { isDiscountApplied } = useContext(TotalAmountContext);

  if (isError) {
    return <div>Error...,cardProductDetail</div>;
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
            if (+e.target.value > 10 || +e.target.value === 0) return;
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

CartProductDetail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  oldPrice: PropTypes.number,
  isOnSale: PropTypes.bool,
};
