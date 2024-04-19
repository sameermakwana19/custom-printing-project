import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Cart from "../pages/Cart/Cart";
import AllProducts from "../pages/AllProducts/AllProducts";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import Product from "../pages/Product/Product";
import AllProductsLayout from "../layout/AllProductsLayout";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="About" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="allproducts" element={<AllProductsLayout />}>
          <Route index element={<AllProducts />} />
          {/* <Route path="tshirts" element={<AllProducts />} />
          <Route path="mugs" element={<AllProducts />} /> */}
          <Route path=":category" element={<AllProducts />} />
          {/* <Route path=":category/:id" element={<Product />} /> */}
          {/* <Route path=":id" element={<Product />} /> */}
        </Route>

        <Route path="/mugs/:id" element={<Product />} />
        <Route path="/t-shirts/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
