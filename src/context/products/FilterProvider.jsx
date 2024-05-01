import React, { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { getQueryParams } from "../../utlis/helper";

export const FilterContext = createContext();

const MIN_PRICE = 10;
const MAX_PRICE = 40;

const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState(
    +searchParams.get("price") || MAX_PRICE
  );

  const endpoint = useCurrentLocation();

  useEffect(() => {
    if (searchParams.get("price") !== null) {
      setFilterValue(searchParams.get("price"));
    } else {
      setFilterValue(MAX_PRICE);
    }
  }, [searchParams.get("price")]);

  const applyFilterValue = (value) => {
    setSearchParams(() => {
      const QueryParams = getQueryParams();
      value === MAX_PRICE
        ? delete QueryParams["price"]
        : (QueryParams["price"] = value);
      return QueryParams;
    });

    // setFilterValue(value);
  };

  const FilterContextValue = useMemo(() => {
    return { filterValue, applyFilterValue, min: MIN_PRICE, max: MAX_PRICE };
  }, [filterValue]);

  return (
    <FilterContext.Provider value={FilterContextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
