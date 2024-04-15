import React from "react";

const CollapsibleComponent = ({
  collapisibleExpandedIndex,
  currentIndex,
  changeCollapsibleIndex,
  heading,
  content,
}) => {
  return (
    <div className={`collapsible`}>
      <div
        className="collapsible__header"
        onClick={() => changeCollapsibleIndex(currentIndex)}
      >
        {currentIndex === collapisibleExpandedIndex ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-right"></i>
        )}
        {heading ?? `Heading`}
      </div>
      <div
        className={`${
          collapisibleExpandedIndex === currentIndex
            ? "expanded"
            : "collapsible__body"
        } `}
      >
        <p>
          {content ??
            `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur,
        eaque? Cumque qui minus aliquid est, nam perferendis aut possimus
        inventore!`}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CollapsibleComponent);
