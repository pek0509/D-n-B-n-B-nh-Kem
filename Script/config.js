export const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:4000/api"
  : "/api";

export const SHIPPING_RULES = [
  { key: "noi-thanh", label: "Nội thành TP.HCM", fee: 25000 },
  { key: "canh-tphcm", label: "Khu vực lân cận", fee: 35000 },
  { key: "hoa-toc", label: "Giao nhanh trong ngày", fee: 60000 }
];

export const PAYMENT_METHODS = [
  { value: "cod", label: "Thanh toán khi nhận hàng" },
  { value: "bank_transfer", label: "Chuyển khoản ngân hàng" },
  { value: "momo", label: "Ví MoMo" }
];

export const ORDER_STATUS_LABELS = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  baking: "Đang chuẩn bị bánh",
  shipping: "Đang giao",
  delivered: "Đã giao"
};
