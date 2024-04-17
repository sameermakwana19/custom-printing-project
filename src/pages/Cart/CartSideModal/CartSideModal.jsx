import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/ui/Button/Button";
import photo from "../../../assets/mostLovedProducts4.jpg";
import photo3 from "../../../assets/mostLovedProducts3.jpg";
import { twoDigitAfterDecimal } from "../../../utlis/helper";
import useCurrentLocation from "../../../hooks/useCurrentLocation";
import { Navigate } from "react-router-dom";

const CartSideModal = ({ toggleModal, isModalOpen }) => {
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
          <CartSideModalProduct
            photo={photo}
            twoDigitAfterDecimal={twoDigitAfterDecimal}
          />
          <CartSideModalProduct
            photo={photo3}
            twoDigitAfterDecimal={twoDigitAfterDecimal}
          />
        </div>

        <div className="cart-side-modal__footer">
          <div className="subtotal">
            <p className="label">Subtotal</p>
            <p className="value">${twoDigitAfterDecimal(69)}</p>
          </div>
          <Button
            variant={"large"}
            onClick={() => toggleModal()}
            isIconPresent={false}
          >
            View Cart
          </Button>
          <Button
            variant={"large"}
            onClick={() => toggleModal()}
            isIconPresent={false}
          >
            CheckOut
          </Button>
        </div>
      </div>
    </div>,
    document.querySelector("#cart-side-modal-root")
  );
};

export default CartSideModal;

function CartSideModalProduct({ photo, twoDigitAfterDecimal }) {
  return (
    <div className="cart-side-modal__product">
      <div className="image-container">
        <img src={photo} alt="" />
      </div>
      <div className="cart-side-modal__product-details">
        <p className="product-name">Black printed Coffee Mug</p>
        <div className="cart-side-modal__product-quantity">
          <span className="cart-side-modal__product-quantity-value">2</span>
          <span className="multiply-icon">
            <i className="fa-solid fa-x"></i>{" "}
          </span>
          <span className="cart-side-modal__product--price">
            ${twoDigitAfterDecimal(39)}
          </span>
        </div>
      </div>
      <div className="remove-btn">
        <i className="fa-solid fa-x"></i>{" "}
      </div>
    </div>
  );
}
