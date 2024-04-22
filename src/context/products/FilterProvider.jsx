import React, { useMemo, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterContext = createContext();

const MIN_PRICE = 10;
const MAX_PRICE = 40;

const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState(
    searchParams.get("price") || MAX_PRICE
  );

  const applyFilterValue = (value) => {
    if (value === MAX_PRICE) {
      setSearchParams({});
    } else {
      setSearchParams({ price: value });
    }
    setFilterValue(value);
  };

  const FilterContextValue = useMemo(() => {
    return { filterValue, applyFilterValue, min: MIN_PRICE, max: MAX_PRICE };
  });

  return (
    <FilterContext.Provider value={FilterContextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
