import React, { useContext, useEffect, useState } from "react";
import photo from "../../assets/product2.jpg";
import { twoDigitAfterDecimal } from "../../utlis/helper";
import Button from "../../components/ui/Button/Button";
import ProductReviewAndDescription from "./ProductReviewAndDescriptionSection/ProductReviewAndDescription";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { Link, useLocation } from "react-router-dom";
import { getSingleProductFromFirestore } from "../../queries/getSingleProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import {
  addProductToCartInFirestore,
  isPresentInCartInFirestore,
} from "../../queries/CartQueries";
import { query } from "firebase/firestore";
import { set } from "firebase/database";
import { TotalAmountContext } from "../../context/TotalAmount/TotalAmountProvider";

const GET_PRODUCT_FUNCTIONS = {
  mugs: getSingleProductFromFirestore,
};

const Product = () => {
  const category = useLocation().pathname.split("/").at(-2);
  const id = useCurrentLocation();

  const queryClient = useQueryClient();

  // console.log({ id, category });
  const { data, isLoading, isError } = useQuery({
    queryKey: [category, id],
    queryFn: ({ queryKey }) =>
      getSingleProductFromFirestore({
        category: queryKey[0],
        id: queryKey[1],
      }),
  });
  // console.log({ data });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="product-page">
      <ProductOverview {...data} twoDigitAfterDecimal={twoDigitAfterDecimal} />
      <ProductReviewAndDescription />

      <RelatedProducts category={data.category.toLowerCase()} id={data.id} />
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
  twoDigitAfterDecimal,
}) {
  const [quantity, setQuantity] = useState(1);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: addProductToCartInFirestore,
    onSuccess: (data) => {
      setItemAddedToCart(true);
      console.log("success", data);
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const { setIsDiscountApplied } = useContext(TotalAmountContext);

  const isPresentInCart = isPresentInCartInFirestore(id);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setItemAddedToCart(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [itemAddedToCart]);

  if (isError) {
    return <div>Error...</div>;
  }

  // console.log({
  //   imageUrl,
  //   id,
  //   name,
  //   oldPrice,
  //   rating,
  //   price,
  //   category,
  //   isOnSale,
  // });

  return (
    <>
      {isPresentInCart && <p></p>}
      {itemAddedToCart && (
        <div className="product-added-to-cart">
          <p>Item added to cart</p>
          <Link to="/cart">
            <Button variant="small">View Cart</Button>
          </Link>
        </div>
      )}
      <div className="product-detail">
        <div className="product-detail__left">
          <div className="image-container">
            <img src={imageUrl} alt="" />
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
              onClick={() => {
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
                });
                setIsDiscountApplied(false);
              }}
            >
              {" "}
              Add To cart
            </Button>
          </div>
          <div className="product__category">
            <p className="label">Category :</p>
            <p className="value">{category}</p>
          </div>
        </div>
      </div>
    </>
  );
}
