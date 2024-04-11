import React, { useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";

const ServicesProvided = () => {
  const [collapisibleExpandedIndex, setCollapsibleExpandedIndex] = useState(0);

  const changeCollapsibleIndex = (index) => {
    if (index === collapisibleExpandedIndex) {
      setCollapsibleExpandedIndex(0);
      return;
    }

    setCollapsibleExpandedIndex(index);
  };

  return (
    <div className="services-provided">
      <div className="services-provided__left">
        <Heading>
          Best Quality Printed T-Shirts & Mugs At Affordable Price!
        </Heading>
        <div className="icon-list-container">
          <IconList label={"Personal Gifts"} />
          <IconList label={"Occasional Gifts"} />
          <IconList label={"Corporate Gifts"} />
          <IconList label={"Couple Gifts"} />
          <IconList label={"Wedding Gifts"} />
          <IconList label={"Mentor Gifts"} />
        </div>
      </div>
      <div className="services-provided__right">
        <div
          className={`${
            collapisibleExpandedIndex === 1
              ? "collapsible--expanded"
              : "collapsible"
          }`}
        >
          <div
            className="collapsible__header"
            onClick={() => changeCollapsibleIndex(1)}
          >
            Header
          </div>
          <div className={`collapsible__body`}>Body</div>
        </div>
        <div
          className={`${
            collapisibleExpandedIndex === 2
              ? "collapsible--expanded"
              : "collapsible"
          }`}
        >
          <div
            className="collapsible__header"
            onClick={() => changeCollapsibleIndex(2)}
          >
            Header
          </div>
          <div className={`collapsible__body`}>
            Body Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
            facilis?
          </div>
        </div>
        <div
          className={`${
            collapisibleExpandedIndex === 3
              ? "collapsible--expanded"
              : "collapsible"
          }`}
        >
          <div
            className="collapsible__header"
            onClick={() => changeCollapsibleIndex(3)}
          >
            Header
          </div>
          <div className={`collapsible__body`}>Body</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesProvided;

function IconList({ label }) {
  return (
    <div className="icon-list-item">
      <div className="icon-container">
        <i className="fab fa-gratipay"></i>
      </div>
      <p className="label">{label}</p>
    </div>
  );
}
