import PropTypes from "prop-types";

const BenefitCard = ({
  imageUrl,
  icon,
  heading = "Eros Imperdie",
  content = "We’ll generate a sitemap for your site, submit it to search engine is and track.",
}) => {
  const AppliedIcon = icon ?? <i className="fa-solid fa-snowflake"></i>;
  return (
    <div className="benefit-card">
      {!imageUrl && <div className="benefit-card__icon">{AppliedIcon}</div>}
      {imageUrl && (
        <div className="image-container">
          <img loading="lazy" src={imageUrl} />
        </div>
      )}
      <p className="benefit-card__heading">{heading}</p>
      <p className="benefit-card__content">{content}</p>
    </div>
  );
};

export default BenefitCard;

BenefitCard.propTypes = {
  imageUrl: PropTypes.string,
  icon: PropTypes.node,
  heading: PropTypes.string,
  content: PropTypes.string,
};
