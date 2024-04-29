import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { getCartTotalAndNoOfItems } from "../../queries/CartQueries";
import { useUserContext } from "../User/UserContext";

export const TotalAmountContext = createContext();

const TotalAmountProvider = ({ children }) => {
  const { user } = useUserContext();
  const { data, isLoading, isError } = useQuery({
    enabled: !!user,
    queryKey: ["cart", "totalAmount"],
    queryFn: getCartTotalAndNoOfItems,
  });

  const [total, setTotal] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  useEffect(() => {
    if (data) {
      setTotal(data?.total);
    }
  }, [data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error...</div>;
  // }

  return (
    <TotalAmountContext.Provider
      value={{ total, setTotal, isDiscountApplied, setIsDiscountApplied }}
    >
      {children}
    </TotalAmountContext.Provider>
  );
};

export default TotalAmountProvider;
