import React, { useContext, useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import { useSearchParams } from "react-router-dom";
import { getQueryParams } from "../../utlis/helper";

const SearchInput = ({ setProducts, products, data, setTotalProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");
  const originalProducts = [...data];

  const handleSearch = () => {
    const params = getQueryParams();
    setSearchParams({ ...params, q: value.toLowerCase() });
  };

  useEffect(() => {
    if (searchParams.get("q") === null) return;

    const updatedProducts = products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchParams.get("q")) !== -1
    );
    setProducts(updatedProducts);
    setTotalProducts(updatedProducts.length);
  }, [`${searchParams.get("q")}-${products}`]);

  function updateSearch(value) {
    setValue(value ?? "");
    if (!value) {
      setProducts(originalProducts);
      setTotalProducts(originalProducts.length);

      const params = getQueryParams();
      delete params.q;
      setSearchParams({ ...params });
    }
  }

  return (
    <>
      <form
        className="search-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => updateSearch(e.target.value)}
        />
        {value && (
          <div className="clear-input" onClick={() => updateSearch()}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        )}
        <Button isIconPresent={false} variant={"small"}>
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchInput;
