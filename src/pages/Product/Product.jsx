import React, { useContext, useEffect, useState } from "react";
import photo from "../../assets/product2.jpg";
import { twoDigitAfterDecimal } from "../../utlis/helper";
import Button from "../../components/ui/Button/Button";
import ProductReviewAndDescription from "./ProductReviewAndDescriptionSection/ProductReviewAndDescription";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSingleProductFromFirestore } from "../../queries/getSingleProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import {
  addProductToCartInFirestore,
  isPresentInCartInFirestore,
  quantityPresentInCartInFirestore,
} from "../../queries/CartQueries";
import { TotalAmountContext } from "../../context/TotalAmount/TotalAmountProvider";
import { UserContext, useUserContext } from "../../context/User/UserContext";
import Rating from "../../components/ui/Rating/Rating";

const Product = () => {
  const category = useLocation().pathname.split("/").at(-2);
  const id = useCurrentLocation();
  // const {
  //   user: { uid },
  // } = useUserContext();

  const { user } = useContext(UserContext);
  const uid = user ? user.uid : null;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [category, id],
    queryFn: ({ queryKey }) =>
      getSingleProductFromFirestore({
        category: queryKey[0],
        id: queryKey[1],
      }),
  });

  const {
    data: isPresentInCart,
    isLoading: isPresentLoading,
    isError: isPresentError,
    error: isPresentErrorObj,
  } = useQuery({
    enabled: !!data,
    queryKey: ["cart", "isPresent", id],
    queryFn: () => isPresentInCartInFirestore({ id: data?.id, uid }),
  });

  const {
    data: quantityPresentInCart,
    isError: quantityError,
    isLoading: quantityLoading,
    error: quantityErrorObj,
  } = useQuery({
    queryKey: ["cart", "quantity", id],
    queryFn: () => quantityPresentInCartInFirestore({ id: data?.id, uid }),
    enabled: !!isPresentInCart && !!data,
  });

  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  useEffect(() => {
    if (itemAddedToCart) {
      const timeout = setTimeout(() => {
        setItemAddedToCart(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [itemAddedToCart]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error...{error?.message}
        {isPresentErrorObj?.message}
        {quantityErrorObj?.message}
      </div>
    );
  }

  return (
    <div className="product-page">
      {isPresentInCart && (
        <p className="already-present-text">
          You Have Already added{" "}
          {quantityPresentInCart === 1
            ? `${quantityPresentInCart} time`
            : `${quantityPresentInCart} times`}{" "}
          in cart
        </p>
      )}
      {itemAddedToCart && (
        <div className="product-added-to-cart">
          <p>Item added to cart</p>
          <Link to="/cart">
            <Button variant="small">View Cart</Button>
          </Link>
        </div>
      )}
      <ProductOverview {...data} setItemAddedToCart={setItemAddedToCart} />
      <ProductReviewAndDescription />

      <RelatedProducts category={data?.category.toLowerCase()} id={data?.id} />
    </div>
  );
};

export default Product;

function ProductOverview({
  imageUrl,
  id,
  name,
  oldPrice,
  rating,
  price,
  category,
  isOnSale,
  setItemAddedToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  // const {
  //   user: { uid },
  // } = useContext(UserContext);

  const { user } = useContext(UserContext);
  const uid = user ? user.uid : null;

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationFn: addProductToCartInFirestore,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      setItemAddedToCart(true);
    },
  });
  const navigate = useNavigate();

  if (isError) {
    return <div>Error...{error.message}</div>;
  }

  return (
    <>
      <div className="product-detail">
        <div className="product-detail__left">
          <div className="image-container">
            <img loading="lazy" src={imageUrl} alt="" />
          </div>
        </div>
        <div className="product-detail__right">
          <p className="product__heading">{name}</p>
          <div className="product__price">
            {isOnSale && (
              <p className="product__old-price">
                ${twoDigitAfterDecimal(oldPrice)}
              </p>
            )}

            <p className="product__new-price">${twoDigitAfterDecimal(price)}</p>
            <p className="product__free-shipping">+ Free Shipping</p>
          </div>
          <Rating ratingValue={rating} />
          <p className="product__short-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            repudiandae consequatur, ullam sed vel distinctio tenetur adipisci
            totam et quibusdam veniam provident repellat blanditiis animi
            praesentium veritatis. Pariatur, architecto accusamus?
          </p>
          <div className="product__add-to-cart">
            <div className="product__quantity">
              <input
                type="number"
                defaultValue={quantity}
                min={1}
                max={10}
                onChange={(e) => setQuantity(+e.target.value)}
              />
            </div>
            <Button
              toolTip={user ? "" : "Login to add to cart"}
              disabled={!user}
              onClick={(e) => {
                e.preventDefault();

                // if (!user) {
                //   navigate("/login");
                //   return;
                // }
                mutate({
                  imageUrl,
                  oldPrice,
                  price,
                  name,
                  rating,
                  productId: id,
                  quantity,
                  isOnSale,
                  id: crypto.randomUUID(),
                  uid,
                });
              }}
            >
              {" "}
              Add To cart
            </Button>
          </div>
          {category ? (
            <div className="product__category">
              <p className="label">Category :</p>
              <p className="value">{category}</p>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </>
  );
}
