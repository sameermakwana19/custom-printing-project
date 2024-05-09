import { Outlet } from "react-router-dom";
import Filter from "../pages/AllProducts/Filter/Filter";
import Category from "../pages/AllProducts/Category/Category";
import HottestDeal from "../pages/AllProducts/HottestDeals/HottestDeal";
import FilterProvider from "../context/products/FilterProvider";

const AllProductsLayout = () => {
  return (
    <FilterProvider>
      <div className="all-products">
        <div className="all-products__left">
          <Filter min={10} max={40} />
          <Category />
          <HottestDeal />
        </div>
        <Outlet />
      </div>
    </FilterProvider>
  );
};

export default AllProductsLayout;
