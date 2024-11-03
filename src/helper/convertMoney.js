const convertMoney = (value) => {
  let VNMoney = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  });
  let formattedPrice = VNMoney.format(value)
    .replace(/,/g, ".")
    .replace("₫", "");
  return formattedPrice;
};

export default convertMoney;
