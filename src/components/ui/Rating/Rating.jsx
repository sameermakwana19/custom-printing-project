import React from "react";
const ratingArray = [1, 2, 3, 4, 5];

const Rating = ({ rating, size = 1.2 }) => {
  return (
    <div className="rating" style={{ fontSize: `${size}rem` }}>
      {ratingArray.map((number) => (
        <i
          key={number}
          className={`${number <= rating ? "fa-solid" : "fa-regular"} fa-star`}
        ></i>
      ))}
    </div>
  );
};

export default Rating;
