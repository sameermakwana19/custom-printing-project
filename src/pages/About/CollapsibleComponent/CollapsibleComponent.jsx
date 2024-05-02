import React, { useId } from "react";

const CollapsibleComponent = ({
  collapisibleExpandedIndex,
  currentIndex,
  changeCollapsibleIndex,
  heading,
  content,
}) => {
  return (
    <div
      className={`collapsible  ${
        collapisibleExpandedIndex === currentIndex
          ? "collapsible--expanded"
          : ""
      } `}
      onClick={() => changeCollapsibleIndex(currentIndex)}
    >
      <div className="collapsible__header">
        {currentIndex === collapisibleExpandedIndex ? (
          <i className="fa-solid fa-chevron-down"></i>
        ) : (
          <i className="fa-solid fa-chevron-right"></i>
        )}
        {heading ?? `Heading`}
      </div>
      <div className={`collapsible__body`}>
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

export default CollapsibleComponent;
