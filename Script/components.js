import { escapeHtml, formatCurrency } from "./utils.js";

export function renderShell({ root = ".", pageTitle = "", pageDescription = "" }) {
  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");

  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="page-hero py-4">
        <div class="container">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <a class="d-flex align-items-center gap-3 text-white text-decoration-none" href="${root}/index.html">
              <img src="${root}/assets/img/logo.png" alt="Donkery" width="72">
              <div>
                <div class="topbar-chip">The 180°C Bakery</div>
                <div class="mt-2 main-copy">${escapeHtml(pageTitle || "Bánh ngọt thủ công mỗi ngày")}</div>
              </div>
            </a>
            <nav class="d-flex flex-wrap gap-2">
              <a class="button-secondary" href="${root}/index.html">Trang chủ</a>
              <a class="button-secondary" href="${root}/shop.html">Sản phẩm</a>
              <a class="button-secondary" href="${root}/search.html">Tìm kiếm</a>
              <a class="button-secondary" href="${root}/history.html">Đơn hàng</a>
              <a class="button-secondary" href="${root}/contact.html">Liên hệ</a>
              <a class="button-primary" href="${root}/login.html" data-account-link>Tài khoản</a>
              <button class="button-ghost" type="button" data-open-search>Tìm nhanh</button>
            </nav>
          </div>
        </div>
      </header>
      <div class="search-overlay" data-search-overlay>
        <div class="search-overlay-card">
          <button class="overlay-close" type="button" data-close-search aria-label="Đóng">×</button>
          <h3 class="mb-3">Tìm bánh theo tên</h3>
          <form class="site-search-form" data-global-search-form>
            <input class="form-control-modern" name="keyword" type="search" placeholder="Ví dụ: Matcha, mousse, chocolate">
            <button class="button-primary" type="submit">Đi tới trang tìm kiếm</button>
          </form>
          <p class="muted-text mt-3 mb-0">${escapeHtml(pageDescription)}</p>
        </div>
      </div>
    `;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <section>
              <h4>The 180°C</h4>
              <p class="mb-0">Bánh kem, tiramisu và quà tặng ngọt ngào cho sinh nhật, kỷ niệm và những dịp cần một chiếc bánh tử tế.</p>
            </section>
            <section>
              <h4>Liên hệ</h4>
              <p class="mb-1">273 An Dương Vương, Quận 5, TP.HCM</p>
              <p class="mb-1">Hotline: 0901 800 180</p>
              <p class="mb-0">Email: hello@the180c.vn</p>
            </section>
            <section>
              <h4>Điều hướng</h4>
              <div class="d-grid gap-2">
                <a href="${root}/about.html">Giới thiệu</a>
                <a href="${root}/news.html">Tin tức bánh ngọt</a>
                <a href="${root}/checkout.html">Thanh toán</a>
                <a href="${root}/reset-password.html">Quên mật khẩu</a>
              </div>
            </section>
            <section>
              <h4>Ưu đãi mới</h4>
              <form class="newsletter-form" data-newsletter-form>
                <input class="form-control-modern" type="email" placeholder="Email nhận ưu đãi">
                <button class="button-primary" type="submit">Đăng ký</button>
              </form>
            </section>
          </div>
          <div class="footer-bottom">© 2026 The 180°C Bakery. Thiết kế lại cho trải nghiệm mua bánh thực tế hơn.</div>
        </div>
      </footer>
    `;
  }
}

export function productCardTemplate(product, root = ".") {
  return `
    <article class="product-card section-card">
      <a class="media-wrap" href="${root}/Product/${product.detailPage}">
        <img src="${root}/${product.image}" alt="${escapeHtml(product.name)}">
      </a>
      <div class="product-card-body">
        <div class="chip mb-2">${escapeHtml(product.categoryLabel)}</div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="meta-text">${escapeHtml(product.shortDescription)}</p>
        <div class="price-row mt-3">
          <span>${escapeHtml(product.sizeSummary)}</span>
          <span class="price-value">${formatCurrency(product.basePrice)}</span>
        </div>
        <div class="product-actions">
          <a class="button-secondary" href="${root}/Product/${product.detailPage}">Xem chi tiết</a>
          <button class="button-primary" type="button" data-add-product="${product.slug}">Thêm vào giỏ</button>
        </div>
      </div>
    </article>
  `;
}

export function orderCardTemplate(order) {
  const itemsHtml = order.items.map((item) => `
    <div class="history-row">
      <span>${escapeHtml(item.productName)} x${item.quantity}</span>
      <strong>${formatCurrency(item.lineTotal)}</strong>
    </div>
  `).join("");

  return `
    <article class="history-item section-card">
      <div>
        <div class="status-pill ${escapeHtml(order.status)}">${escapeHtml(order.statusLabel)}</div>
        <h3 class="mt-3 mb-1">Đơn #${escapeHtml(order.orderCode)}</h3>
        <p class="meta-text mb-0">Nhận hàng ngày ${escapeHtml(order.deliveryDate || "--")}</p>
      </div>
      <div>
        ${itemsHtml}
        <hr>
        <div class="history-row">
          <span>Tổng thanh toán</span>
          <strong>${formatCurrency(order.total)}</strong>
        </div>
      </div>
    </article>
  `;
}
