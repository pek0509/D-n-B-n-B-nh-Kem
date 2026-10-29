import { API_BASE_URL } from "./config.js";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === "string"
      ? payload
      : payload.message || "Đã có lỗi xảy ra, vui lòng thử lại.";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  getProducts(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();
    return request(`/products${query ? `?${query}` : ""}`);
  },

  getProduct(slug) {
    return request(`/products/${slug}`);
  },

  login(payload) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  register(payload) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  me() {
    return request("/auth/me");
  },

  logout() {
    return request("/auth/logout", {
      method: "POST",
      body: JSON.stringify({})
    });
  },

  requestPasswordReset(payload) {
    return request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  resetPassword(payload) {
    return request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  getCart() {
    return request("/cart");
  },

  addCartItem(payload) {
    return request("/cart/items", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  updateCartItem(itemId, payload) {
    return request(`/cart/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
  },

  removeCartItem(itemId) {
    return request(`/cart/items/${itemId}`, {
      method: "DELETE"
    });
  },

  createOrder(payload) {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  getOrders() {
    return request("/orders");
  },

  submitContact(payload) {
    return request("/contact", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};
