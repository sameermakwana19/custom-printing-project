import React, { useEffect, useReducer, useState } from "react";
import BreadCrumb from "../../components/ui/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchInput from "../../components/SearchInput/SearchInput";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getAllMugsFromFirestore,
  getAllProductsFromFirestore,
  getAllTshirtsFromFirestore,
} from "../../queries/getAllProducts";
import NotFound from "../NotFound/NotFound";
import { set } from "firebase/database";

const PRODUCT_PER_PAGE = 9;

const QUERY_FUNCTIONS_OBJECT = {
  allproducts: getAllProductsFromFirestore,
  mugs: getAllMugsFromFirestore,
  tshirts: getAllTshirtsFromFirestore,
};

// function reducer(state, action) {
//   console.log("demo");
//   const test = [...state];
//   switch (action.type) {
//     case "price-asc":
//       test.sort((a, b) => a.price - b.price);
//       break;
//     case "price-desc":
//       test.sort((a, b) => b.price - a.price);
//   }

//   return test;
// }
// const [sortBy, dispatchSortBy] = useReducer(reducer, null);

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(20);
  const [sortBy, setSortBy] = useState(null);
  const [products, setProducts] = useState(null);

  const endpoint = useCurrentLocation();

  // TODO: use Query starting

  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint, page],
    queryFn: QUERY_FUNCTIONS_OBJECT[endpoint],
  });

  console.log(data);
  // TODO: use Query ending
  // console.log(data);

  if (error) {
    return <NotFound />;
  }

  useEffect(() => {
    if (data) {
      setPage(1);
      setTotalProducts(data.length);
      setProducts(data);
    }
  }, [endpoint, data]);

  useEffect(() => {
    if (sortBy) {
      const sortedProducts = [...products];
      if (sortBy === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
      } else if (sortBy === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
      }
    } else {
      setProducts(data);
    }
  }, [sortBy]);

  let pageNumbersArray = Array(Math.ceil(totalProducts / PRODUCT_PER_PAGE))
    .fill(0)
    .map((_, index) => index + 1);

  const changePage = (nextPage) => {
    if (nextPage <= 0 || nextPage > pageNumbersArray.length) {
      return;
    }
    setPage(nextPage);
  };

  console.log({ products });

  return (
    <>
      <div className="all-products__right">
        <header>
          <BreadCrumb />
          <div className="heading">
            <p>{endpoint}</p>
          </div>
          <SearchInput />
        </header>
        <main>
          <ContentDetails setSortBy={setSortBy} />
          <ProductsContainer products={products} page={page} />
        </main>
        <PageNumbersButtons
          page={page}
          changePage={changePage}
          pageNumbersArray={pageNumbersArray}
        />
      </div>
    </>
  );
};

export default AllProducts;

function ContentDetails({ setSortBy }) {
  return (
    <div className="content-details">
      <div className="current-page">Showing 1-9 of 11 </div>
      <div className="sort-by">
        <select name="sortby" onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Default Sort</option>
          <option value="price-asc">Sort by Price : low to high</option>
          <option value="price-desc">Sort by Price : high to low</option>
          {/* <option value="latest">Sort by latest</option> */}
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

  console.log({ products }, " product container");
  return (
    <div className="product-container">
      {products
        ?.slice(initialProductNumber, finalProductNumber)
        .map((product, index) => (
          <Link to={`/product/${index + 1}`} key={product.id}>
            <ProductCard {...product} />
          </Link>
        ))}
    </div>
  );
}

// const skip = page * PRODUCT_PER_PAGE - PRODUCT_PER_PAGE;
// console.log({ data });
