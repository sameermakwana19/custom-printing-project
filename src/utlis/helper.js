export const twoDigitAfterDecimal = (number) => {
  return number.toFixed(2);
};

export const calculateDiscount = (total, discountPercentage) => {
  return (total * discountPercentage) / 100;
};
export const checkCouponCode = (couponCode) => {
  const DISCOUNT_PERCENTAGE = {
    ZURU20: 20,
    ZURU50: 50,
    ZURU70: 70,
  };

  if (!DISCOUNT_PERCENTAGE[couponCode]) {
    return { isValidCouponCode: false, discount: false };
  }

  // const payableAmount = calculateDiscount(
  //   total,
  //   DISCOUNT_PERCENTAGE[couponCode]
  // );

  return { isValidCouponCode: true, discount: DISCOUNT_PERCENTAGE[couponCode] };
};
