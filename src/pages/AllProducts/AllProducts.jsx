import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import BreadCrumb from "../../components/ui/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchInput from "../../components/SearchInput/SearchInput";
import { Link, useSearchParams } from "react-router-dom";
import { Query, useQuery } from "@tanstack/react-query";

import {
  getAllMugsFromFirestore,
  getAllProductsFromFirestore,
  getAllTshirtsFromFirestore,
} from "../../queries/getAllProducts";
import NotFound from "../NotFound/NotFound";
import { FilterContext } from "../../context/products/FilterProvider";
import { getQueryParams, sortProducts } from "../../utlis/helper";

const PRODUCT_PER_PAGE = 9;

const QUERY_FUNCTIONS_OBJECT = {
  allproducts: getAllProductsFromFirestore,
  mugs: getAllMugsFromFirestore,
  tshirts: getAllTshirtsFromFirestore,
};

const AVAILABLE_ENDPOINTS = ["allproducts", "mugs", "tshirts"];

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(20);
  const [products, setProducts] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(searchParams.get("sortby") || "default");
  const { filterValue } = useContext(FilterContext);

  const endpoint = useCurrentLocation();

  if (AVAILABLE_ENDPOINTS.indexOf(endpoint) === -1) {
    return <NotFound />;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: QUERY_FUNCTIONS_OBJECT[endpoint],
  });

  useEffect(() => {
    if (searchParams.get("sortby") !== null) {
      setSortBy(searchParams.get("sortby"));
    } else {
      setSortBy("default");
    }
  }, [searchParams.get("sortby")]);

  useEffect(() => {
    if (data) {
      const filteredProducts = data.filter(
        (product) => product.price < filterValue
      );
      const sortedProducts = sortProducts(filteredProducts, sortBy);
      setProducts(sortedProducts);
      setTotalProducts(filteredProducts.length);
    }

    return () => {};
  }, [data]);

  useEffect(() => {
    if (data) {
      setPage(1);
      setTotalProducts(data.length);
      setProducts(data);
      setSortBy("default");
    }
  }, [endpoint]);

  useEffect(() => {
    if (data) {
      const filteredProducts = data.filter(
        (product) => product.price < filterValue
      );

      const sortedProducts =
        sortBy !== "default"
          ? sortProducts(filteredProducts, sortBy)
          : filteredProducts;
      setProducts(sortedProducts);

      setTotalProducts(filteredProducts.length);
    }
  }, [filterValue, sortBy]);

  useEffect(() => {
    if (sortBy && products) {
      const sortedProducts = [...products];
      if (sortBy === "default") {
        return;
      }
      const newSortedProducts = sortProducts(sortedProducts, sortBy);
      setProducts(newSortedProducts);
    }
  }, [sortBy]);

  let pageNumbersArray = useMemo(
    () =>
      Array(Math.ceil(totalProducts / PRODUCT_PER_PAGE))
        .fill(0)
        .map((_, index) => index + 1),
    [totalProducts]
  );

  const changePage = (nextPage) => {
    if (nextPage <= 0 || nextPage > pageNumbersArray.length) {
      return;
    }
    setPage(nextPage);
  };

  if (error) {
    return <NotFound />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="all-products__right">
        <div className="header">
          <BreadCrumb />
          <div className="heading">
            <p>{endpoint}</p>
          </div>
          <SearchInput
            data={data}
            setProducts={setProducts}
            setTotalProducts={setTotalProducts}
          />
        </div>
        {products?.length !== 0 ? (
          <main>
            <ContentDetails setSortBy={setSortBy} sortBy={sortBy} />
            <ProductsContainer products={products} page={page} />

            <PageNumbersButtons
              page={page}
              changePage={changePage}
              pageNumbersArray={pageNumbersArray}
            />
          </main>
        ) : (
          <div>No products found</div>
        )}
      </div>
    </>
  );
};

export default AllProducts;

function ContentDetails({ setSortBy, sortBy }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="content-details">
      <div className="current-page">Showing 1-9 of 11 </div>
      <div className="sort-by">
        <select
          name="sortby"
          onChange={(e) => {
            setSearchParams((searchParams) => {
              const QueryParams = getQueryParams();
              e.target.value === "default"
                ? delete QueryParams["sortby"]
                : (QueryParams["sortby"] = e.target.value);
              return QueryParams;
            });
            setSortBy(e.target.value);
          }}
          value={sortBy}
        >
          <option value="default">Default Sort</option>
          <option value="price-asc">Sort by Price : low to high</option>
          <option value="price-desc">Sort by Price : high to low</option>
        </select>
      </div>
    </div>
  );
}

function PageNumbersButtons({ page, changePage, pageNumbersArray }) {
  return (
    <div className="pagenumber-container">
      {page !== 1 ? (
        <div className="pagenumber" onClick={() => changePage(page - 1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </div>
      ) : (
        <div
          className="pagenumber"
          style={{
            opacity: "0",
          }}
        ></div>
      )}

      {pageNumbersArray.map((item) => (
        <div
          key={item}
          className={`pagenumber ${item === page && "active "}`}
          onClick={() => changePage(item)}
        >
          {item}
        </div>
      ))}

      {page !== pageNumbersArray.length ? (
        <div className="pagenumber" onClick={() => changePage(page + 1)}>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      ) : (
        <div
          className="pagenumber"
          style={{
            opacity: "0",
          }}
        ></div>
      )}
    </div>
  );
}

function ProductsContainer({ products, page }) {
  const initialProductNumber = (page - 1) * PRODUCT_PER_PAGE;
  const finalProductNumber = page * PRODUCT_PER_PAGE;

  return (
    <div className="product-container">
      {products
        ?.slice(initialProductNumber, finalProductNumber)
        .map((product, index) => (
          <Link
            to={`/${product.category.toLowerCase()}/${product?.id}`}
            key={product.id}
          >
            <ProductCard {...product} />
          </Link>
        ))}
    </div>
  );
}

// const skip = page * PRODUCT_PER_PAGE - PRODUCT_PER_PAGE;
