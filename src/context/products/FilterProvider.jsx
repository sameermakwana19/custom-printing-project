import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getQueryParams } from "../../utlis/helper";
import PropTypes from "prop-types";

export const FilterContext = createContext();

const MIN_PRICE = 10;
const MAX_PRICE = 40;

const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState(
    +searchParams.get("price") || MAX_PRICE
  );

  useEffect(() => {
    if (searchParams.get("price") !== null) {
      setFilterValue(+searchParams.get("price"));
    } else {
      setFilterValue(MAX_PRICE);
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [filterValue]);

  return (
    <FilterContext.Provider value={FilterContextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

FilterProvider.propTypes = {
  children: PropTypes.node,
};
