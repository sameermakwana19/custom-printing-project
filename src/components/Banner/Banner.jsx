import PropTypes from "prop-types";
import DividerLine from "../ui/DividerLine/DividerLine";
import Button from "../ui/Button/Button";
import { Link } from "react-router-dom";

const Banner = ({
  images,
  linkTo = "/allproducts",
  background,
  tagline,
  heading,
  subHeading,
  buttonText,
  isDividerLineRequire = true,
  ...delegated
}) => {
  const inBuilStyle = background
    ? {
        backgroundImage: `url(${background})`,
      }
    : null;

  return (
    <div className="banner" style={{ ...delegated.style, ...inBuilStyle }}>
      <div className="banner__content">
        <div className="banner__content__left">
          {isDividerLineRequire && <DividerLine />}
          <p className="banner__tagline">{tagline}</p>
          <p className="banner__heading">{heading}</p>
          <p className="banner__sub-heading">{subHeading}</p>
          <Link to={linkTo ?? ""}>
            <Button icon={<i className="fa-solid fa-chevron-right fa-sm"></i>}>
              {buttonText}
            </Button>
          </Link>
        </div>
        <div className="banner__content__right">
          {images && (
            <img
              loading="lazy"
              src={images[0]}
              alt="banner photo"
              srcSet={`${images[0]} 538w, ${images[1]} 263w`}
              sizes="(max-width:538px) 100vw , 538px"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

Banner.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  linkTo: PropTypes.string,
  background: PropTypes.string,
  tagline: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  buttonText: PropTypes.string,
  isDividerLineRequire: PropTypes.bool,
};

// enhanced version
// contionally render background img, right side img ,
//  use the prop delagation to apply user design rules e.g. padding
