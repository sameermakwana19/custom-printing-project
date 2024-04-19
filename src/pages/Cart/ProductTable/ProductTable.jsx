import React from "react";
import photo from "../../../assets/mostLovedProducts1.jpg";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import Button from "../../../components/ui/Button/Button";
import {
  deleteProductFromCartInFirestore,
  getAllCartProductsFromFirestore,
} from "../../../queries/CartQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ProductTable = () => {
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

        {/* <div className="product-table__row">
          <span className="remove-btn">
            <div className="icon-container">
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
        </div> */}
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

function CartProductDetail({ id, name, imageUrl, price, quantity }) {
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: deleteProductFromCartInFirestore,
    onSuccess: (data) => {
      console.log("success", data);
      setTimeout(() => {
        queryClient.invalidateQueries(["cart"]);
      }, 3000);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="product-table__row">
      <span className="remove-btn">
        <div
          className="icon-container"
          onClick={() => {
            console.log("running");
            mutate(id);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </span>
      <span className="product-img">
        <img src={imageUrl} alt="" />
      </span>
      <span className="product-name">{name}</span>
      <span className="product-price">${twoDigitAfterDecimal(price)}</span>
      <span className="product-quantity">
        <input type="number" min={1} max={10} defaultValue={quantity} />
      </span>
      <span className="product-subtotal">${twoDigitAfterDecimal(price)}</span>
    </div>
  );
}
