import PropTypes from "prop-types";

const ratingArray = [1, 2, 3, 4, 5];

const Rating = ({
  isRatingChangeable = false,
  ratingValue,
  setRatingValue,
  size = 1.2,
}) => {
  return (
    <div className="rating" style={{ fontSize: `${size}rem` }}>
      <span className="rating-heading">Rating :</span>
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

Rating.propTypes = {
  isRatingChangeable: PropTypes.bool,
  ratingValue: PropTypes.number,
  setRatingValue: PropTypes.func,
  size: PropTypes.number,
};
