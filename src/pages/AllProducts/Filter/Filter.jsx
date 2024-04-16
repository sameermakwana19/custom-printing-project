import React, { useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";
import Button from "../../../components/ui/Button/Button";
import { useSearchParams } from "react-router-dom";

const Filter = ({ max, min }) => {
  const [filterValue, setFilterValue] = useState(40);
  const [searchParams, setSearchParams] = useSearchParams();

  const applyFilterValue = () => {
    setSearchParams({ price: filterValue });
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
            // const value = Number(e.target.value);
            setFilterValue(e.target.value);
          }}
        />
        <div className="values">
          <p className="min-value">${min}</p>
          <p className="current-value">${filterValue}</p>
        </div>
        <div className="buttons-container">
          {filterValue !== max && (
            <Button
              id="reset-btn"
              onClick={() => {
                setFilterValue(max);
                setSearchParams({});
              }}
            >
              Reset
            </Button>
          )}
          <Button onClick={() => applyFilterValue()}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
