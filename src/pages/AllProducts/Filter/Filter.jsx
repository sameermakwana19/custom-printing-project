import React, { useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";
import Button from "../../../components/ui/Button/Button";

const Filter = ({ max, min }) => {
  const [filterValue, setFilterValue] = useState(40);

  const changeFilterValue = (newValue) => {
    setFilterValue(newValue);
  };

  return (
    <div className="filter">
      <Heading>Filter by Price</Heading>
      <div className="input-container">
        <input
          type="range"
          min={min}
          max={max}
          value={filterValue}
          onChange={(e) => {
            const value = Number(e.target.value);
            console.log(typeof Number(e.target.value));
            changeFilterValue(value);
          }}
        />
        <div className="values">
          <p className="min-value">${min}</p>
          <p className="current-value">${filterValue}</p>
        </div>
        <div className="buttons-container">
          {filterValue !== max && (
            <Button id="reset-btn" onClick={() => changeFilterValue(max)}>
              Reset
            </Button>
          )}
          <Button onClick={() => alert("working")}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
