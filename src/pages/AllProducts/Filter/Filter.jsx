import { useContext, useEffect, useState } from "react";
import Heading from "../../../components/ui/Heading/Heading";
import Button from "../../../components/ui/Button/Button";
import { FilterContext } from "../../../context/products/FilterProvider";
import { getQueryParams } from "../../../utlis/helper";

const Filter = () => {
  const { applyFilterValue, min, max, filterValue } = useContext(FilterContext);

  const [inputValue, setInputValue] = useState(filterValue);

  useEffect(() => {
    setInputValue(filterValue);
  }, [filterValue]);

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
            const value = Number(e.target.value);
            setInputValue(value);
          }}
        />
        <div className="values">
          <p className="min-value">${min}</p>
          <p className="current-value">
            {/* {`${(inputValue !== 40, typeof inputValue)},`} */}
            {inputValue !== max && `$${inputValue}`}
          </p>
          <p className="current-value">${max}</p>
        </div>
        <div className="buttons-container">
          {inputValue !== max && (
            <Button
              id="reset-btn"
              onClick={() => {
                setInputValue(max);
                const QueryParams = getQueryParams();
                delete QueryParams["price"];
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
