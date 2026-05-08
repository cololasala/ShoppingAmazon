export const deliveryDate = (deliveryDate: number, convertLocal: string) => {
  const date = new Date();
  date.setDate(date.getDate() + deliveryDate);
  return date.toLocaleDateString(convertLocal, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
