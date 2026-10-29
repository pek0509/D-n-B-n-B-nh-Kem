import { api } from "./api.js";
import { PAYMENT_METHODS, SHIPPING_RULES, ORDER_STATUS_LABELS } from "./config.js";
import { renderShell, productCardTemplate, orderCardTemplate } from "./components.js";
import {
  calculateOrderSummary,
  debounce,
  escapeHtml,
  formatCurrency,
  getQueryParam,
  showToast,
  updateQueryParam
} from "./utils.js";

const state = {
  currentUser: null,
  products: [],
  cart: { items: [] }
};

function getLegacyAccount() {
  return {
    fullName: localStorage.getItem("registeredFullname") || "",
    email: localStorage.getItem("registeredEmail") || "",
    password: localStorage.getItem("registeredPassword") || ""
  };
}

function createLegacyResetToken(email) {
  const token = `RESET-${Date.now()}`;
  localStorage.setItem("resetPasswordEmail", email);
  localStorage.setItem("resetPasswordToken", token);
  return token;
}

function getRoot() {
  return document.body.dataset.root || ".";
}

function getPage() {
  return document.body.dataset.page || "";
}

function setAccountLink() {
  const link = document.querySelector("[data-account-link]");
  if (!link) {
    return;
  }

  if (state.currentUser) {
    link.textContent = `${state.currentUser.fullName.split(" ")[0]} / Đăng xuất`;
    link.href = "#";
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await api.logout();
        state.currentUser = null;
        window.location.href = `${getRoot()}/login.html`;
      } catch (error) {
        showToast(error.message);
      }
    }, { once: true });
  } else {
    link.textContent = "Tài khoản";
    link.href = `${getRoot()}/login.html`;
  }
}

function initShell() {
  renderShell({
    root: getRoot(),
    pageTitle: document.body.dataset.title || "Bánh ngọt thủ công mỗi ngày",
    pageDescription: document.body.dataset.description || "Tìm bánh theo tên, size, hương vị hoặc dịp đặc biệt."
  });

  const overlay = document.querySelector("[data-search-overlay]");
  document.querySelectorAll("[data-open-search]").forEach((button) => {
    button.addEventListener("click", () => overlay?.classList.add("is-open"));
  });
  document.querySelectorAll("[data-close-search]").forEach((button) => {
    button.addEventListener("click", () => overlay?.classList.remove("is-open"));
  });

  document.querySelector("[data-global-search-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = String(formData.get("keyword") || "").trim();
    window.location.href = `${getRoot()}/search.html?q=${encodeURIComponent(keyword)}`;
  });

  document.querySelector("[data-newsletter-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Đã ghi nhận email nhận ưu đãi của bạn.");
  });
}

async function bootstrapSharedData() {
  try {
    state.currentUser = await api.me();
  } catch (_error) {
    state.currentUser = null;
  }

  setAccountLink();
}

async function loadProducts(params = {}) {
  const payload = await api.getProducts(params);
  state.products = payload.items || [];
  return state.products;
}

async function loadCart() {
  if (!state.currentUser) {
    state.cart = { items: [] };
    return state.cart;
  }

  state.cart = await api.getCart();
  return state.cart;
}

function bindAddToCartButtons() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-add-product]");
    if (!button) {
      return;
    }

    if (!state.currentUser) {
      window.location.href = `${getRoot()}/login.html`;
      return;
    }

    const productSlug = button.dataset.addProduct;
    const product = state.products.find((item) => item.slug === productSlug);
    if (!product) {
      return;
    }

    try {
      await api.addCartItem({
        productId: product.id,
        quantity: 1,
        size: product.defaultSize,
        topper: "Không",
        candles: 0,
        message: "",
        deliveryDate: new Date().toISOString().slice(0, 10),
        note: ""
      });
      showToast("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      showToast(error.message);
      return;

      const legacyAccount = getLegacyAccount();

      if (!legacyAccount.email || legacyAccount.email !== email) {
        showToast(error.message);
        return;
      }

      const fallbackToken = createLegacyResetToken(email);
      document.querySelector("[data-reset-token-preview]").textContent = fallbackToken;
      showToast("Đã tạo mã reset cho tài khoản localStorage.");
    }
  });
}

function renderCatalog(products, targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) {
    return;
  }

  target.innerHTML = products.map((product) => productCardTemplate(product, getRoot())).join("");
}

async function initHomePage() {
  const products = await loadProducts({ featured: "true" });
  renderCatalog(products, "[data-featured-products]");

  const feedbackTarget = document.querySelector("[data-feedback-list]");
  if (feedbackTarget) {
    feedbackTarget.innerHTML = (products.slice(0, 3).flatMap((product) => product.reviews.slice(0, 1))).map((review) => `
      <article class="feedback-item feedback-card">
        <div class="chip mb-3">${escapeHtml(review.author)}</div>
        <p class="mb-2">"${escapeHtml(review.comment)}"</p>
        <strong>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</strong>
      </article>
    `).join("");
  }
}

async function initShopPage() {
  const products = await loadProducts();
  const filterButtons = document.querySelectorAll("[data-filter]");
  const searchInput = document.querySelector("[data-shop-search]");

  const applyFilters = () => {
    const activeCategory = document.querySelector("[data-filter].is-active")?.dataset.filter || "all";
    const keyword = String(searchInput?.value || "").trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchCategory = activeCategory === "all" || product.category === activeCategory;
      const matchKeyword = !keyword || product.name.toLowerCase().includes(keyword);
      return matchCategory && matchKeyword;
    });
    renderCatalog(filtered, "[data-shop-products]");
    document.querySelector("[data-shop-summary]").textContent = `${filtered.length} sản phẩm phù hợp`;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", debounce(applyFilters, 120));
  applyFilters();
}

async function initSearchPage() {
  const input = document.querySelector("[data-search-input]");
  const form = document.querySelector("[data-search-form]");
  const emptyState = document.querySelector("[data-search-empty]");
  const resultCounter = document.querySelector("[data-search-count]");
  const keyword = getQueryParam("q");

  if (input) {
    input.value = keyword;
  }

  const products = await loadProducts();

  const renderResults = (rawKeyword) => {
    const normalized = rawKeyword.trim().toLowerCase();
    updateQueryParam("q", rawKeyword.trim());
    const results = products.filter((product) => product.name.toLowerCase().includes(normalized));
    renderCatalog(results, "[data-search-results]");
    if (resultCounter) {
      resultCounter.textContent = normalized ? `${results.length} kết quả cho "${rawKeyword.trim()}"` : `${products.length} sản phẩm đang có`;
    }
    if (emptyState) {
      emptyState.classList.toggle("hidden", results.length > 0);
    }
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderResults(String(new FormData(form).get("keyword") || ""));
  });

  input?.addEventListener("input", debounce((event) => renderResults(event.target.value), 150));
  renderResults(keyword);
}

async function initProductPage() {
  const slug = document.body.dataset.productSlug;
  if (!slug) {
    return;
  }

  const product = await api.getProduct(slug);
  state.products = [product];

  const detailTarget = document.querySelector("[data-product-detail]");
  const reviewTarget = document.querySelector("[data-product-reviews]");
  const relatedTarget = document.querySelector("[data-related-products]");

  if (detailTarget) {
    detailTarget.innerHTML = `
      <div class="detail-grid">
        <div class="product-detail-image section-card">
          <img src="${getRoot()}/${product.image}" alt="${escapeHtml(product.name)}">
        </div>
        <div class="product-detail-body detail-card">
          <div class="chip mb-2">${escapeHtml(product.categoryLabel)}</div>
          <h1>${escapeHtml(product.name)}</h1>
          <div class="price-value mb-3">${formatCurrency(product.basePrice)}</div>
          <p class="main-copy">${escapeHtml(product.description)}</p>
          <form class="checkout-form-modern mt-4" data-product-customization>
            <div class="form-row-grid">
              <label>
                <span>Chọn size bánh</span>
                <select class="form-select-modern" name="size">
                  ${product.sizes.map((size) => `<option value="${escapeHtml(size.label)}">${escapeHtml(size.label)} - ${formatCurrency(size.price)}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>Ngày nhận bánh</span>
                <input class="form-control-modern" name="deliveryDate" type="date" required>
              </label>
            </div>
            <div class="form-row-grid">
              <label>
                <span>Topper / phụ kiện</span>
                <select class="form-select-modern" name="topper">
                  ${product.addons.map((addon) => `<option value="${escapeHtml(addon.name)}">${escapeHtml(addon.name)} ${addon.price > 0 ? `- ${formatCurrency(addon.price)}` : "- miễn phí"}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>Số lượng nến</span>
                <input class="form-control-modern" name="candles" type="number" min="0" max="10" value="0">
              </label>
            </div>
            <label>
              <span>Ghi lời chúc</span>
              <input class="form-control-modern" name="message" type="text" maxlength="120" placeholder="Ví dụ: Chúc mừng sinh nhật An">
            </label>
            <label>
              <span>Ghi chú thêm</span>
              <textarea class="form-textarea-modern" name="note" placeholder="Ít ngọt hơn, giao trước 18h, cần hóa đơn..."></textarea>
            </label>
            <button class="button-primary" type="submit">Thêm cấu hình này vào giỏ</button>
          </form>
          <div class="support-list">
            <div class="status-pill">Nhận đơn trước 18:00 để giao ngày hôm sau</div>
            <div class="status-pill">Có hỗ trợ viết thiệp và topper sinh nhật</div>
          </div>
        </div>
      </div>
    `;

    detailTarget.querySelector("[data-product-customization]")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!state.currentUser) {
        window.location.href = `${getRoot()}/login.html`;
        return;
      }

      const formData = new FormData(event.currentTarget);
      try {
        await api.addCartItem({
          productId: product.id,
          quantity: 1,
          size: String(formData.get("size") || product.defaultSize),
          topper: String(formData.get("topper") || "Không"),
          candles: Number(formData.get("candles") || 0),
          message: String(formData.get("message") || ""),
          deliveryDate: String(formData.get("deliveryDate") || ""),
          note: String(formData.get("note") || "")
        });
        showToast("Đã thêm bánh tùy chỉnh vào giỏ.");
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  if (reviewTarget) {
    reviewTarget.innerHTML = product.reviews.map((review) => `
      <article class="review-item feedback-card">
        <div class="price-row mb-2">
          <strong>${escapeHtml(review.author)}</strong>
          <span>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
        </div>
        <p class="mb-0">${escapeHtml(review.comment)}</p>
      </article>
    `).join("");
  }

  if (relatedTarget) {
    const related = (await loadProducts({ category: product.category })).filter((item) => item.slug !== product.slug).slice(0, 3);
    relatedTarget.innerHTML = related.map((item) => productCardTemplate(item, getRoot())).join("");
  }
}

async function initAuthPage() {
  const loginForm = document.querySelector("[data-login-form]");
  const registerForm = document.querySelector("[data-register-form]");
  const forgotForm = document.querySelector("[data-forgot-form]");
  const resetForm = document.querySelector("[data-reset-form]");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    try {
      await api.login({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || "")
      });
      window.location.href = `${getRoot()}/index.html`;
    } catch (error) {
      showToast(error.message);
      return;

      const legacyAccount = getLegacyAccount();

      if (!legacyAccount.email || legacyAccount.email !== email) {
        showToast(error.message);
        return;
      }

      const token = createLegacyResetToken(email);
      document.querySelector("[data-reset-token-preview]").textContent = token;
      showToast("Đã tạo mã reset cho tài khoản localStorage.");
    }
  });

  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    if (String(formData.get("password") || "") !== String(formData.get("confirmPassword") || "")) {
      showToast("Mật khẩu xác nhận chưa khớp.");
      return;
    }

    try {
      await api.register({
        fullName: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        password: String(formData.get("password") || "")
      });
      window.location.href = `${getRoot()}/index.html`;
    } catch (error) {
      showToast(error.message);
      return;

      const savedToken = localStorage.getItem("resetPasswordToken") || "";
      const savedEmail = localStorage.getItem("resetPasswordEmail") || "";
      const legacyAccount = getLegacyAccount();

      if (!savedToken || token !== savedToken || !savedEmail || savedEmail !== legacyAccount.email) {
        showToast(error.message);
        return;
      }

      localStorage.setItem("registeredPassword", newPassword);
      localStorage.removeItem("resetPasswordToken");
      localStorage.removeItem("resetPasswordEmail");
      showToast("Đổi mật khẩu thành công.");
      window.location.href = `${getRoot()}/login.html`;
    }
  });

  forgotForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(forgotForm);
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      showToast("Vui lòng nhập email tài khoản.");
      return;
    }
    try {
      const result = await api.requestPasswordReset({ email });
      document.querySelector("[data-reset-token-preview]").textContent = result.mockResetToken || "";
      showToast("Đã tạo yêu cầu đổi mật khẩu. Với môi trường demo, token được hiển thị ngay trên trang.");
    } catch (error) {
      const fallbackAccount = getLegacyAccount();

      if (!fallbackAccount.email || fallbackAccount.email !== email) {
        showToast(error.message);
        return;
      }

      const fallbackToken = createLegacyResetToken(email);
      document.querySelector("[data-reset-token-preview]").textContent = fallbackToken;
      showToast("Đã tạo mã reset cho tài khoản localStorage.");
      return;

      const savedToken = localStorage.getItem("resetPasswordToken") || "";
      const savedEmail = localStorage.getItem("resetPasswordEmail") || "";
      const legacyAccount = getLegacyAccount();

      if (!savedToken || token !== savedToken || !savedEmail || savedEmail !== legacyAccount.email) {
        showToast(error.message);
        return;
      }

      localStorage.setItem("registeredPassword", newPassword);
      localStorage.removeItem("resetPasswordToken");
      localStorage.removeItem("resetPasswordEmail");
      showToast("Đổi mật khẩu thành công.");
      window.location.href = `${getRoot()}/login.html`;
    }
  });

  resetForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(resetForm);
    const token = String(formData.get("token") || "").trim();
    const newPassword = String(formData.get("newPassword") || "").trim();

    if (!token || !newPassword) {
      showToast("Vui lòng nhập token và mật khẩu mới.");
      return;
    }

    if (newPassword.length < 6) {
      showToast("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      await api.resetPassword({
        token,
        newPassword
      });
      showToast("Đổi mật khẩu thành công.");
      window.location.href = `${getRoot()}/login.html`;
    } catch (error) {
      const savedToken = localStorage.getItem("resetPasswordToken") || "";
      const savedEmail = localStorage.getItem("resetPasswordEmail") || "";
      const legacyAccount = getLegacyAccount();

      if (!savedToken || token !== savedToken || !savedEmail || savedEmail !== legacyAccount.email) {
        showToast(error.message);
        return;
      }

      localStorage.setItem("registeredPassword", newPassword);
      localStorage.removeItem("resetPasswordToken");
      localStorage.removeItem("resetPasswordEmail");
      showToast("Đổi mật khẩu thành công.");
      window.location.href = `${getRoot()}/login.html`;
    }
  });
}

async function initCartPage() {
  await loadCart();
  const list = document.querySelector("[data-cart-items]");
  const summary = document.querySelector("[data-cart-summary]");

  if (!list || !summary) {
    return;
  }

  const render = () => {
    if (!state.cart.items.length) {
      list.innerHTML = `<div class="empty-state">Giỏ hàng đang trống. Hãy chọn một chiếc bánh cho dịp đặc biệt của bạn.</div>`;
      summary.innerHTML = `
        <div class="summary-row"><span>Tạm tính</span><strong>${formatCurrency(0)}</strong></div>
        <div class="summary-row"><span>Phí ship</span><strong>${formatCurrency(0)}</strong></div>
        <div class="summary-row"><span>Tổng cộng</span><strong>${formatCurrency(0)}</strong></div>
      `;
      return;
    }

    list.innerHTML = state.cart.items.map((item) => `
      <article class="cart-item section-card">
        <div class="cart-item-image"><img src="${getRoot()}/${item.productImage}" alt="${escapeHtml(item.productName)}"></div>
        <div>
          <h3>${escapeHtml(item.productName)}</h3>
          <p class="meta-text mb-2">Size ${escapeHtml(item.size)} • ${escapeHtml(item.topper)} • Nến: ${item.candles}</p>
          <p class="meta-text mb-2">Lời chúc: ${escapeHtml(item.message || "Không có")}</p>
          <div class="cart-item-controls">
            <input class="quantity-input" type="number" min="1" value="${item.quantity}" data-cart-qty="${item.id}">
            <span>${formatCurrency(item.lineTotal)}</span>
            <button class="button-ghost" type="button" data-remove-cart-item="${item.id}">Xóa</button>
          </div>
        </div>
      </article>
    `).join("");

    const totals = calculateOrderSummary(state.cart.items, state.cart.shippingFee || 0);
    summary.innerHTML = `
      <div class="summary-row"><span>Tạm tính</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
      <div class="summary-row"><span>Phí ship hiện tại</span><strong>${formatCurrency(totals.shippingFee)}</strong></div>
      <div class="summary-row"><span>Tổng cộng</span><strong>${formatCurrency(totals.total)}</strong></div>
      <a class="button-primary w-100 mt-3" href="${getRoot()}/checkout.html">Tiến hành thanh toán</a>
    `;
  };

  list.addEventListener("change", async (event) => {
    const input = event.target.closest("[data-cart-qty]");
    if (!input) {
      return;
    }
    try {
      const itemId = input.dataset.cartQty;
      await api.updateCartItem(itemId, { quantity: Number(input.value || 1) });
      await loadCart();
      render();
    } catch (error) {
      showToast(error.message);
    }
  });

  list.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-remove-cart-item]");
    if (!button) {
      return;
    }
    try {
      await api.removeCartItem(button.dataset.removeCartItem);
      await loadCart();
      render();
    } catch (error) {
      showToast(error.message);
    }
  });

  render();
}

async function initCheckoutPage() {
  await loadCart();
  if (!state.currentUser) {
    window.location.href = `${getRoot()}/login.html`;
    return;
  }

  const summaryTarget = document.querySelector("[data-checkout-summary]");
  const shippingSelect = document.querySelector("[data-shipping-select]");
  const paymentSelect = document.querySelector("[data-payment-select]");
  const form = document.querySelector("[data-checkout-form]");

  if (shippingSelect) {
    shippingSelect.innerHTML = SHIPPING_RULES.map((rule) => `<option value="${rule.key}">${rule.label} - ${formatCurrency(rule.fee)}</option>`).join("");
  }
  if (paymentSelect) {
    paymentSelect.innerHTML = PAYMENT_METHODS.map((item) => `<option value="${item.value}">${item.label}</option>`).join("");
  }

  const renderSummary = () => {
    const selectedRule = SHIPPING_RULES.find((item) => item.key === shippingSelect?.value) || SHIPPING_RULES[0];
    const totals = calculateOrderSummary(state.cart.items, selectedRule.fee);
    summaryTarget.innerHTML = `
      ${state.cart.items.map((item) => `
        <div class="summary-row mb-2">
          <span>${escapeHtml(item.productName)} x${item.quantity}</span>
          <strong>${formatCurrency(item.lineTotal)}</strong>
        </div>
      `).join("")}
      <hr>
      <div class="summary-row"><span>Tạm tính</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
      <div class="summary-row"><span>Vận chuyển</span><strong>${formatCurrency(selectedRule.fee)}</strong></div>
      <div class="summary-row"><span>Tổng thanh toán</span><strong>${formatCurrency(totals.total)}</strong></div>
    `;
  };

  shippingSelect?.addEventListener("change", renderSummary);
  renderSummary();

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      await api.createOrder({
        shippingMethod: String(formData.get("shippingMethod") || ""),
        paymentMethod: String(formData.get("paymentMethod") || ""),
        recipientName: String(formData.get("recipientName") || ""),
        recipientPhone: String(formData.get("recipientPhone") || ""),
        deliveryDate: String(formData.get("deliveryDate") || ""),
        addressLine: String(formData.get("addressLine") || ""),
        district: String(formData.get("district") || ""),
        city: String(formData.get("city") || ""),
        note: String(formData.get("note") || "")
      });
      showToast("Đơn hàng đã được tạo và chờ xác nhận.");
      window.location.href = `${getRoot()}/history.html`;
    } catch (error) {
      showToast(error.message);
    }
  });
}

async function initHistoryPage() {
  if (!state.currentUser) {
    window.location.href = `${getRoot()}/login.html`;
    return;
  }

  const orders = await api.getOrders();
  const target = document.querySelector("[data-order-history]");
  if (!target) {
    return;
  }

  if (!orders.items.length) {
    target.innerHTML = `<div class="empty-state">Bạn chưa có đơn hàng nào. Sau khi thanh toán, trạng thái đơn sẽ hiển thị tại đây.</div>`;
    return;
  }

  const normalized = orders.items.map((order) => ({
    ...order,
    statusLabel: ORDER_STATUS_LABELS[order.status] || "Đang xử lý"
  }));
  target.innerHTML = normalized.map(orderCardTemplate).join("");
}

function initContentOnlyPage() {
  const target = document.querySelector("[data-article-list]");
  if (!target) {
    return;
  }

  target.innerHTML = `
    <article class="article-item article-card">
      <div class="chip mb-2">Kinh nghiệm đặt bánh</div>
      <h3>Đặt bánh sinh nhật trước bao lâu là hợp lý?</h3>
      <p class="mb-0">Với bánh cần vẽ hoặc topper riêng, Donkery khuyên đặt trước tối thiểu 24-48 giờ để giữ đúng khung giao và chất lượng trang trí.</p>
    </article>
    <article class="article-item article-card">
      <div class="chip mb-2">Mẹo bảo quản</div>
      <h3>Cách giữ bánh mousse mềm mịn sau khi nhận</h3>
      <p class="mb-0">Bảo quản ngăn mát 2-6°C, lấy bánh ra trước khi dùng 15-20 phút để lớp kem và cốt bánh đạt kết cấu ngon nhất.</p>
    </article>
    <article class="article-item article-card">
      <div class="chip mb-2">Feedback khách hàng</div>
      <h3>Hương vị ít ngọt đang được yêu thích</h3>
      <p class="mb-0">Các dòng tiramisu, berry mousse và bánh kem ít ngọt là lựa chọn nổi bật cho khách đặt sinh nhật công ty và tiệc gia đình.</p>
    </article>
  `;
}

function initContactPage() {
  const form = document.querySelector("[data-contact-form]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      await api.submitContact({
        fullName: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || "")
      });
      form.reset();
      showToast("Donkery đã nhận liên hệ của bạn.");
    } catch (error) {
      showToast(error.message);
    }
  });
}

async function initPage() {
  initShell();
  bindAddToCartButtons();
  await bootstrapSharedData();

  switch (getPage()) {
    case "home":
      await initHomePage();
      break;
    case "shop":
      await initShopPage();
      break;
    case "search":
      await initSearchPage();
      break;
    case "product":
      await initProductPage();
      break;
    case "auth":
      await initAuthPage();
      break;
    case "cart":
      await initCartPage();
      break;
    case "checkout":
      await initCheckoutPage();
      break;
    case "history":
      await initHistoryPage();
      break;
    case "contact":
      initContactPage();
      break;
    case "news":
    case "about":
      initContentOnlyPage();
      break;
    default:
      break;
  }
}

initPage().catch((error) => {
  console.error(error);
  showToast("Không thể tải dữ liệu từ backend. Hãy kiểm tra server và database.");
});
