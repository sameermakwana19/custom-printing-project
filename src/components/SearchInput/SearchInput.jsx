import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button/Button";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    alert("Search value: " + value);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        isIconPresent={false}
        variant={"small"}
        onClick={() => handleSearch()}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
