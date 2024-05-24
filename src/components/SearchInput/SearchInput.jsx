import { useEffect, useState } from "react";
import Button from "../ui/Button/Button";
import { useSearchParams } from "react-router-dom";
import { getQueryParams } from "../../utlis/helper";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    const params = getQueryParams();
    setSearchParams({ ...params, q: value.toLowerCase() });
  };

  useEffect(() => {
    if (!searchParams.get("q")) {
      setValue("");
    }
  }, [searchParams.get("q")]);

  function updateSearch(value) {
    setValue(value ?? "");
    if (!value) {
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
