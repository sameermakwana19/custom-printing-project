import React from "react";
import { useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const { pathname } = useLocation();

  const initialStr = "home";

  const array = pathname.split("/");

  const breadCrumbStr = array.reduce(
    (acc, curr) => (curr === "" ? acc : `${acc} / ${curr}`),
    initialStr
  );

  return (
    <>
      {" "}
      <div className="breadcrumb">
        <p>{breadCrumbStr}</p>
      </div>
    </>
  );
};

export default BreadCrumb;
