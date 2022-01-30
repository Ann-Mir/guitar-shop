const SIGNS_TO_SEPARATE = 3;

export const formatPrice = (price: number): string => {
  const currentPrice = price.toString();
  const length = currentPrice.length;

  if (length <= SIGNS_TO_SEPARATE) {
    return currentPrice;
  }

  return `${currentPrice.slice(0, length - SIGNS_TO_SEPARATE)} ${currentPrice.slice(length - SIGNS_TO_SEPARATE)}`;
};
