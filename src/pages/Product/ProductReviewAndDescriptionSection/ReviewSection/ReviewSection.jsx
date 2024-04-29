import React, { useContext, useId } from "react";
import Button from "../../../../components/ui/Button/Button";
import Input from "../../../../components/ui/Input/Input";
import Rating from "../../../../components/ui/Rating/Rating";
import { UserContext } from "../../../../context/User/UserContext";

const ReviewSection = () => {
  const id = useId();
  const { user } = useContext(UserContext);

  return (
    <div className="review-section">
      <div className="reviews">
        <p className="review">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          maiores.
        </p>
      </div>
      <div className="review-form">
        <p className="review-form__heading">
          Be the first to review “Black Printed Coffee Mug”
        </p>
        <p className="review-form__sub-heading">
          Your email address will not be published. Required fields are marked *
        </p>

        <Rating rating={4} isRatingChangeable={true} />

        <Input label="Your Review" id={`${id}-review`} type="textarea" />

        <Input label="Name" id={`${id}-name`} />

        <Input label="Email" id={`${id}-email`} type="email" />

        <Input
          label="Save my name, email, and website in this browser for the next time I comment."
          id={`${id}-save-my-name`}
          type="checkbox"
        />

        <Button isIconPresent={false}>submit</Button>
      </div>
    </div>
  );
};

export default ReviewSection;
