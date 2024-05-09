import ProductTable from "./ProductTable/ProductTable";
import CartTotalTable from "./CartTotalTable/CartTotalTable";
import ProductTableMobileView from "./ProductTableMoblieView/ProductTableMobileView";
import withAuth from "../../hoc/withAuth";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="cart">
        <ProductTable />
        <ProductTableMobileView />
        <CartTotalTable />
      </div>
    </div>
  );
};

const WithAuthCart = withAuth(Cart);
export default WithAuthCart;
