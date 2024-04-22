import { useQuery } from "@tanstack/react-query";
import { query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { getCartTotalAndNoOfItems } from "../../queries/CartQueries";

export const TotalAmountContext = createContext();

const TotalAmountProvider = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", "totalAmount"],
    queryFn: getCartTotalAndNoOfItems,
  });

  const [total, setTotal] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <TotalAmountContext.Provider
      value={{ total, setTotal, isDiscountApplied, setIsDiscountApplied }}
    >
      {children}
    </TotalAmountContext.Provider>
  );
};

export default TotalAmountProvider;
