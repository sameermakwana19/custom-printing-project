import PropTypes from "prop-types";
import photo from "../../../assets/popular-1.jpg";

const PopularSectionCard = ({
  imageUrl = photo,
  subHeading = "subHeading",
  heading = "Heading",
}) => {
  return (
    <div className="popular-card">
      <div className="popular__image-container">
        <img loading="lazy" src={imageUrl} alt="popular product photo" />
      </div>
      <p className="popular__sub-heading">{subHeading}</p>
      <p className="popular__heading">{heading}</p>
    </div>
  );
};

export default PopularSectionCard;

PopularSectionCard.propTypes = {
  imageUrl: PropTypes.string,
  subHeading: PropTypes.string,
  heading: PropTypes.string,
};
