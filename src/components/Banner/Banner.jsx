import React from "react";
import DividerLine from "../ui/DividerLine/DividerLine";
import Button from "../ui/Button/Button";

const Banner = ({
  images,
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
          <Button icon={<i className="fa-solid fa-chevron-right fa-sm"></i>}>
            {buttonText}
          </Button>
        </div>
        <div className="banner__content__right">
          {images && (
            <img
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

// enhanced version
// contionally render background img, right side img ,
//  use the prop delagation to apply user design rules e.g. padding
