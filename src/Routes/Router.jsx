import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/"></Route>)
  );

  return <div>Router</div>;
};

export default Router;
