import React, { useContext, useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";
import Button from "../../../components/ui/Button/Button";
import { useSearchParams } from "react-router-dom";
import { FilterContext } from "../../../context/products/FilterProvider";

// const Filter = ({ max, min }) => {
// const [filterValue, setFilterValue] = useState(40);
// const [searchParams, setSearchParams] = useSearchParams();

// const applyFilterValue = () => {
//   setSearchParams({ price: filterValue });
// };

const Filter = () => {
  const { applyFilterValue, min, max } = useContext(FilterContext);

  const [inputValue, setInputValue] = useState(max);

  return (
    <div className="filter">
      <Heading>Filter by Price</Heading>
      <div className="input-container">
        <input
          type="range"
          min={min}
          max={max}
          value={inputValue}
          onChange={(e) => {
            // alert(e.target.value);
            const value = Number(e.target.value);
            setInputValue(value);
          }}
        />
        <div className="values">
          <p className="min-value">${min}</p>
          <p className="current-value">
            {/* {`${(inputValue !== 40, typeof inputValue)},`} */}
            {inputValue !== 40 && `$${inputValue}`}
          </p>
          <p className="current-value">${max}</p>
        </div>
        <div className="buttons-container">
          {inputValue !== max && (
            <Button
              id="reset-btn"
              onClick={() => {
                setInputValue(max);
                applyFilterValue(max);
              }}
            >
              Reset
            </Button>
          )}
          <Button onClick={() => applyFilterValue(inputValue)}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
