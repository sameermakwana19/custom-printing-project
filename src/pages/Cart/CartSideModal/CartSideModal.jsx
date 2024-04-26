import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/ui/Button/Button";
import photo from "../../../assets/mostLovedProducts4.jpg";
import photo3 from "../../../assets/mostLovedProducts3.jpg";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { Link, Navigate } from "react-router-dom";
import { query } from "firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductFromCartInFirestore,
  getAllCartProductsFromFirestore,
} from "../../../queries/CartQueries";

const CartSideModal = ({ toggleModal, isModalOpen }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartProductsFromFirestore,
  });

  const pathname = useCurrentLocation();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [isModalOpen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const total = data.reduce((acc, product) => acc + product.price, 0);

  return createPortal(
    <div
      className={`cart-side-modal ${
        isModalOpen ? "cart-side-modal--visible" : ""
      }`}
    >
      <div
        className={`cart-side-modal__overlay ${
          isModalOpen && "cart-side-modal__overlay--visible"
        }`}
        onClick={() => toggleModal()}
      ></div>
      <div
        className={` cart-side-modal__content ${
          isModalOpen && "cart-side-modal__content--visible"
        }`}
      >
        <div className="cart-side-modal__header">
          <div className="cart-side-modal__heading">Shopping Cart</div>
          <div className="icon-container" onClick={() => toggleModal()}>
            <i className="fa-solid fa-x"></i>
          </div>
        </div>

        <div className="cart-side-modal__body">
          {data.map((product) => (
            <CartSideModalProduct {...product} key={product.id} />
          ))}
        </div>

        <div className="cart-side-modal__footer">
          <div className="subtotal">
            <p className="label">Subtotal</p>
            <p className="value">${twoDigitAfterDecimal(total)}</p>
          </div>
          <Link to={"/cart"}>
            <Button
              variant={"large"}
              onClick={() => toggleModal()}
              isIconPresent={false}
            >
              View Cart
            </Button>
          </Link>
          <Link to={"/cart"}>
            <Button
              variant={"large"}
              onClick={() => toggleModal()}
              isIconPresent={false}
            >
              CheckOut
            </Button>
          </Link>
        </div>
      </div>
    </div>,
    document.querySelector("#cart-side-modal-root")
  );
};

export default CartSideModal;

function CartSideModalProduct({ id, imageUrl, name, price, quantity }) {
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: deleteProductFromCartInFirestore,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return (
    <div className="cart-side-modal__product">
      <div className="image-container">
        <img loading="lazy" src={imageUrl} alt="" />
      </div>
      <div className="cart-side-modal__product-details">
        <p className="product-name">{name}</p>
        <div className="cart-side-modal__product-quantity">
          <span className="cart-side-modal__product-quantity-value">
            {quantity}
          </span>
          <span className="multiply-icon">
            <i className="fa-solid fa-x"></i>{" "}
          </span>
          <span className="cart-side-modal__product--price">
            ${twoDigitAfterDecimal(price)}
          </span>
        </div>
      </div>
      <div className="remove-btn" onClick={() => mutate(id)}>
        <i className="fa-solid fa-x"></i>{" "}
      </div>
    </div>
  );
}
