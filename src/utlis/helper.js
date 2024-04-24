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

  return { isValidCouponCode: true, discount: DISCOUNT_PERCENTAGE[couponCode] };
};

export const getQueryParams = (keys = []) => {
  const newSearchParams = {};

  let params = new URLSearchParams(document.location.search);
  params.forEach((value, key) => {
    if (keys.length && keys.includes(key)) {
      newSearchParams[key] = value;
      return;
    }

    if (!keys.length) {
      newSearchParams[key] = value;
    }
  });

  return newSearchParams;
};

export const sortProducts = (products, sortBy) => {
  if (sortBy === "price-asc") {
    return products.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-desc") {
    return products.sort((a, b) => b.price - a.price);
  }

  return products;
};
