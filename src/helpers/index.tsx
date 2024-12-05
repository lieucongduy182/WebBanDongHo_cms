export const ConvertPrice = (price: number): string => {
  if (!price || price === 0) {
    return "Miễn phí";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
