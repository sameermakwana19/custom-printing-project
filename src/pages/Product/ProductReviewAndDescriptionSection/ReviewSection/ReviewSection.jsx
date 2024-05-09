import React, { useId, useState } from "react";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";
import Rating from "../../../../components/ui/Rating/Rating";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  getReviewsFromFirestore,
  saveReviewInFirestore,
} from "../../../../queries/reviews";
import useCurrentLocation from "../../../../hooks/useCurrentLocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../../../context/User/UserContext";
import Heading from "../../../../components/ui/Heading/Heading";

const ReviewSection = () => {
  const [ratingValue, setRatingValue] = useState(4);
  const productId = useCurrentLocation();
  const [addReviewerror, setAddReviewError] = useState(null);
  const queryClient = useQueryClient();

  const { user } = useUserContext();

  const id = useId();
  // const form = useForm();
  // const { register, handleSubmit, control, formState } = form;
  const {
    register,
    handleSubmit,
    control,
    formState,
    reset,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      review: "",
      username: user?.displayName || "",
      email: user?.email || "",
      "save-my-name": false,
    },
  });
  const { errors } = formState;

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [productId, "reviews"],
    queryFn: () => getReviewsFromFirestore(productId),
  });

  const { mutate, error: saveReviewError } = useMutation({
    mutationFn: saveReviewInFirestore,
    onSuccess: ({ error, data }) => {
      if (error) {
        setAddReviewError(error);
        return;
      }
      queryClient.invalidateQueries([productId, "reviews"]);
      queryClient.setQueryData([productId, "reviews"], (oldData) => {
        return [...oldData, data];
      });
      reset();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError || saveReviewError) {
    return <div>Error: {error?.message || `${saveReviewError}`}</div>;
  }

  const submitHandler = (data) => {
    if (data["save-my-name"]) {
      mutate({
        review: data["review"],
        username: user.displayName,
        email: user.email,
        productId: productId,
        rating: ratingValue,
        userId: user.uid,
      });
      return;
    }

    mutate({
      review: data["review"],
      username: "User" + crypto.randomUUID().split("-")[0],
      email: "anonymous",
      productId: productId,
      rating: ratingValue,
      userId: user.uid,
    });

    setAddReviewError(null);
  };

  return (
    <div className="review-section">
      <div className="reviews">
        {reviews.length === 0 ? (
          <Heading>No Reviews for the Products</Heading>
        ) : (
          reviews.map((review, index) => (
            <div className="review" key={index}>
              <p className="username">Username: {review.username}</p>
              <p className="email">Email : {review.email}</p>
              <Rating ratingValue={review.rating} isRatingChangeable={false} />
              <p className="content">Review: {review.review}</p>
            </div>
          ))
        )}
      </div>
      {user && (
        <div className="review-form">
          <p className="review-form__heading">
            {reviews.length === 0
              ? "Be the first to review “Black Printed Coffee Mug"
              : "Write a review about the product"}
          </p>
          <p className="review-form__sub-heading">
            Your email address will not be published. Required fields are marked
            *
          </p>
          {addReviewerror && <p className="error">{`${addReviewerror}`}</p>}
          <form onSubmit={handleSubmit(submitHandler)}>
            <Rating
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              isRatingChangeable={true}
            />

            <Input
              label="Your Review"
              id={`${id}-review`}
              isMandatory={true}
              type="textarea"
              {...register("review", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Minimum length should be 10",
                },
                maxLength: {
                  value: 100,
                  message: "Maximum length should be 100",
                },
              })}
            />
            <p className="error">{errors["review"]?.message}</p>

            {watch("save-my-name") && (
              <>
                <Input
                  label="Name"
                  isMandatory={true}
                  id={`${id}-name`}
                  {...register("username", {
                    required: "Please enter your email",
                    disabled: true,
                  })}
                />
                <p className="error">{errors["name"]?.message}</p>

                <Input
                  label="Email"
                  id={`${id}-email`}
                  isMandatory={true}
                  type="email"
                  {...register("email", {
                    disabled: true,
                  })}
                />
                <p className="error">{errors["email"]?.message}</p>
              </>
            )}

            <Input
              label="Show my username and email in reviews section"
              id={`${id}-save-my-name`}
              type="checkbox"
              {...register("save-my-name")}
            />

            <Button isIconPresent={false}>submit</Button>
          </form>
        </div>
      )}
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default ReviewSection;
