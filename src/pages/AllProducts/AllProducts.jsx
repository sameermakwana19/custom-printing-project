import React, { useState } from "react";
import BreadCrumb from "../../components/ui/BreadCrumb/BreadCrumb";
import ProductCard from "../../components/ProductCard/ProductCard";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import Filter from "./Filter/Filter";
import Category from "./Category/Category";
import HottestDeal from "./HottestDeals/HottestDeal";

const PRODUCT_PER_PAGE = 9;

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(50);

  const skip = page * PRODUCT_PER_PAGE - PRODUCT_PER_PAGE;

  const title = useCurrentLocation();

  let pageNumbersArray = Array(
    Math.ceil(totalProducts / PRODUCT_PER_PAGE)
  ).fill(0);
  pageNumbersArray = pageNumbersArray.map((_, index) => index + 1);

  const changePage = (nextPage) => {
    if (nextPage <= 0 || nextPage > pageNumbersArray.length) {
      return;
    }
    setPage(nextPage);
  };

  return (
    <>
      <div className="all-products">
        <div className="all-products__left">
          <Filter min={10} max={40} />
          <Category />
          <HottestDeal />
        </div>
        <div className="all-products__right">
          <header>
            <BreadCrumb />
            <div className="heading">
              <p>{title}</p>
            </div>
          </header>
          <main>
            <ContentDetails />
            <div className="product-container">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <ProductCard
                  key={item}
                  isOnSale={
                    [1, 5, 9, 3].indexOf(index + 1) !== -1 ? true : false
                  }
                />
              ))}
            </div>
          </main>
          <PageNumbersButtons
            page={page}
            changePage={changePage}
            pageNumbersArray={pageNumbersArray}
          />
        </div>
      </div>
    </>
  );
};

export default AllProducts;

function ContentDetails({}) {
  return (
    <div className="content-details">
      <div className="current-page">Showing 1-9 of 11 </div>
      <div className="sort-by">
        <select name="sortby">
          <option value="">Default Sort</option>
          <option value="low-to-high-price">Sort by rice : low to high</option>
          <option value="low-to-high-price">Sort by rice : low to high</option>
          <option value="high-to-low-price">Sort by rice : high to low</option>
          <option value="latest">Sort by latest</option>
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
