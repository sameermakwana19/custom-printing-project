import React, { useState } from "react";
import Button from "../ui/Button/Button";

const SearchInput = ({ setProducts, data }) => {
  const [value, setValue] = useState("");
  const originalProducts = data;

  const handleSearch = () => {
    setProducts((prev) =>
      prev.filter((product) => product.name.toLowerCase().indexOf(value) !== -1)
    );
  };

  return (
    <form
      className="search-input"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          e.target.value == "" && setProducts(originalProducts);
        }}
      />
      <Button isIconPresent={false} variant={"small"}>
        Search
      </Button>
    </form>
  );
};

export default SearchInput;
