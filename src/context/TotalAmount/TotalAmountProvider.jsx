import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { getCartTotalAndNoOfItems } from "../../queries/CartQueries";
import { useUserContext } from "../User/UserContext";
import { calculateDiscount, checkCouponCode } from "../../utlis/helper";

export const TotalAmountContext = createContext();

const TotalAmountProvider = ({ children }) => {
  const { user } = useUserContext();

  const { data, isLoading, isError } = useQuery({
    enabled: !!user?.uid,
    queryKey: ["cart", "totalAmount", user?.uid],
    queryFn: () => getCartTotalAndNoOfItems(user?.uid),
  });

  const [total, setTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const value = useMemo(
    () => ({
      total,
      setTotal,
      isDiscountApplied,
      setIsDiscountApplied,
      couponCode,
      setCouponCode,
    }),
    [total, couponCode, isDiscountApplied]
  );
  useEffect(() => {
    if (data) {
      const { discount } = checkCouponCode(couponCode);
      if (total === 0) {
        setIsDiscountApplied(false);
      }

      !isDiscountApplied
        ? setTotal(data.total)
        : setTotal(data.total - calculateDiscount(data.total, discount));
    }
  }, [data, isDiscountApplied]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <TotalAmountContext.Provider value={value}>
      {children}
    </TotalAmountContext.Provider>
  );
};

export default TotalAmountProvider;
