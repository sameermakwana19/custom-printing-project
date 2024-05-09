import { useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";
import CollapsibleComponent from "../CollapsibleComponent/CollapsibleComponent";
import IconList from "../../../components/IconList/IconList";

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
        <CollapsibleComponent
          collapisibleExpandedIndex={collapisibleExpandedIndex}
          currentIndex={1}
          changeCollapsibleIndex={changeCollapsibleIndex}
          heading={"we can custom Design your Ideas"}
          content={
            "Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          }
        />
        <CollapsibleComponent
          collapisibleExpandedIndex={collapisibleExpandedIndex}
          currentIndex={2}
          changeCollapsibleIndex={changeCollapsibleIndex}
          heading={"Your Payment is safe and secured"}
          content={
            "Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          }
        />
        <CollapsibleComponent
          collapisibleExpandedIndex={collapisibleExpandedIndex}
          currentIndex={3}
          changeCollapsibleIndex={changeCollapsibleIndex}
          heading={"we offer discounts and coupons"}
          content={
            "Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
          }
        />
      </div>
    </div>
  );
};

export default ServicesProvided;
