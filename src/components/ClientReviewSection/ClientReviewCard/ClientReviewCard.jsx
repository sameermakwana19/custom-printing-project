import React from "react";
import photo from "../../../assets/user2.png";
import Rating from "../../ui/Rating/Rating";

const ClientReviewCard = ({
  rating = 3,
  avatar = photo,
  reviewText = "Lorem ipsum",
  name = "Diana Burnwood",
}) => {
  return (
    <div className="client-review-card">
      <p className="review-text">{reviewText}</p>
      <div className="rating-container">
        <Rating rating={rating} size={1.5} />
      </div>
      <div className="user-detail">
        <div className="user-avatar">
          <img src={avatar} alt="user-avatar" />
        </div>
        <p className="user-name">{name}</p>
      </div>
    </div>
  );
};

export default ClientReviewCard;
