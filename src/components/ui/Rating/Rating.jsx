import React, { useState } from "react";
const ratingArray = [1, 2, 3, 4, 5];

const Rating = ({ isRatingChangeable = false, rating, size = 1.2 }) => {
  const [ratingValue, setRatingValue] = useState(rating);
  return (
    <div className="rating" style={{ fontSize: `${size}rem` }}>
      {ratingArray.map((number) => (
        <i
          key={number}
          className={`${
            number <= ratingValue ? "fa-solid" : "fa-regular"
          } fa-star`}
          onClick={isRatingChangeable ? () => setRatingValue(number) : null}
        ></i>
      ))}
    </div>
  );
};

export default Rating;
