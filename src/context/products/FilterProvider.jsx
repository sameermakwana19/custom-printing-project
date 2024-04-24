import { set } from "firebase/database";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import { getQueryParams } from "../../utlis/helper";
// import { SearchParamsContext } from "../SearchParamsProvider";

export const FilterContext = createContext();

const MIN_PRICE = 10;
const MAX_PRICE = 40;

const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState(
    +searchParams.get("price") || MAX_PRICE
  );

  const [lastEndpoint, setLastEndpoint] = useState(null);

  const endpoint = useCurrentLocation();

  useEffect(() => {
    if (lastEndpoint) {
      setFilterValue(MAX_PRICE);
    }
    setLastEndpoint(endpoint);
  }, [endpoint]);

  const applyFilterValue = (value) => {
    setSearchParams(() => {
      const QueryParams = getQueryParams();
      value === MAX_PRICE
        ? delete QueryParams["price"]
        : (QueryParams["price"] = value);
      return QueryParams;
    });

    setFilterValue(value);
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
