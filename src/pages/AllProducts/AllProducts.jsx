import PropTypes from "prop-types";
import { useContext, useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../components/ui/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import SearchInput from "../../components/SearchInput/SearchInput";
import { Link, useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFilteredAndSortedProducts } from "../../queries/getAllProducts";
import NotFound from "../NotFound/NotFound";
import { FilterContext } from "../../context/products/FilterProvider";
import { getQueryParams } from "../../utlis/helper";
import Heading from "../../components/ui/Heading/Heading";

const PRODUCT_PER_PAGE = 9;

const AVAILABLE_ENDPOINTS = ["allproducts", "mugs", "tshirts"];

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const { filterValue } = useContext(FilterContext);
  const endpoint = useCurrentLocation();

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(20);
  const [products, setProducts] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get("sortby") || "default");

  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: () =>
      getFilteredAndSortedProducts({
        collection: endpoint,
        filterValue,
        sortBy,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (searchParams.get("sortby") !== null) {
      setSortBy(searchParams.get("sortby"));
    } else {
      setSortBy("default");
    }
    // eslint-disable-next-line
  }, [searchParams.get("sortby")]);

  useEffect(() => {
    if (data) {
      setPage(1);
      setTotalProducts(data.length);
      setProducts(data);
      setSortBy("default");
    }
    // eslint-disable-next-line
  }, [endpoint]);

  useEffect(() => {
    (async () => {
      if (data) {
        let res = await getFilteredAndSortedProducts({
          collection: endpoint,
          filterValue,
          sortBy,
        });
        const params = getQueryParams();
        if (params.q) {
          res = res.filter((product) =>
            product.name.toLowerCase().includes(params.q.toLowerCase())
          );
        }
        setPage(1);
        setProducts(res);
        setTotalProducts(res.length);
      }
    })();
    // eslint-disable-next-line
  }, [filterValue, sortBy, data, searchParams.get("q")]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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

  if (AVAILABLE_ENDPOINTS.indexOf(endpoint) === -1) {
    return <NotFound />;
  }

  if (error) {
    return <NotFound />;
  }

  if (isLoading || !products) {
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
            products={products}
            data={data}
            sortBy={sortBy}
            setProducts={setProducts}
            setTotalProducts={setTotalProducts}
          />
        </div>
        {products?.length !== 0 ? (
          <main>
            <ContentDetails
              setSortBy={setSortBy}
              sortBy={sortBy}
              length={products?.length}
            />
            <ProductsContainer products={products} page={page} />

            <PageNumbersButtons
              page={page}
              changePage={changePage}
              pageNumbersArray={pageNumbersArray}
            />
          </main>
        ) : (
          <Heading>No products found</Heading>
        )}
      </div>
    </>
  );
};

export default AllProducts;

function ContentDetails({ setSortBy, sortBy, length }) {
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="content-details">
      <div className="current-page">
        Showing {length <= 9 ? length : "1-9"} of {length}{" "}
      </div>
      <div className="sort-by">
        <select
          name="sortby"
          onChange={(e) => {
            setSearchParams(() => {
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

ContentDetails.propTypes = {
  setSortBy: PropTypes.func,
  sortBy: PropTypes.string,
  length: PropTypes.number,
};

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

PageNumbersButtons.propTypes = {
  page: PropTypes.number,
  changePage: PropTypes.func,
  pageNumbersArray: PropTypes.array,
};

function ProductsContainer({ products, page }) {
  const initialProductNumber = (page - 1) * PRODUCT_PER_PAGE;
  const finalProductNumber = page * PRODUCT_PER_PAGE;

  return (
    <div className="product-container">
      {products
        ?.slice(initialProductNumber, finalProductNumber)
        .map((product) => (
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

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number,
};
// const skip = page * PRODUCT_PER_PAGE - PRODUCT_PER_PAGE;
