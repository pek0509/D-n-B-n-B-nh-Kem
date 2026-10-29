(function ($) {
    "use strict";


    $(document).ready(function () {


        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: false,
                    loop: true
                }
            }
        });


        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    loop: true
                },
                600: {
                    items: 1,
                    nav: true,
                    loop: true
                },
                1000: {
                    items: 1,
                    nav: true,
                    loop: true
                }
            }
        });


        // count down
        if ($('.time-countdown').length) {
            $('.time-countdown').each(function () {
                var $this = $(this), finalDate = $(this).data('countdown');
                $this.countdown(finalDate, function (event) {
                    var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
                });
            });
        }


        // projects filters isotop
        var categoryHashMap = {
            'tat-ca': '*',
            'tiramisu': '.Tiramisu',
            'banh-kem': '.BanhKem',
            'banh-hop-thiec': '.BBanhHopThiec',
            'banh-nuong': '.BanhNuong',
            'thuc-uong': '.DoUong',
            'khac': '.Khac'
        };


        function scrollToShopSection() {
            var shopSection = document.getElementById('tat-ca') || document.querySelector('.product-section');
            if (!shopSection) return;

            var header = document.getElementById('sticker');
            var headerHeight = header ? header.offsetHeight : 0;
            var top = shopSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

            window.scrollTo({
                top: Math.max(top, 0),
                behavior: 'smooth'
            });
        }


        function applyShopCategory(hash, scrollToSection) {
            if (!hash) return;
            var selector = categoryHashMap[hash];
            if (!selector) return;


            $(".product-filters li").removeClass("active");
            $(".product-filters li[data-filter='" + selector + "']").addClass("active");


            $(".product-lists").isotope({
                filter: selector,
            });


            if (scrollToSection) {
                setTimeout(scrollToShopSection, 350);
            }
        }


        $(".product-filters li").on('click', function () {
    $(".product-filters li").removeClass("active");
    $(this).addClass("active");
    var selector = $(this).attr('data-filter');
    $(".product-lists").isotope({
        itemSelector: '.product-lists > div',
        layoutMode: 'fitRows',
        filter: selector,
    });
});

        $(".dropdown-item").on('mouseenter', function () {
            var href = $(this).attr('href');
            if (!href) return;
            var hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;
            var hash = href.slice(hashIndex + 1);
            var selector = categoryHashMap[hash];
            if (!selector) return;


            $(".product-filters li").removeClass("hovered");
            $(".product-filters li[data-filter='" + selector + "']").addClass("hovered");
        }).on('mouseleave', function () {
            $(".product-filters li").removeClass("hovered");
        });


        $(".dropdown-item").on('click', function (event) {
            var href = $(this).attr('href');
            if (!href) return;
            var linkUrl = new URL(href, window.location.href);
            if (linkUrl.pathname === window.location.pathname) {
                var hash = linkUrl.hash.replace('#', '');
                if (hash) {
                    event.preventDefault();
                    applyShopCategory(hash, true);
                    window.history.replaceState(null, null, '#' + hash);
                }
            }
        });


        // isotop inner - chỉ chạy khi KHÔNG phải trang tìm kiếm
if (window.location.pathname.toLowerCase().indexOf('timkiem.html') === -1) {
    $(".product-lists").isotope({
        itemSelector: '.product-lists > div',
        layoutMode: 'fitRows'
    });
}


        if (window.location.hash) {
            var currentHash = window.location.hash.replace('#', '');
            applyShopCategory(currentHash, true);
        }


        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });


        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });


        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function () {
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({ 'opacity': '0' });
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({ 'opacity': '0', 'animation-delay': '0.3s' });
            $(".hero-btns").removeClass("animated fadeInUp").css({ 'opacity': '0', 'animation-delay': '0.5s' });
        });


        $(".homepage-slider").on("translated.owl.carousel", function () {
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({ 'opacity': '0' });
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({ 'opacity': '0', 'animation-delay': '0.3s' });
            $(".hero-btns").addClass("animated fadeInUp").css({ 'opacity': '0', 'animation-delay': '0.5s' });
        });

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });


        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        // Highlight mục được chọn trong mobile menu
$(document).on('click', '.mean-nav ul li a:not(.mean-expand)', function() {
    $('.mean-nav ul li a').removeClass('mean-active');
    $(this).addClass('mean-active');
});

        // Intercept any in-site hash links that point to product categories
        $(document).on('click', '.main-menu a[href*="#"], .mean-nav a[href*="#"]', function(e) {
            var href = $(this).attr('href');
            if (!href) return;
            var linkUrl = new URL(href, window.location.href);
            if (linkUrl.pathname === window.location.pathname) {
                var hash = linkUrl.hash.replace('#', '');
                if (!hash) return;
                var selector = categoryHashMap[hash];
                // If this hash maps to a product category, use isotope filter + smooth scroll
                if (selector) {
                    e.preventDefault();
                    applyShopCategory(hash, true);
                    // update URL without reloading
                    window.history.replaceState(null, null, '#' + hash);
                    // close meanmenu if open (mobile)
                    if ($('.meanmenu-reveal').length && $('.meanmenu-reveal').is(':visible')) {
                        $('.meanmenu-reveal').trigger('click');
                    }
                }
            }
        });

        // highlight current page menu item
        (function() {
            var currentFile = window.location.pathname.split('/').pop();
            if (!currentFile) {
                currentFile = 'index.html';
            }
            currentFile = currentFile.toLowerCase();


            var $menuLinks = $('.main-menu li a[href]').filter(function() {
                var href = $(this).attr('href').split('?')[0].split('#')[0].toLowerCase();
                return href && href !== '#' && href === currentFile;
            });


            if ($menuLinks.length) {
                $('.main-menu li.current-list-item').removeClass('current-list-item');
                $menuLinks.each(function() {
                    var $link = $(this);
                    $link.closest('li').addClass('current-list-item');
                    $link.parents('li').addClass('current-list-item');
                });
            }
        })();


        // search form
        function getSearchPageUrl(keyword) {
            var inProductDirectory = window.location.pathname.toLowerCase().indexOf('/product/') !== -1;
            var basePath = inProductDirectory ? '../timkiem.html' : 'timkiem.html';
            if (!keyword) {
                return basePath;
            }
            return basePath + '?keyword=' + encodeURIComponent(keyword);
        }


        function applySearchResults(keyword) {
    var normalizedKeyword = (keyword || '').trim().toLowerCase();
    var productItems = document.querySelectorAll('.product-page > div');
    var summary = document.querySelector('.search-result-summary');
    var emptyMessage = document.querySelector('.search-empty-message');
    var visibleCount = 0;

    if (!productItems.length) return;

    productItems.forEach(function(item) {
        var productName = '';
        var titleElement = item.querySelector('h3');
        if (titleElement) {
            productName = titleElement.textContent.trim().toLowerCase();
        }

        var isVisible = !normalizedKeyword || productName.indexOf(normalizedKeyword) !== -1;

        // Reset hoàn toàn rồi set lại
        item.removeAttribute('style');
        item.classList.remove('d-none');

        if (!isVisible) {
            item.classList.add('d-none');
        } else {
            visibleCount += 1;
        }
    });

    if (summary) {
        summary.textContent = normalizedKeyword
            ? 'Từ khóa: "' + keyword.trim() + '" - ' + visibleCount + ' kết quả'
            : 'Hiển thị tất cả sản phẩm.';
    }

    if (emptyMessage) {
        emptyMessage.style.display = visibleCount ? 'none' : 'block';
    }
    
    
}

        function submitSearch() {
            var input = document.querySelector('.search-area .search-bar input');
            var keyword = input ? input.value.trim() : '';
            window.location.href = getSearchPageUrl(keyword);
        }


        $(".search-bar-icon").on("click", function (event) {
            event.preventDefault();
            $(".search-area").addClass("search-active");
            var searchInput = document.querySelector('.search-area .search-bar input');
            if (searchInput) {
                setTimeout(function () {
                    searchInput.focus();
                }, 100);
            }
        });


        $(".close-btn").on("click", function () {
            $(".search-area").removeClass("search-active");
        });


        $(".search-submit-btn").on("click", function () {
            submitSearch();
        });


        $(".search-area .search-bar input").on("keydown", function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitSearch();
            }
        });


        if (window.location.pathname.toLowerCase().indexOf('timkiem.html') !== -1) {
            var urlParams = new URLSearchParams(window.location.search);
            var searchKeyword = (urlParams.get('keyword') || '').trim();
            var searchPageInput = document.querySelector('.search-area .search-bar input');


            if (searchPageInput) {
                searchPageInput.value = searchKeyword;
                searchPageInput.addEventListener('input', function () {
                    var liveKeyword = searchPageInput.value.trim();
                    applySearchResults(liveKeyword);
                    var nextUrl = liveKeyword ? '?keyword=' + encodeURIComponent(liveKeyword) : window.location.pathname.split('/').pop();
                    window.history.replaceState({}, '', nextUrl);
                });
            }


            applySearchResults(searchKeyword);
        }


        // Lấy các phần tử cần thiết
        console.log('Initializing checkout dropdowns...');
        const provinceInput = document.getElementById('province-input');
        const provinceList = document.getElementById('province-list');
        const provinceItems = document.querySelectorAll('.province-item');


        console.log('Province input found:', !!provinceInput);
        console.log('Province list found:', !!provinceList);
        console.log('Province items found:', provinceItems.length);


        const districtDataByProvince = {
            'An Giang': ['Thành phố Long Xuyên', 'Thành phố Châu Đốc', 'Thị xã Tân Châu', 'Huyện Chợ Mới', 'Huyện Thoại Sơn'],
            'Bà Rịa - Vũng Tàu': ['Thành phố Vũng Tàu', 'Thành phố Bà Rịa', 'Thị xã Phú Mỹ', 'Huyện Châu Đức', 'Huyện Xuyên Mộc'],
            'Bình Dương': ['Thành phố Thủ Dầu Một', 'Thành phố Dĩ An', 'Thành phố Thuận An', 'Thành phố Tân Uyên', 'Thành phố Bến Cát'],
            'Cần Thơ': ['Quận Ninh Kiều', 'Quận Bình Thủy', 'Quận Cái Răng', 'Quận Ô Môn', 'Quận Thốt Nốt'],
            'Đà Nẵng': ['Quận Hải Châu', 'Quận Thanh Khê', 'Quận Sơn Trà', 'Quận Ngũ Hành Sơn', 'Huyện Hòa Vang'],
            'Đồng Nai': ['Thành phố Biên Hòa', 'Thành phố Long Khánh', 'Huyện Long Thành', 'Huyện Nhơn Trạch', 'Huyện Trảng Bom'],
            'Đồng Tháp': ['Thành phố Cao Lãnh', 'Thành phố Sa Đéc', 'Thành phố Hồng Ngự', 'Huyện Lấp Vò', 'Huyện Châu Thành'],
            'Hà Nội': ['Quận Ba Đình', 'Quận Hoàn Kiếm', 'Quận Cầu Giấy', 'Quận Hà Đông', 'Huyện Đông Anh'],
            'Hải Dương': ['Thành phố Hải Dương', 'Thành phố Chí Linh', 'Thị xã Kinh Môn', 'Huyện Nam Sách', 'Huyện Tứ Kỳ'],
            'Hải Phòng': ['Quận Hồng Bàng', 'Quận Lê Chân', 'Quận Ngô Quyền', 'Quận Kiến An', 'Thành phố Thủy Nguyên'],
            'Khánh Hòa': ['Thành phố Nha Trang', 'Thành phố Cam Ranh', 'Thị xã Ninh Hòa', 'Huyện Diên Khánh', 'Huyện Cam Lâm'],
            'Kiên Giang': ['Thành phố Rạch Giá', 'Thành phố Phú Quốc', 'Thành phố Hà Tiên', 'Huyện Châu Thành', 'Huyện Kiên Lương'],
            'Lâm Đồng': ['Thành phố Đà Lạt', 'Thành phố Bảo Lộc', 'Huyện Đức Trọng', 'Huyện Di Linh', 'Huyện Lạc Dương'],
            'Long An': ['Thành phố Tân An', 'Thị xã Kiến Tường', 'Huyện Bến Lức', 'Huyện Cần Giuộc', 'Huyện Đức Hòa'],
            'Nghệ An': ['Thành phố Vinh', 'Thành phố Hoàng Mai', 'Thị xã Thái Hòa', 'Huyện Diễn Châu', 'Huyện Nghi Lộc'],
            'Thanh Hóa': ['Thành phố Thanh Hóa', 'Thành phố Sầm Sơn', 'Thị xã Bỉm Sơn', 'Thị xã Nghi Sơn', 'Huyện Hoằng Hóa'],
            'Thành phố Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 7', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Thành phố Thủ Đức', 'Xã Củ Chi', 'Xã Hóc Môn', 'Xã Bình Chánh', 'Xã Nhà Bè', 'Xã Cần Giờ'],
            'Thừa Thiên Huế': ['Quận Phú Xuân', 'Quận Thuận Hóa', 'Thị xã Hương Thủy', 'Thị xã Hương Trà', 'Huyện Phú Vang']
        };


        function filterDropdownItems(items, keyword) {
            const normalizedKeyword = (keyword || '').trim().toLowerCase();
            let visibleCount = 0;

            items.forEach((item) => {
                const matched = !normalizedKeyword || item.textContent.toLowerCase().indexOf(normalizedKeyword) !== -1;
                item.style.display = matched ? '' : 'none';
                if (matched) {
                    visibleCount += 1;
                }
            });

            return visibleCount;
        }


        function renderDistrictOptions(provinceName) {
            if (!districtList) return;

            const options = districtDataByProvince[provinceName] || (provinceName ? [
                'Trung tâm ' + provinceName,
                'Khu vực nội thành ' + provinceName,
                'Khu vực ngoại thành ' + provinceName
            ] : []);
            districtList.innerHTML = '';

            if (!options.length) {
                const emptyItem = document.createElement('li');
                emptyItem.className = 'district-item district-item-disabled';
                emptyItem.textContent = provinceName
                    ? 'Chưa có gợi ý cho tỉnh này, vui lòng nhập quận/xã cụ thể.'
                    : 'Vui lòng chọn tỉnh/thành phố trước.';
                emptyItem.dataset.disabled = 'true';
                emptyItem.style.cursor = 'default';
                emptyItem.style.color = '#777';
                districtList.appendChild(emptyItem);
                return;
            }

            options.forEach(function(name, index) {
                const item = document.createElement('li');
                item.className = 'district-item';
                item.dataset.index = String(index + 1);
                item.textContent = name;
                districtList.appendChild(item);
            });
        }


        function getAvailableDistrictItems() {
            if (!districtList) return [];
            return districtList.querySelectorAll('.district-item:not([data-disabled="true"])');
        }


        function resetDistrictSelection(provinceName) {
            if (districtInput) {
                districtInput.value = '';
            }
            renderDistrictOptions(provinceName || '');
        }


        // Hiển thị hoặc ẩn danh sách khi người dùng tương tác với ô input
        if (provinceInput && provinceList) provinceInput.addEventListener('focus', () => {
            filterDropdownItems(provinceItems, provinceInput.value);
            provinceList.classList.remove('hidden');
            console.log('Hiển thị danh sách tỉnh');
        });


        // Thêm sự kiện để mở dropdown khi click vào input
        function showProvinceDropdown(e) {
            if (!provinceList) return;
            e.stopPropagation();
            filterDropdownItems(provinceItems, provinceInput ? provinceInput.value : '');
            provinceList.classList.remove('hidden');
            console.log('Click: Hiển thị danh sách tỉnh');
        }


        if (provinceInput) provinceInput.addEventListener('click', showProvinceDropdown);
        if (provinceInput) provinceInput.addEventListener('touchstart', showProvinceDropdown);
        if (provinceInput) provinceInput.addEventListener('input', function() {
            if (!provinceList) return;
            filterDropdownItems(provinceItems, provinceInput.value);
            resetDistrictSelection(districtDataByProvince[provinceInput.value.trim()] ? provinceInput.value.trim() : '');
            provinceList.classList.remove('hidden');
        });


        // Xử lý sự kiện chọn tỉnh thành bằng mousedown để tránh blur trước click
        provinceItems.forEach((item) => {
            item.addEventListener('mousedown', (e) => {
                if (!provinceInput || !provinceList) return;
                e.preventDefault();
                const selectedProvince = e.target.textContent.trim();
                provinceInput.value = selectedProvince;
                provinceList.classList.add('hidden');
                resetDistrictSelection(selectedProvince);
                console.log('Đã chọn tỉnh:', selectedProvince);


                // Cập nhật địa chỉ hoàn chỉnh nếu quận đã được chọn
                updateFullAddress();
            });
        });


        // Xử lý sự kiện chọn quận/xã bằng mousedown để tránh blur trước click
        const districtInput = document.getElementById('district-input');
        const districtList = document.getElementById('district-list');
        const districtItems = document.querySelectorAll('.district-item');


        if (districtInput && districtList) districtInput.addEventListener('focus', () => {
            renderDistrictOptions(provinceInput ? provinceInput.value.trim() : '');
            filterDropdownItems(getAvailableDistrictItems(), districtInput.value);
            districtList.classList.remove('hidden');
            console.log('Hiển thị danh sách quận');
        });


        // Thêm sự kiện để mở dropdown khi click vào input
        function showDistrictDropdown(e) {
            if (!districtList) return;
            e.stopPropagation();
            renderDistrictOptions(provinceInput ? provinceInput.value.trim() : '');
            filterDropdownItems(getAvailableDistrictItems(), districtInput ? districtInput.value : '');
            districtList.classList.remove('hidden');
            console.log('Click: Hiển thị danh sách quận');
        }


        if (districtInput) districtInput.addEventListener('click', showDistrictDropdown);
        if (districtInput) districtInput.addEventListener('touchstart', showDistrictDropdown);
        if (districtInput) districtInput.addEventListener('input', function() {
            if (!districtList) return;
            renderDistrictOptions(provinceInput ? provinceInput.value.trim() : '');
            filterDropdownItems(getAvailableDistrictItems(), districtInput.value);
            districtList.classList.remove('hidden');
        });


        districtItems.forEach((item) => {
            item.addEventListener('mousedown', (e) => {
                if (!districtInput || !districtList) return;
                e.preventDefault();
                const selectedDistrict = e.target.textContent.trim();
                districtInput.value = selectedDistrict;
                districtList.classList.add('hidden');
                console.log('Đã chọn quận/xã:', selectedDistrict);


                // Cập nhật địa chỉ hoàn chỉnh
                updateFullAddress();
            });
        });


        if (districtList) districtList.addEventListener('mousedown', function(e) {
            const selectedItem = e.target.closest('.district-item');
            if (!selectedItem || selectedItem.dataset.disabled === 'true' || !districtInput) return;
            e.preventDefault();
            districtInput.value = selectedItem.textContent.trim();
            districtList.classList.add('hidden');
            updateFullAddress();
        });


        renderDistrictOptions(provinceInput ? provinceInput.value.trim() : '');


        // Ẩn dropdown khi click ra ngoài
        document.addEventListener('click', (event) => {
            if (provinceInput && provinceList && !provinceInput.contains(event.target) && !provinceList.contains(event.target)) {
                provinceList.classList.add('hidden');
            }
            if (districtInput && districtList && !districtInput.contains(event.target) && !districtList.contains(event.target)) {
                districtList.classList.add('hidden');
            }
        });


        // Hàm cập nhật địa chỉ hoàn chỉnh
        function updateFullAddress() {
            if (!provinceInput || !districtInput) return;
            const province = provinceInput.value.trim();
            const district = districtInput.value.trim();
            const addressInput = document.getElementById('address');
            const currentAddress = addressInput ? addressInput.value.trim() : '';


            // Chỉ cập nhật nếu địa chỉ hiện tại trống hoặc chỉ chứa quận/xã, tỉnh đã chọn
            const expectedAddress = province && district && province !== '-- Chọn tỉnh thành --' && district !== '-- Chọn quận/xã --'
                ? `${district}, ${province}`
                : '';


            // Nếu địa chỉ hiện tại trống hoặc bằng địa chỉ dự kiến, thì cập nhật
            if (!currentAddress || currentAddress === expectedAddress || currentAddress === `${district}, ${province}`) {
                if (expectedAddress) {
                    if (addressInput) addressInput.value = expectedAddress;
                }
            }
        }
    });

    function hideLoader() {
        var $loader = jQuery(".loader");
        if (!$loader.length || $loader.data("hidden")) {
            return;
        }
        $loader.data("hidden", true).fadeOut(400);
    }

    jQuery(function () {
        window.setTimeout(hideLoader, 1200);
    });

    jQuery(window).on("load", hideLoader);




}(jQuery));


// Bắt đầu xử lý đăng nhập
document.addEventListener('DOMContentLoaded', function() {
    var savedName = localStorage.getItem('username');
    var savedEmail = localStorage.getItem('useremail');
    var displaySpan = document.getElementById('display-username');
    var displayEmailSpan = document.getElementById('display-email');
    var displayEmailBlock = document.querySelector('.dropdown-user-info-email');


    console.log('Tên lấy từ localStorage:', savedName, savedEmail); // Kiểm tra trong Console


    if (displaySpan) {
        displaySpan.innerText = savedName || 'Chưa đăng nhập';
    }


    if (displayEmailSpan) {
        displayEmailSpan.innerText = savedEmail || 'Chưa đăng nhập';
    } else if (displayEmailBlock) {
        displayEmailBlock.innerText = savedEmail ? 'Email: ' + savedEmail : 'Chưa đăng nhập';
    }

    // [SỬA] Kiểm tra trạng thái đăng nhập và hiển thị nút thích hợp
    var isLoggedIn = typeof savedName === 'string' && savedName.trim() && savedName !== 'Chưa đăng nhập' &&
                     typeof savedEmail === 'string' && savedEmail.trim() && savedEmail !== 'Chưa đăng nhập';
    var logoutBtn = document.querySelector('.user-info__logout');
    var userIconLabel = document.querySelector('.user-icon > label[for="user-icon-input"]');
    
    if (logoutBtn) {
        if (isLoggedIn) {
            // Đã đăng nhập: Hiển thị nút Đăng Xuất
            logoutBtn.textContent = 'Đăng Xuất';
            logoutBtn.href = '#';
            logoutBtn.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('username');
                localStorage.removeItem('useremail');
                localStorage.removeItem('registeredFullname');
                localStorage.removeItem('registeredEmail');
                localStorage.removeItem('registeredPassword');
                window.location.href = 'index.html';
            };
        } else {
            // Chưa đăng nhập: Hiển thị nút Đăng Nhập
            logoutBtn.textContent = 'Đăng Nhập';
            logoutBtn.href = 'dangnhap.html';
            logoutBtn.onclick = null;
        }
    }

    if (userIconLabel && !isLoggedIn) {
        userIconLabel.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'dangnhap.html';
        });
    }
   
    // Hàm kiểm tra định dạng email (dùng chung cho tất cả forms)
    function isValidEmail(email) {
        // Chỉ chấp nhận email có @gmail.com chính xác
        var emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }
   
    // Hàm kiểm tra tên hợp lệ (chỉ chữ cái và khoảng trắng)
    function isValidName(name) {
        var nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
        return nameRegex.test(name.trim()) && name.trim().length >= 2;
    }

    function getStoredAccount() {
        return {
            fullName: localStorage.getItem('registeredFullname') || '',
            email: localStorage.getItem('registeredEmail') || '',
            password: localStorage.getItem('registeredPassword') || ''
        };
    }

    function setFormMessage(element, message, color) {
        if (!element) return;
        element.textContent = message;
        element.style.color = color || 'red';
        element.style.display = message ? 'block' : 'none';
    }
   
//Đăng nhập
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        var emailInput = document.getElementById('login-email');
        var passwordInput = document.getElementById('login-password');
        var errorDiv = document.getElementById('login-error');
       
        // Kiểm tra real-time khi nhập
        if (emailInput && passwordInput && errorDiv) {
            emailInput.addEventListener('input', function() {
                var storedAccount = getStoredAccount();
                if (emailInput.value.trim() && passwordInput.value.trim() &&
                    emailInput.value.trim() === storedAccount.email && passwordInput.value.trim() === storedAccount.password) {
                    setFormMessage(errorDiv, '', 'red');
                }
            });
           
            passwordInput.addEventListener('input', function() {
                var storedAccount = getStoredAccount();
                if (emailInput.value.trim() && passwordInput.value.trim() &&
                    emailInput.value.trim() === storedAccount.email && passwordInput.value.trim() === storedAccount.password) {
                    setFormMessage(errorDiv, '', 'red');
                }
            });
        }
       
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();


            if (!emailInput || !passwordInput) return;
            var email = emailInput.value.trim();
            var password = passwordInput.value.trim();
            var storedAccount = getStoredAccount();


            if (!email || !password) {
                if (errorDiv) {
                    errorDiv.textContent = 'Nhập lại mật khẩu hoặc email';
                    errorDiv.style.display = 'block';
                }
                return;
            }


            if (!storedAccount.email || !storedAccount.password) {
                setFormMessage(errorDiv, 'ChÆ°a cÃ³ tÃ i khoáº£n Ä‘Æ°á»£c Ä‘Äƒng kÃ½.', 'red');
                return;
            }


            if (email !== storedAccount.email || password !== storedAccount.password) {
                if (errorDiv) {
                    errorDiv.textContent = 'Nhập lại mật khẩu hoặc email';
                    errorDiv.style.display = 'block';
                }
                return;
            }
           
            // Ẩn error message khi đăng nhập thành công
            setFormMessage(errorDiv, '', 'red');


            var displayName = storedAccount.fullName || generateNameFromEmail(email);
            localStorage.setItem('username', displayName);
            localStorage.setItem('useremail', email);
            console.log('Đăng nhập thành công:', displayName, email);
            window.location.href = 'index.html';
        });
    }


    var registerForm = document.getElementById('register-form');
    if (registerForm) {
        var fullnameInput = document.getElementById('register-fullname');
        var emailInput = document.getElementById('register-email');
        var passwordInput = document.getElementById('register-password');
        var confirmInput = document.getElementById('register-confirm-password');
        var errorDiv = document.getElementById('register-error');
        var fullnameErrorDiv = document.getElementById('fullname-error');
       
        console.log('Register form found:', !!registerForm);
        console.log('All inputs found:', !!fullnameInput && !!emailInput && !!passwordInput && !!confirmInput);
        console.log('Error divs found:', !!errorDiv && !!fullnameErrorDiv);
       
        // Kiểm tra real-time khi nhập
        if (fullnameInput && emailInput && passwordInput && confirmInput && errorDiv && fullnameErrorDiv) {
            [fullnameInput, emailInput, passwordInput, confirmInput].forEach(function(input) {
                input.addEventListener('input', function() {
                    var fullname = fullnameInput.value.trim();
                    var email = emailInput.value.trim();
                    var password = passwordInput.value.trim();
                    var confirm = confirmInput.value.trim();
                   
                    console.log('Input event - fullname:', fullname, 'email:', email, 'password:', password, 'confirm:', confirm);
                   
                    // Kiểm tra tên riêng biệt
                    if (fullname && !isValidName(fullname)) {
                        fullnameErrorDiv.textContent = 'Vui lòng nhập lại tên';
                        fullnameErrorDiv.style.display = 'block';
                    } else {
                        fullnameErrorDiv.style.display = 'none';
                    }
                   
                    // Kiểm tra các lỗi khác chỉ khi tất cả fields đã được điền
                    var hasOtherError = false;
                    var errorMessage = '';
                   
                    if (fullname && email && password && confirm) {
                        // Kiểm tra định dạng email
                        if (!isValidEmail(email)) {
                            hasOtherError = true;
                            errorMessage = 'Nhập lại mật khẩu hoặc email';
                            console.log('Email invalid:', email);
                        }
                       
                        // Kiểm tra mật khẩu khớp
                        if (password !== confirm) {
                            hasOtherError = true;
                            errorMessage = 'Nhập lại mật khẩu hoặc email';
                        }
                    }
                   
                    // Show hay hide error cho các lỗi khác
                    if (hasOtherError) {
                        errorDiv.textContent = errorMessage;
                        errorDiv.style.display = 'block';
                        console.log('Showing other error:', errorMessage);
                    } else {
                        errorDiv.style.display = 'none';
                        console.log('Hiding other error');
                    }
                });
            });
        }
       
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();


            if (!fullnameInput || !emailInput || !passwordInput || !confirmInput) return;
            var fullname = fullnameInput.value.trim();
            var email = emailInput.value.trim();
            var password = passwordInput.value.trim();
            var confirm = confirmInput.value.trim();
            var storedAccount = getStoredAccount();


            // Kiểm tra tên trước
            if (!fullname || !isValidName(fullname)) {
                if (fullnameErrorDiv) {
                    fullnameErrorDiv.textContent = 'Vui lòng nhập lại tên';
                    fullnameErrorDiv.style.display = 'block';
                }
                return;
            } else {
                if (fullnameErrorDiv) {
                    fullnameErrorDiv.style.display = 'none';
                }
            }


            if (!email || !password || !confirm) {
                if (errorDiv) {
                    errorDiv.textContent = 'Nhập lại mật khẩu hoặc email';
                    errorDiv.style.display = 'block';
                }
                return;
            }
           
            // Kiểm tra định dạng email
            if (!isValidEmail(email)) {
                if (errorDiv) {
                    errorDiv.textContent = 'Nhập lại mật khẩu hoặc email';
                    errorDiv.style.display = 'block';
                }
                return;
            }


            if (storedAccount.email && storedAccount.email === email) {
                setFormMessage(errorDiv, 'Email nÃ y Ä‘Ã£ Ä‘Æ°á»£c Ä‘Äƒng kÃ½.', 'red');
                return;
            }


            if (password.length < 6) {
                setFormMessage(errorDiv, 'Máº­t kháº©u pháº£i cÃ³ Ã­t nháº¥t 6 kÃ½ tá»±.', 'red');
                return;
            }


            if (password !== confirm) {
                if (errorDiv) {
                    errorDiv.textContent = 'Nhập lại mật khẩu hoặc email';
                    errorDiv.style.display = 'block';
                }
                return;
            }


            localStorage.setItem('registeredFullname', fullname);
            localStorage.setItem('registeredEmail', email);
            localStorage.setItem('registeredPassword', password);
           
            // Ẩn error message khi đăng ký thành công
            setFormMessage(errorDiv, '', 'red');
            if (fullnameErrorDiv) {
                fullnameErrorDiv.style.display = 'none';
            }
           
            // Hiển thị thông báo thành công tạm thời
            if (errorDiv) {
                errorDiv.textContent = 'Đăng ký thành công! Vui lòng đăng nhập.';
                errorDiv.style.color = 'green';
                errorDiv.style.display = 'block';
               
                // Sau 2 giây, chuyển về tab đăng nhập
                setTimeout(function() {
                    registerForm.reset();
                    var toggle = document.getElementById('toggle');
                    if (toggle) {
                        toggle.checked = false;
                    }
                    errorDiv.style.display = 'none';
                    errorDiv.style.color = 'red'; // Reset màu về đỏ cho lần sau
                }, 2000);
            }
        });
    }

    var forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        var resetEmailInput = document.getElementById('reset-email');
        var forgotPasswordError = document.getElementById('forgot-password-error');
        var resetTokenPreview = document.getElementById('reset-token-preview');

        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!resetEmailInput) return;
            var email = resetEmailInput.value.trim();
            var storedAccount = getStoredAccount();

            if (!email || !isValidEmail(email)) {
                setFormMessage(forgotPasswordError, 'Vui lòng nhập email hợp lệ.', 'red');
                return;
            }

            if (!storedAccount.email || storedAccount.email !== email) {
                setFormMessage(forgotPasswordError, 'Email không tồn tại trong hệ thống.', 'red');
                return;
            }

            var resetToken = 'RESET-' + Date.now();
            localStorage.setItem('resetPasswordToken', resetToken);
            localStorage.setItem('resetPasswordEmail', email);

            if (resetTokenPreview) {
                resetTokenPreview.textContent = resetToken;
            }

            setFormMessage(forgotPasswordError, 'Đã tạo mã xác nhận. Vui lòng dùng mã này để đặt lại mật khẩu.', 'green');
        });
    }

    var resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        var resetTokenInput = document.getElementById('reset-token');
        var newPasswordInput = document.getElementById('new-password');
        var confirmNewPasswordInput = document.getElementById('confirm-new-password');
        var resetPasswordError = document.getElementById('reset-password-error');

        resetPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!resetTokenInput || !newPasswordInput || !confirmNewPasswordInput) return;
            var token = resetTokenInput.value.trim();
            var newPassword = newPasswordInput.value.trim();
            var confirmPassword = confirmNewPasswordInput.value.trim();
            var storedAccount = getStoredAccount();
            var savedToken = localStorage.getItem('resetPasswordToken') || '';
            var savedEmail = localStorage.getItem('resetPasswordEmail') || '';

            if (!token || !newPassword || !confirmPassword) {
                setFormMessage(resetPasswordError, 'Vui lòng nhập đầy đủ thông tin.', 'red');
                return;
            }

            if (newPassword.length < 6) {
                setFormMessage(resetPasswordError, 'Mật khẩu mới phải có ít nhất 6 ký tự.', 'red');
                return;
            }

            if (newPassword !== confirmPassword) {
                setFormMessage(resetPasswordError, 'Mật khẩu xác nhận không khớp.', 'red');
                return;
            }

            if (!savedToken || token !== savedToken || !savedEmail || savedEmail !== storedAccount.email) {
                setFormMessage(resetPasswordError, 'Mã xác nhận không hợp lệ hoặc đã hết hạn.', 'red');
                return;
            }

            localStorage.setItem('registeredPassword', newPassword);
            localStorage.removeItem('resetPasswordToken');
            localStorage.removeItem('resetPasswordEmail');

            setFormMessage(resetPasswordError, 'Đổi mật khẩu thành công. Đang chuyển về trang đăng nhập...', 'green');

            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1200);
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    function getStoredAccountSafe() {
        return {
            fullName: localStorage.getItem('registeredFullname') || '',
            email: localStorage.getItem('registeredEmail') || '',
            password: localStorage.getItem('registeredPassword') || ''
        };
    }

    function setMessage(element, message, color) {
        if (!element) return;
        element.textContent = message;
        element.style.color = color || 'red';
        element.style.display = message ? 'block' : 'none';
    }

    function replaceWithClone(id) {
        var element = document.getElementById(id);
        if (!element) return null;
        var clone = element.cloneNode(true);
        element.parentNode.replaceChild(clone, element);
        return clone;
    }

    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test((email || '').trim());
    }

    function validateName(name) {
        return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/.test((name || '').trim()) && (name || '').trim().length >= 2;
    }

    function syncUserDisplay() {
        var savedName = localStorage.getItem('username') || 'Chua dang nhap';
        var savedEmail = localStorage.getItem('useremail') || 'Chua dang nhap';
        var displaySpan = document.getElementById('display-username');
        var displayEmailSpan = document.getElementById('display-email');
        var displayEmailBlock = document.querySelector('.dropdown-user-info-email');

        if (displaySpan) {
            displaySpan.innerText = savedName;
        }
        if (displayEmailSpan) {
            displayEmailSpan.innerText = savedEmail;
        } else if (displayEmailBlock) {
            displayEmailBlock.innerText = savedEmail ? 'Email: ' + savedEmail : 'Chua dang nhap';
        }
    }

    var loginForm = replaceWithClone('login-form');
    if (loginForm) {
        var loginEmail = document.getElementById('login-email');
        var loginPassword = document.getElementById('login-password');
        var loginError = document.getElementById('login-error');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var account = getStoredAccountSafe();
            var email = loginEmail ? loginEmail.value.trim() : '';
            var password = loginPassword ? loginPassword.value.trim() : '';

            if (!email || !password) {
                setMessage(loginError, 'Nhap lai mat khau hoac email', 'red');
                return;
            }

            if (!account.email || !account.password) {
                setMessage(loginError, 'Chua co tai khoan duoc dang ky.', 'red');
                return;
            }

            if (email !== account.email || password !== account.password) {
                setMessage(loginError, 'Nhap lai mat khau hoac email', 'red');
                return;
            }

            localStorage.setItem('username', account.fullName || generateNameFromEmail(email));
            localStorage.setItem('useremail', email);
            setMessage(loginError, '', 'red');
            syncUserDisplay();
            window.location.href = 'index.html';
        });
    }

    var registerForm = replaceWithClone('register-form');
    if (registerForm) {
        var registerFullname = document.getElementById('register-fullname');
        var registerEmail = document.getElementById('register-email');
        var registerPassword = document.getElementById('register-password');
        var registerConfirm = document.getElementById('register-confirm-password');
        var registerError = document.getElementById('register-error');
        var fullnameError = document.getElementById('fullname-error');

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var fullname = registerFullname ? registerFullname.value.trim() : '';
            var email = registerEmail ? registerEmail.value.trim() : '';
            var password = registerPassword ? registerPassword.value.trim() : '';
            var confirm = registerConfirm ? registerConfirm.value.trim() : '';
            var account = getStoredAccountSafe();

            if (!fullname || !validateName(fullname)) {
                setMessage(fullnameError, 'Vui long nhap lai ten', 'red');
                return;
            }
            setMessage(fullnameError, '', 'red');

            if (!email || !password || !confirm || !validateEmail(email)) {
                setMessage(registerError, 'Nhap lai mat khau hoac email', 'red');
                return;
            }

            if (account.email && account.email === email) {
                setMessage(registerError, 'Email nay da duoc dang ky.', 'red');
                return;
            }

            if (password.length < 6) {
                setMessage(registerError, 'Mat khau phai co it nhat 6 ky tu.', 'red');
                return;
            }

            if (password !== confirm) {
                setMessage(registerError, 'Nhap lai mat khau hoac email', 'red');
                return;
            }

            localStorage.setItem('registeredFullname', fullname);
            localStorage.setItem('registeredEmail', email);
            localStorage.setItem('registeredPassword', password);
            setMessage(registerError, 'Dang ky thanh cong! Vui long dang nhap.', 'green');

            setTimeout(function() {
                registerForm.reset();
                var toggle = document.getElementById('toggle');
                if (toggle) {
                    toggle.checked = false;
                }
                setMessage(registerError, '', 'red');
            }, 2000);
        });
    }

    var forgotPasswordForm = replaceWithClone('forgot-password-form');
    if (forgotPasswordForm) {
        var resetEmail = document.getElementById('reset-email');
        var forgotError = document.getElementById('forgot-password-error');
        var tokenPreview = document.getElementById('reset-token-preview');

        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var email = resetEmail ? resetEmail.value.trim() : '';
            var account = getStoredAccountSafe();

            if (!email || !validateEmail(email)) {
                setMessage(forgotError, 'Vui long nhap email hop le.', 'red');
                return;
            }

            if (!account.email || account.email !== email) {
                setMessage(forgotError, 'Email khong ton tai trong he thong.', 'red');
                return;
            }

            var token = 'RESET-' + Date.now();
            localStorage.setItem('resetPasswordToken', token);
            localStorage.setItem('resetPasswordEmail', email);
            if (tokenPreview) {
                tokenPreview.textContent = token;
            }
            setMessage(forgotError, 'Da tao ma xac nhan. Vui long dung ma nay de dat lai mat khau.', 'green');
        });
    }

    var resetPasswordForm = replaceWithClone('reset-password-form');
    if (resetPasswordForm) {
        var resetToken = document.getElementById('reset-token');
        var newPassword = document.getElementById('new-password');
        var confirmNewPassword = document.getElementById('confirm-new-password');
        var resetError = document.getElementById('reset-password-error');

        resetPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var token = resetToken ? resetToken.value.trim() : '';
            var password = newPassword ? newPassword.value.trim() : '';
            var confirm = confirmNewPassword ? confirmNewPassword.value.trim() : '';
            var account = getStoredAccountSafe();
            var savedToken = localStorage.getItem('resetPasswordToken') || '';
            var savedEmail = localStorage.getItem('resetPasswordEmail') || '';

            if (!token || !password || !confirm) {
                setMessage(resetError, 'Vui long nhap day du thong tin.', 'red');
                return;
            }

            if (password.length < 6) {
                setMessage(resetError, 'Mat khau moi phai co it nhat 6 ky tu.', 'red');
                return;
            }

            if (password !== confirm) {
                setMessage(resetError, 'Mat khau xac nhan khong khop.', 'red');
                return;
            }

            if (!savedToken || token !== savedToken || !savedEmail || savedEmail !== account.email) {
                setMessage(resetError, 'Ma xac nhan khong hop le hoac da het han.', 'red');
                return;
            }

            localStorage.setItem('registeredPassword', password);
            localStorage.removeItem('resetPasswordToken');
            localStorage.removeItem('resetPasswordEmail');
            setMessage(resetError, 'Doi mat khau thanh cong. Dang chuyen ve trang dang nhap...', 'green');

            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1200);
        });
    }

    syncUserDisplay();
});

function generateNameFromEmail(email) {
    var prefix = email.split('@')[0] || 'Người dùng';
    prefix = prefix.replace(/[^a-zA-Z0-9]/g, ' ').trim();
    return prefix.split(' ').map(function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ') || 'Người dùng';
}


// Hàm đăng xuất
function generateNameFromEmail(email) {
    var prefix = email.split('@')[0] || 'Nguoi dung';
    prefix = prefix.replace(/[^a-zA-Z0-9]/g, ' ').trim();
    return prefix.split(' ').map(function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ') || 'Nguoi dung';
}

// [SỬA] Sửa hàm logout để xóa hết dữ liệu
var logoutBtn2 = document.querySelector('.user-info__logout, .dropdown-user-info-logout a');
if (logoutBtn2) {
    logoutBtn2.addEventListener('click', function(e) {
        var isLoggedIn = localStorage.getItem('username') && localStorage.getItem('useremail');
        if (isLoggedIn) {
            // Nếu đã đăng nhập, xóa dữ liệu và chuyển về trang chủ
            e.preventDefault();
            localStorage.removeItem('username');
            localStorage.removeItem('useremail');
            localStorage.removeItem('registeredFullname');
            localStorage.removeItem('registeredEmail');
            localStorage.removeItem('registeredPassword');
            window.location.href = 'index.html';
        }
        // Nếu chưa đăng nhập, cho phép chuyển hướng sang trang đăng nhập
    });
}
// Kết thúc xử lý đăng nhập


var currentDiscount = 0;
var currentCoupon = '';


function parseVND(value) {
    if (!value) return 0;
    var normalized = value.toString().replace(/\./g, '').replace(/₫/g, '').trim();
    return parseInt(normalized, 10) || 0;
}


function formatVND(amount) {
    if (amount === 0) return '0₫';
    var text = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return text + '₫';
}


// Cập nhật tổng giỏ hàng
function normalizePriceText(value) {
    return formatVND(parseVND(value));
}


function parseVND(value) {
    if (!value) return 0;
    var normalized = value.toString().replace(/\./g, '').replace(/₫|â‚«/g, '').trim();
    return parseInt(normalized, 10) || 0;
}


function formatVND(amount) {
    if (amount === 0) return '0₫';
    var text = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return text + '₫';
}


function syncDiscountState() {
    localStorage.setItem('currentDiscount', String(currentDiscount));
    localStorage.setItem('currentCoupon', currentCoupon);
}


currentDiscount = parseInt(localStorage.getItem('currentDiscount') || '0', 10) || 0;
currentCoupon = localStorage.getItem('currentCoupon') || '';


function parseVND(value) {
    if (!value) return 0;
    var normalized = value.toString().replace(/\./g, '').replace(/\u20AB|â‚«|Ã¢â€šÂ«/g, '').trim();
    return parseInt(normalized, 10) || 0;
}


function formatVND(amount) {
    if (amount === 0) return '0\u20AB';
    var text = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return text + '\u20AB';
}


function updateCartTotal() {
    var subtotal = 0;
    var cartRows = document.querySelectorAll('.table-body-row');


    cartRows.forEach(function(row) {
        var priceText = row.querySelector('.product-price').innerText;
        var price = parseVND(priceText);
        var quantity = parseInt(row.querySelector('.product-quantity input').value, 10) || 0;
        subtotal += price * quantity;
    });


    var hasItems = subtotal > 0;
    var shipping = hasItems ? 15000 : 0;
    var discount = currentDiscount;
    var total = hasItems ? Math.max(subtotal + shipping - discount, 0) : 0;
    var shippingLabel = hasFreeShippingCoupon() && hasItems ? formatVND(shipping) + ' (Đã miễn phí)' : formatVND(shipping);


    var subtotalSpan = document.getElementById('subtotal-price');
    var shippingSpan = document.getElementById('shipping-price');
    var discountSpan = document.getElementById('discount-price');
    var totalSpan = document.getElementById('total-price');
    var couponMessage = document.getElementById('coupon-message');


    if (subtotalSpan) subtotalSpan.innerText = formatVND(subtotal);
    if (shippingSpan) shippingSpan.innerText = shippingLabel;
    if (discountSpan) discountSpan.innerText = formatVND(discount);
    if (totalSpan) totalSpan.innerText = formatVND(total);
    if (couponMessage && currentCoupon) {
        couponMessage.innerText = 'Mã giảm giá ' + currentCoupon + ' đã áp dụng.';
    } else if (couponMessage) {
        couponMessage.innerText = '';
    }
}
// Tính toán ban đầu
updateCartTotal();


function getCartSubtotal() {
    return getCart().reduce(function(sum, item) {
        return sum + parseVND(item.price) * item.quantity;
    }, 0);
}


function hasFreeShippingCoupon() {
    return currentCoupon === 'FREESHIP' || currentCoupon === 'SHIPFREE';
}


function applyCouponCode(code, messageElementId) {
    var normalizedCode = (code || '').trim().toUpperCase();
    var subtotal = getCartSubtotal();
    var messageElement = messageElementId ? document.getElementById(messageElementId) : null;
    var message = '';
    var messageColor = '#c81d25';

    if (!normalizedCode) {
        currentDiscount = 0;
        currentCoupon = '';
        message = 'Vui lòng chọn mã giảm giá.';
    } else if (normalizedCode === 'GIAM15') {
        currentDiscount = Math.round(subtotal * 0.15);
        currentCoupon = 'GIAM15';
        message = 'Mã GIAM15 đã được áp dụng: giảm 15%.';
        messageColor = 'green';
    } else if (normalizedCode === 'FREESHIP' || normalizedCode === 'SHIPFREE') {
        currentDiscount = 15000;
        currentCoupon = 'FREESHIP';
        message = 'Mã FREESHIP đã được áp dụng: miễn phí vận chuyển.';
        messageColor = 'green';
    } else {
        currentDiscount = 0;
        currentCoupon = '';
        message = 'Mã giảm giá không hợp lệ.';
    }

    syncDiscountState();

    if (typeof updateCartTotal === 'function') {
        updateCartTotal();
    }

    if (typeof populateCheckout === 'function') {
        populateCheckout();
    }

    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = messageColor;
    }

    return {
        code: currentCoupon,
        discount: currentDiscount,
        message: message
    };
}


function initializeCheckoutCouponControls() {
    var couponSelect = document.getElementById('checkout-coupon-select');
    var couponButton = document.querySelector('.discount-code .btn-discount');
    var couponMessage = document.getElementById('checkout-coupon-message');

    if (!couponSelect || !couponButton || couponSelect.dataset.bound === 'true') return;

    if (currentCoupon) {
        couponSelect.value = currentCoupon === 'SHIPFREE' ? 'FREESHIP' : currentCoupon;
        if (couponMessage) {
            couponMessage.textContent = hasFreeShippingCoupon()
                ? 'Mã giảm giá FREESHIP đã áp dụng. Phí vận chuyển đã được miễn.'
                : 'Mã giảm giá ' + currentCoupon + ' đã áp dụng.';
            couponMessage.style.color = 'green';
        }
    }

    couponButton.addEventListener('click', function() {
        applyCouponCode(couponSelect.value, 'checkout-coupon-message');
    });

    couponSelect.addEventListener('change', function() {
        if (!couponSelect.value) {
            currentDiscount = 0;
            currentCoupon = '';
            syncDiscountState();
            populateCheckout();
            if (couponMessage) {
                couponMessage.textContent = '';
            }
            return;
        }

        applyCouponCode(couponSelect.value, 'checkout-coupon-message');
    });

    couponSelect.dataset.bound = 'true';
}
// Chức năng giỏ hàng
function sanitizeCartItem(item, index) {
    if (!item) return null;

    var safeId = item.id || ('product-' + index);
    var rawName = (item.name || item.productName || '').toString().trim();
    var safeName = rawName && rawName !== 'undefined' ? rawName : 'San pham';
    var safePrice = normalizePriceText(item.price || item.productPrice || 0);
    var rawImage = (item.image || item.productImage || '').toString().trim();
    var safeImage = rawImage && rawImage !== 'undefined' ? rawImage : 'https://via.placeholder.com/150';
    var safeQuantity = Math.max(parseInt(item.quantity, 10) || 1, 1);

    return {
        id: safeId,
        name: safeName,
        price: safePrice,
        image: safeImage,
        quantity: safeQuantity
    };
}


function getCart() {
    var rawCart = localStorage.getItem('cart');
    var parsedCart = [];

    try {
        parsedCart = rawCart ? JSON.parse(rawCart) : [];
    } catch (error) {
        parsedCart = [];
    }

    if (!Array.isArray(parsedCart)) {
        parsedCart = [];
    }

    var sanitizedCart = parsedCart.map(sanitizeCartItem).filter(Boolean);

    if (JSON.stringify(parsedCart) !== JSON.stringify(sanitizedCart)) {
        saveCart(sanitizedCart);
    }

    return sanitizedCart;
}


function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function getCartItemCount() {
    return getCart().reduce(function(total, item) {
        return total + (parseInt(item.quantity, 10) || 0);
    }, 0);
}


function updateCartBadge() {
    var count = getCartItemCount();

    document.querySelectorAll('.shopping-cart').forEach(function(cartLink) {
        var badge = cartLink.querySelector('.cart-count-badge');

        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-count-badge';
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-10px';
            badge.style.minWidth = '18px';
            badge.style.height = '18px';
            badge.style.padding = '0 4px';
            badge.style.borderRadius = '999px';
            badge.style.background = '#c81d25';
            badge.style.color = '#fff';
            badge.style.fontSize = '11px';
            badge.style.lineHeight = '18px';
            badge.style.textAlign = 'center';
            badge.style.fontWeight = '700';
            badge.style.display = 'none';

            if (!cartLink.style.position) {
                cartLink.style.position = 'relative';
            }

            cartLink.appendChild(badge);
        }

        badge.textContent = count > 99 ? '99+' : String(count);
        badge.style.display = count > 0 ? 'block' : 'none';
    });
}


function addToCart(productId, name, price, image) {
    var cart = getCart();

    var activeSizeBtn = document.querySelector('.size-btn.active');
    var selectedSize = activeSizeBtn ? activeSizeBtn.getAttribute('data-size') : null;
    
    var finalName = selectedSize ? name.split(' - ')[0] + ' - ' + selectedSize : name;
    var finalId = selectedSize ? productId + '-' + selectedSize.replace(/\s/g, '') : productId;

    // ✅ Đọc số lượng từ input
    var qtyInput = document.getElementById('modern-qty-input') 
                   || document.querySelector('.modern-qty-input')
                   || document.querySelector('input[type="number"]');
    var selectedQty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;

    var existing = cart.find(item => item.id == finalId);
    if (existing) {
        existing.quantity += selectedQty;  // ✅ Cộng đúng số lượng
    } else {
        cart.push(sanitizeCartItem({
            id: finalId, 
            name: finalName, 
            price: price, 
            image: image, 
            quantity: selectedQty  // ✅ Dùng số lượng đã chọn
        }, cart.length));
    }
    saveCart(cart);
    updateCartBadge();
}


function removeFromCart(productId) {
    var cart = getCart();
    cart = cart.filter(item => item.id != productId);
    saveCart(cart);
    updateCartBadge();
}


function updateCartQuantity(productId, quantity) {
    var cart = getCart();
    var item = cart.find(item => item.id == productId);
    if (item) {
        item.quantity = Math.max(quantity, 1);
        saveCart(cart);
        updateCartBadge();
    }
}


function populateCart() {
    var cart = getCart();
    var tbody = document.querySelector('.cart-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    cart.forEach(function(item) {
        item = sanitizeCartItem(item);
        if (!item) return;
        var priceNum = parseVND(item.price);
        var rowTotal = priceNum * item.quantity;
        var row = document.createElement('tr');
        row.className = 'table-body-row';
        row.setAttribute('data-product-id', item.id);
        row.innerHTML = `
            <td class="product-remove"><a href="#" class="remove-product"><i class="far fa-window-close"></i></a></td>
            <td class="product-image"><img src="${item.image}" alt=""></td>
            <td class="product-name">${item.name}</td>
            <td class="product-price">${item.price}</td>
            <td class="product-quantity"><input type="number" value="${item.quantity}"></td>
            <td class="product-total">${formatVND(rowTotal)}</td>
        `;
        tbody.appendChild(row);
    });
    updateCartTotal();
}


// Thêm vào giỏ hàng
$(document).on('click', '.cart-btn', function(e) {
    var productId = $(this).data('product-id');
    if (!productId) return;
    e.preventDefault();
    var name = $(this).attr('data-product-name');   // ✅ dùng attr
    var price = $(this).attr('data-product-price'); // ✅ dùng attr thay vì data()
    var image = $(this).attr('data-product-image'); // ✅ dùng attr
    addToCart(productId, name, price, image);
});

// Mua ngay
$(document).on('click', '.modern-buy-now', function(e) {
    e.preventDefault();
    var cartBtn = document.querySelector('.modern-add-cart-btn');
    if (!cartBtn) return;
    var productId = cartBtn.getAttribute('data-product-id');
    var name = cartBtn.getAttribute('data-product-name');
    var price = cartBtn.getAttribute('data-product-price');
    var image = cartBtn.getAttribute('data-product-image');
    var activeSizeBtn = document.querySelector('.size-btn.active');
    var selectedSize = activeSizeBtn ? activeSizeBtn.getAttribute('data-size') : null;
    var finalName = selectedSize ? name.split(' - ')[0] + ' - ' + selectedSize : name;
    var finalId = selectedSize ? productId + '-' + selectedSize.replace(/\s/g, '') : productId;
    var qtyInput = document.getElementById('product-qty-1') 
               || document.querySelector('.modern-qty-input')
               || document.querySelector('input[type="number"]');
var selectedQty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
console.log('DEBUG qty input:', qtyInput, 'value:', qtyInput ? qtyInput.value : 'NOT FOUND');
    var newCart = [sanitizeCartItem({
        id: finalId, name: finalName, price: String(price),
        image: image, quantity: selectedQty
    }, 0)];
    saveCart(newCart);
    updateCartBadge();
    window.location.href = '../thanhtoan.html';
});

// Xóa sản phẩm
$(document).on('click', '.remove-product', function(e) {
    e.preventDefault();
    var row = $(this).closest('.table-body-row');
    var productId = row.data('product-id');
    removeFromCart(productId);
    row.remove();
    syncDiscountState();
    updateCartTotal();
});


// Cập nhật số lượng
$(document).on('change input', '.product-quantity input', function() {
    var row = $(this).closest('.table-body-row');
    var productId = row.data('product-id');
    var quantity = parseInt($(this).val()) || 0;
    updateCartQuantity(productId, quantity);
    var priceText = row.find('.product-price').text();
    var price = parseVND(priceText);
    var rowTotal = price * quantity;
    row.find('.product-total').text(formatVND(rowTotal));
    updateCartTotal();
});


// Áp dụng mã giảm giá
$(document).on('submit', '#coupon-form', function(e) {
    e.preventDefault();
    var code = $('#coupon-input').val().trim().toUpperCase();
    var result = applyCouponCode(code, 'coupon-message');
    $('#coupon-message').text(result.message);
    return;
    if (!code) {
        $('#coupon-message').text('Vui lòng nhập mã giảm giá.');
        return;
    }


    var subtotal = getCart().reduce(function(sum, item) {
        return sum + parseVND(item.price) * item.quantity;
    }, 0);


    if (code === 'GIAM10') {
        currentDiscount = Math.round(subtotal * 0.10);
        currentCoupon = 'GIAM10';
        $('#coupon-message').text('Mã GIAM10 giảm 10% đã được áp dụng.');
    } else if (code === 'SHIPFREE') {
        currentDiscount = 15000;
        currentCoupon = 'SHIPFREE';
        $('#coupon-message').text('Mã SHIPFREE đã được áp dụng: miễn phí vận chuyển.');
    } else {
        currentDiscount = 0;
        currentCoupon = '';
        $('#coupon-message').text('Mã không hợp lệ.');
    }
    updateCartTotal();
});


function hideLegacyPaymentControls() {
    var payHeaders = document.querySelectorAll('.content-obligatory h3.Pay');
    payHeaders.forEach(function(header, index) {
        if (index > 0) {
            header.style.display = 'none';
        }
    });
    document.querySelectorAll('.content-obligatory .Pay-content, .content-obligatory .pay-bannk-container, .content-obligatory #pay-bank-check, .content-obligatory #pay-bank, .content-obligatory #pay-momo, .content-obligatory #pay-zalopay, .content-obligatory label[for^="pay-"], .content-obligatory input[id^="pay-"]').forEach(function(el) {
        el.style.display = 'none';
    });
}
function populateCheckout() {
    var cart = getCart();
    var productContainer = document.querySelector('.product');
    var quantitySpan = document.querySelector('.quantity');
    var subtotalSpan = document.querySelector('.Provisionall-price');
    var totalSpan = document.querySelector('.total-price .total-price-money');
    var shippingSpan = document.querySelector('.Provisional-shipping-transport-fee');
   
    // ✅ BƯỚC 1: Xóa sản phẩm cũ
    if (productContainer) {
        productContainer.innerHTML = '';
    } else {
        console.warn('Không tìm thấy .product');
        return;
    }
   
    // ✅ BƯỚC 2: Tính tổng từ giỏ hàng
    var totalQuantity = 0;
    var subtotal = 0;
   
    cart.forEach(function(item) {
        var priceNum = parseVND(item.price);
        var itemTotal = priceNum * item.quantity;
        subtotal += itemTotal;
        totalQuantity += item.quantity;
       
        // Thêm sản phẩm vào HTML
        var productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-item-img">
                <img src="${item.image}" alt="Product">
                <div class="product-quantity">${item.quantity}</div>
                <span class="product-item-name">${item.name}</span>
            </div>
            <div class="product-item-price">${item.price}</div>
        `;
        productContainer.appendChild(productItem);
    });
   
    // ✅ BƯỚC 3: Tính phí vận chuyển và tổng cộng
    var shipping = cart.length > 0 ? 15000 : 0;
    var discount = parseInt(localStorage.getItem('currentDiscount') || 0);
    var total = Math.max(subtotal + shipping - discount, 0);
    var shippingLabel = hasFreeShippingCoupon() && cart.length > 0 ? formatVND(shipping) + ' (Đã miễn phí)' : formatVND(shipping);
   
    // ✅ BƯỚC 4: Cập nhật UI
    if (quantitySpan) quantitySpan.textContent = totalQuantity;
    if (subtotalSpan) subtotalSpan.textContent = formatVND(subtotal);
    if (shippingSpan) shippingSpan.textContent = shippingLabel;
    if (totalSpan) totalSpan.textContent = formatVND(total);
   
    console.log('✅ Checkout updated:', {subtotal, shipping, total});
}


// Gọi khi trang load
// Checkout logic
function getOrCreateFieldError(inputId, errorId) {
    var input = document.getElementById(inputId);
    if (!input) return null;

    var error = document.getElementById(errorId);
    if (!error) {
        error = document.createElement('div');
        error.id = errorId;
        error.style.color = 'red';
        error.style.fontSize = '14px';
        error.style.marginBottom = '10px';
        error.style.display = 'none';
        input.insertAdjacentElement('afterend', error);
    }

    return error;
}


function setCheckoutFieldError(inputId, errorId, message) {
    var error = getOrCreateFieldError(inputId, errorId);
    if (!error) return;

    error.textContent = message || '';
    error.style.display = message ? 'block' : 'none';
}


function isPlaceholderValue(value, placeholder) {
    return !value || value.trim() === '' || value.trim() === placeholder;
}


function validateCheckoutField(fieldName) {
    var emailInput = document.getElementById('email');
    var nameInput = document.getElementById('name');
    var phoneInput = document.getElementById('phone');
    var addressInput = document.getElementById('address');
    var provinceInput = document.getElementById('province-input');
    var districtInput = document.getElementById('district-input');

    if (fieldName === 'email') {
        var email = emailInput ? emailInput.value.trim() : '';
        if (!email) {
            setCheckoutFieldError('email', 'email-error', 'Vui lòng nhập email.');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setCheckoutFieldError('email', 'email-error', 'Email không đúng định dạng.');
            return false;
        }
        setCheckoutFieldError('email', 'email-error', '');
        return true;
    }

    if (fieldName === 'name') {
        var name = nameInput ? nameInput.value.trim() : '';
        if (!name) {
            setCheckoutFieldError('name', 'name-error', 'Vui lòng nhập họ và tên.');
            return false;
        }
        if (name.length < 2) {
            setCheckoutFieldError('name', 'name-error', 'Họ và tên phải có ít nhất 2 ký tự.');
            return false;
        }
        setCheckoutFieldError('name', 'name-error', '');
        return true;
    }

    if (fieldName === 'phone') {
        var phone = phoneInput ? phoneInput.value.replace(/\s+/g, '') : '';
        if (!phone) {
            setCheckoutFieldError('phone', 'phone-error', 'Vui lòng nhập số điện thoại.');
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            setCheckoutFieldError('phone', 'phone-error', 'Số điện thoại phải đủ 10 chữ số.');
            return false;
        }
        setCheckoutFieldError('phone', 'phone-error', '');
        return true;
    }

    if (fieldName === 'address') {
        var address = addressInput ? addressInput.value.trim() : '';
        if (!address) {
            setCheckoutFieldError('address', 'address-error', 'Vui lòng nhập địa chỉ.');
            return false;
        }
        if (address.length < 6) {
            setCheckoutFieldError('address', 'address-error', 'Địa chỉ cần chi tiết hơn.');
            return false;
        }
        setCheckoutFieldError('address', 'address-error', '');
        return true;
    }

    if (fieldName === 'province') {
        var province = provinceInput ? provinceInput.value.trim() : '';
        if (isPlaceholderValue(province, '-- Chọn tỉnh thành --')) {
            setCheckoutFieldError('province-input', 'province-error', 'Vui lòng chọn tỉnh thành.');
            return false;
        }
        setCheckoutFieldError('province-input', 'province-error', '');
        return true;
    }

    if (fieldName === 'district') {
        var district = districtInput ? districtInput.value.trim() : '';
        if (isPlaceholderValue(district, '-- Chọn quận/xã --')) {
            setCheckoutFieldError('district-input', 'district-error', 'Vui lòng chọn quận/xã.');
            return false;
        }
        setCheckoutFieldError('district-input', 'district-error', '');
        return true;
    }

    return true;
}


function validateCheckoutForm() {
    var fields = ['email', 'name', 'phone', 'address', 'province', 'district'];

    return fields.every(function(fieldName) {
        return validateCheckoutField(fieldName);
    });
}


function buildAddressSuggestions(keyword, district, province) {
    var normalizedKeyword = (keyword || '').trim();
    if (!normalizedKeyword) return [];

    var suffix = [];
    var suggestions = [normalizedKeyword];

    if (district && district !== '-- Chọn quận/xã --') {
        suffix.push(district);
    }

    if (province && province !== '-- Chọn tỉnh thành --') {
        suffix.push(province);
    }

    if (suffix.length) {
        suggestions.push(normalizedKeyword + ', ' + suffix.join(', '));
    }

    suggestions.push('Số nhà ' + normalizedKeyword);
    suggestions.push('Đường ' + normalizedKeyword);
    suggestions.push('Tòa nhà ' + normalizedKeyword);
    suggestions.push('Chung cư ' + normalizedKeyword);

    return suggestions.filter(function(item, index, list) {
        return item && list.indexOf(item) === index;
    }).slice(0, 5);
}


function initializeCheckoutAddressSuggestions() {
    var addressInput = document.getElementById('address');
    if (!addressInput || addressInput.dataset.suggestionReady === 'true') return;

    var field = addressInput.closest('.field') || addressInput.parentElement;
    if (!field) return;

    field.style.position = 'relative';

    var suggestionList = document.createElement('ul');
    suggestionList.id = 'address-suggestion-list';
    suggestionList.className = 'hidden';
    suggestionList.style.position = 'absolute';
    suggestionList.style.top = '100%';
    suggestionList.style.left = '0';
    suggestionList.style.right = '0';
    suggestionList.style.zIndex = '30';
    suggestionList.style.listStyle = 'none';
    suggestionList.style.padding = '0';
    suggestionList.style.margin = '0';
    suggestionList.style.maxHeight = '220px';
    suggestionList.style.overflowY = 'auto';
    suggestionList.style.background = '#fff';
    suggestionList.style.border = '1px solid #ddd';
    suggestionList.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.08)';

    field.appendChild(suggestionList);

    function hideSuggestions() {
        suggestionList.classList.add('hidden');
        suggestionList.innerHTML = '';
    }

    function renderSuggestions() {
        var keyword = addressInput.value.trim();
        var districtInput = document.getElementById('district-input');
        var provinceInput = document.getElementById('province-input');
        var suggestions = buildAddressSuggestions(
            keyword,
            districtInput ? districtInput.value.trim() : '',
            provinceInput ? provinceInput.value.trim() : ''
        );

        suggestionList.innerHTML = '';

        if (!suggestions.length) {
            hideSuggestions();
            return;
        }

        suggestions.forEach(function(suggestion) {
            var item = document.createElement('li');
            item.textContent = suggestion;
            item.style.padding = '10px 12px';
            item.style.cursor = 'pointer';
            item.style.borderBottom = '1px solid #eee';
            item.addEventListener('mousedown', function(event) {
                event.preventDefault();
                addressInput.value = suggestion;
                validateCheckoutField('address');
                hideSuggestions();
            });
            suggestionList.appendChild(item);
        });

        suggestionList.classList.remove('hidden');
    }

    addressInput.addEventListener('input', function() {
        validateCheckoutField('address');
        renderSuggestions();
    });

    addressInput.addEventListener('focus', function() {
        if (addressInput.value.trim()) {
            renderSuggestions();
        }
    });

    addressInput.addEventListener('blur', function() {
        setTimeout(hideSuggestions, 150);
    });

    document.addEventListener('click', function(event) {
        if (!field.contains(event.target)) {
            hideSuggestions();
        }
    });

    addressInput.dataset.suggestionReady = 'true';
}


function initializeCheckoutValidation() {
    if (document.body.dataset.checkoutValidationReady === 'true') return;

    var bindings = [
        { id: 'email', errorId: 'email-error', field: 'email', events: ['input', 'blur'] },
        { id: 'name', errorId: 'name-error', field: 'name', events: ['input', 'blur'] },
        { id: 'phone', errorId: 'phone-error', field: 'phone', events: ['input', 'blur'] },
        { id: 'address', errorId: 'address-error', field: 'address', events: ['input', 'blur'] },
        { id: 'province-input', errorId: 'province-error', field: 'province', events: ['input', 'blur', 'change'] },
        { id: 'district-input', errorId: 'district-error', field: 'district', events: ['input', 'blur', 'change'] }
    ];

    bindings.forEach(function(binding) {
        var input = document.getElementById(binding.id);
        if (!input) return;

        getOrCreateFieldError(binding.id, binding.errorId);

        binding.events.forEach(function(eventName) {
            input.addEventListener(eventName, function() {
                validateCheckoutField(binding.field);
            });
        });
    });

    initializeCheckoutAddressSuggestions();
    document.body.dataset.checkoutValidationReady = 'true';
}


$(document).ready(function() {
    $(document).on('submit', '.checkout-form', function(e) {
        e.preventDefault();
        console.log('Checkout form submitted');


        // TEMPORARILY DISABLE VALIDATION FOR TESTING
        var isValid = true;


        // // Validation
        // var isValid = true;
   
    // Validate phone number (must be exactly 9 digits)
    var phoneInput = document.getElementById('phone');
    var phoneError = document.getElementById('phone-error');
    var phone = phoneInput ? phoneInput.value.trim() : '';
   
    if (!phone || !/^\d{10}$/.test(phone)) {
        if (phoneError) {
            phoneError.textContent = 'Số điện thoại phải đủ 10 chữ số';
            phoneError.style.display = 'block';
        }
        isValid = false;
    } else {
        if (phoneError) phoneError.style.display = 'none';
    }
   
    // Validate province selection
    var provinceInput = document.getElementById('province-input');
    var provinceError = document.getElementById('province-error');
    var province = provinceInput ? provinceInput.value.trim() : '';
   
    if (!province || province === '-- Chọn tỉnh thành --') {
        if (provinceError) {
            provinceError.textContent = 'Vui lòng chọn tỉnh thành';
            provinceError.style.display = 'block';
        }
        isValid = false;
    } else {
        if (provinceError) provinceError.style.display = 'none';
    }
   
    // Validate district selection
    var districtInput = document.getElementById('district-input');
    var districtError = document.getElementById('district-error');
    var district = districtInput ? districtInput.value.trim() : '';
   
    if (!district || district === '-- Chọn quận/xã --') {
        if (districtError) {
            districtError.textContent = 'Vui lòng chọn quận/xã';
            districtError.style.display = 'block';
        }
        isValid = false;
    } else {
        if (districtError) districtError.style.display = 'none';
    }
   
    isValid = validateCheckoutForm() && isValid;

    // If validation fails, don't proceed
    if (!isValid) {
        console.log('Validation failed, cannot proceed with order');
        return;
    }


    console.log('Validation passed, proceeding with order');


    // Get cart items
    var cart = getCart();
    if (cart.length === 0) {
        showOrderPopup('Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
        return;
    }


    // Get user info
    var userName = localStorage.getItem('username') || 'Khách hàng';
    var userEmail = localStorage.getItem('useremail') || '';


    // Create order history entry
    var subtotal = cart.reduce(function(sum, item) {
        return sum + parseVND(item.price) * item.quantity;
    }, 0);
    var shipping = 15000;
    var total = subtotal + shipping;


    var order = {
        id: Date.now(),
        date: new Date().toLocaleString('vi-VN'),
        customerName: userName,
        customerEmail: userEmail,
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        total: total
    };


    // Save to localStorage
    var history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    history.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(history));


    // Clear cart and refresh totals
    localStorage.removeItem('cart');
    currentDiscount = 0;
    currentCoupon = '';
    syncDiscountState();
    populateCheckout();


    showOrderPopup('Đã đặt hàng thành công');
    console.log('Order popup should be displayed now');
    });
});


function showOrderPopup(message) {
    console.log('showOrderPopup called with message:', message);


    // Remove existing popup if any
    var existingPopup = document.getElementById('order-success-popup');
    if (existingPopup) {
        existingPopup.remove();
    }


    // Create new popup
    var popup = document.createElement('div');
    popup.id = 'order-success-popup';
    popup.textContent = message;


    // Style the popup
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.bottom = '20px';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = '#033E8C';
    popup.style.color = 'white';
    popup.style.padding = '15px 25px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    popup.style.zIndex = '10000';
    popup.style.fontSize = '16px';
    popup.style.fontWeight = 'bold';
    popup.style.textAlign = 'center';
    popup.style.maxWidth = '400px';
    popup.style.wordWrap = 'break-word';


    // Add to page
    document.body.appendChild(popup);
    console.log('Popup created and added to body');


    // Auto hide after 3 seconds
    setTimeout(function() {
        if (popup && popup.parentNode) {
            popup.style.transition = 'opacity 0.5s ease';
            popup.style.opacity = '0';
            setTimeout(function() {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500);
        }
    }, 3000);
};



function initializeModernCheckout() {
    if (!document.getElementById('cartItemsContainer')) return;
    if (document.body.dataset.modernCheckoutReady === 'true') return;
    document.body.dataset.modernCheckoutReady = 'true';

    // Ghi chú yêu cầu: JS thanh toán mới được tách từ file mẫu và chỉ chạy cho trang thanhtoan.html có cartItemsContainer.
// ========= DANH SÁCH 63 TỈNH THÀNH =========
    const provinces = [
        "Hà Nội", "TP. Hồ Chí Minh", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
        "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông",
        "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình",
        "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
        "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
        "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
        "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ];

    // ========= DANH SÁCH QUẬN/HUYỆN ĐẦY ĐỦ 63 TỈNH =========
    const districtsData = {
        "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Hai Bà Trưng", "Quận Đống Đa", "Quận Tây Hồ", "Quận Cầu Giấy", "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Long Biên", "Quận Bắc Từ Liêm", "Quận Nam Từ Liêm", "Thị xã Sơn Tây", "Huyện Đông Anh", "Huyện Sóc Sơn", "Huyện Thanh Trì", "Huyện Gia Lâm", "Huyện Hoài Đức", "Huyện Đan Phượng", "Huyện Thạch Thất", "Huyện Quốc Oai", "Huyện Thanh Oai", "Huyện Chương Mỹ", "Huyện Phúc Thọ", "Huyện Thường Tín", "Huyện Ứng Hòa", "Huyện Mỹ Đức"],
        "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú", "Quận Bình Tân", "Thành phố Thủ Đức", "Huyện Bình Chánh", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè", "Huyện Cần Giờ"],
        "Hải Phòng": ["Quận Hồng Bàng", "Quận Lê Chân", "Quận Ngô Quyền", "Quận Kiến An", "Quận Hải An", "Quận Dương Kinh", "Quận Đồ Sơn", "Huyện An Dương", "Huyện An Lão", "Huyện Kiến Thụy", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo", "Huyện Thủy Nguyên", "Huyện Cát Hải"],
        "Đà Nẵng": ["Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ", "Huyện Hòa Vang"],
        "Cần Thơ": ["Quận Ninh Kiều", "Quận Bình Thủy", "Quận Cái Răng", "Quận Ô Môn", "Quận Thốt Nốt", "Huyện Phong Điền", "Huyện Cờ Đỏ", "Huyện Vĩnh Thạnh", "Huyện Thới Lai"],
        "An Giang": ["Thành phố Long Xuyên", "Thành phố Châu Đốc", "Thị xã Tân Châu", "Huyện An Phú", "Huyện Châu Phú", "Huyện Châu Thành", "Huyện Chợ Mới", "Huyện Phú Tân", "Huyện Thoại Sơn", "Huyện Tịnh Biên", "Huyện Tri Tôn"],
        "Bà Rịa - Vũng Tàu": ["Thành phố Vũng Tàu", "Thành phố Bà Rịa", "Thị xã Phú Mỹ", "Huyện Châu Đức", "Huyện Long Điền", "Huyện Đất Đỏ", "Huyện Xuyên Mộc", "Huyện Côn Đảo"],
        "Bắc Giang": ["Thành phố Bắc Giang", "Huyện Hiệp Hòa", "Huyện Lạng Giang", "Huyện Lục Nam", "Huyện Lục Ngạn", "Huyện Sơn Động", "Huyện Tân Yên", "Huyện Việt Yên", "Huyện Yên Dũng", "Huyện Yên Thế"],
        "Bắc Kạn": ["Thành phố Bắc Kạn", "Huyện Ba Bể", "Huyện Bạch Thông", "Huyện Chợ Đồn", "Huyện Chợ Mới", "Huyện Na Rì", "Huyện Ngân Sơn", "Huyện Pác Nặm"],
        "Bạc Liêu": ["Thành phố Bạc Liêu", "Thị xã Giá Rai", "Huyện Đông Hải", "Huyện Hòa Bình", "Huyện Hồng Dân", "Huyện Phước Long", "Huyện Vĩnh Lợi"],
        "Bắc Ninh": ["Thành phố Bắc Ninh", "Thị xã Từ Sơn", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ", "Huyện Thuận Thành", "Huyện Tiên Du", "Huyện Yên Phong"],
        "Bến Tre": ["Thành phố Bến Tre", "Huyện Ba Tri", "Huyện Bình Đại", "Huyện Châu Thành", "Huyện Chợ Lách", "Huyện Giồng Trôm", "Huyện Mỏ Cày Bắc", "Huyện Mỏ Cày Nam", "Huyện Thạnh Phú"],
        "Bình Dương": ["Thành phố Thủ Dầu Một", "Thành phố Dĩ An", "Thành phố Thuận An", "Thành phố Bến Cát", "Thị xã Tân Uyên", "Huyện Bàu Bàng", "Huyện Phú Giáo", "Huyện Dầu Tiếng"],
        "Bình Định": ["Thành phố Quy Nhơn", "Thị xã An Nhơn", "Thị xã Hoài Nhơn", "Huyện An Lão", "Huyện Hoài Ân", "Huyện Phù Cát", "Huyện Phù Mỹ", "Huyện Tuy Phước", "Huyện Tây Sơn", "Huyện Vân Canh", "Huyện Vĩnh Thạnh"],
        "Bình Phước": ["Thành phố Đồng Xoài", "Thị xã Bình Long", "Thị xã Phước Long", "Huyện Bù Đăng", "Huyện Bù Đốp", "Huyện Bù Gia Mập", "Huyện Chơn Thành", "Huyện Đồng Phú", "Huyện Hớn Quản", "Huyện Lộc Ninh", "Huyện Phú Riềng"],
        "Bình Thuận": ["Thành phố Phan Thiết", "Thị xã La Gi", "Huyện Bắc Bình", "Huyện Đức Linh", "Huyện Hàm Tân", "Huyện Hàm Thuận Bắc", "Huyện Hàm Thuận Nam", "Huyện Phú Quý", "Huyện Tánh Linh", "Huyện Tuy Phong"],
        "Cà Mau": ["Thành phố Cà Mau", "Huyện Cái Nước", "Huyện Đầm Dơi", "Huyện Năm Căn", "Huyện Ngọc Hiển", "Huyện Phú Tân", "Huyện Thới Bình", "Huyện Trần Văn Thời", "Huyện U Minh"],
        "Cao Bằng": ["Thành phố Cao Bằng", "Huyện Bảo Lạc", "Huyện Bảo Lâm", "Huyện Hạ Lang", "Huyện Hà Quảng", "Huyện Hòa An", "Huyện Nguyên Bình", "Huyện Quảng Hòa", "Huyện Thạch An", "Huyện Trùng Khánh"],
        "Đắk Lắk": ["Thành phố Buôn Ma Thuột", "Thị xã Buôn Hồ", "Huyện Buôn Đôn", "Huyện Cư Kuin", "Huyện Cư M'gar", "Huyện Ea H'leo", "Huyện Ea Kar", "Huyện Ea Súp", "Huyện Krông Ana", "Huyện Krông Bông", "Huyện Krông Buk", "Huyện Krông Năng", "Huyện Krông Pắc", "Huyện Lắk", "Huyện M'Đrăk"],
        "Đắk Nông": ["Thành phố Gia Nghĩa", "Huyện Cư Jút", "Huyện Đăk Glong", "Huyện Đăk Mil", "Huyện Đăk R'lấp", "Huyện Đăk Song", "Huyện Krông Nô", "Huyện Tuy Đức"],
        "Điện Biên": ["Thành phố Điện Biên Phủ", "Thị xã Mường Lay", "Huyện Điện Biên", "Huyện Điện Biên Đông", "Huyện Mường Ảng", "Huyện Mường Chà", "Huyện Mường Nhé", "Huyện Nậm Pồ", "Huyện Tủa Chùa", "Huyện Tuần Giáo"],
        "Đồng Nai": ["Thành phố Biên Hòa", "Thành phố Long Khánh", "Huyện Cẩm Mỹ", "Huyện Định Quán", "Huyện Long Thành", "Huyện Nhơn Trạch", "Huyện Tân Phú", "Huyện Thống Nhất", "Huyện Trảng Bom", "Huyện Vĩnh Cửu", "Huyện Xuân Lộc"],
        "Đồng Tháp": ["Thành phố Cao Lãnh", "Thành phố Sa Đéc", "Thị xã Hồng Ngự", "Huyện Cao Lãnh", "Huyện Châu Thành", "Huyện Hồng Ngự", "Huyện Lai Vung", "Huyện Lấp Vò", "Huyện Tam Nông", "Huyện Tân Hồng", "Huyện Thanh Bình", "Huyện Tháp Mười"],
        "Gia Lai": ["Thành phố Pleiku", "Thị xã An Khê", "Thị xã Ayun Pa", "Huyện Chư Păh", "Huyện Chư Prông", "Huyện Chư Sê", "Huyện Đắk Đoa", "Huyện Đắk Pơ", "Huyện Đức Cơ", "Huyện Ia Grai", "Huyện Ia Pa", "Huyện K'Bang", "Huyện Kông Chro", "Huyện Krông Pa", "Huyện Mang Yang", "Huyện Phú Thiện"],
        "Hà Giang": ["Thành phố Hà Giang", "Huyện Bắc Mê", "Huyện Bắc Quang", "Huyện Đồng Văn", "Huyện Hoàng Su Phì", "Huyện Mèo Vạc", "Huyện Quản Bạ", "Huyện Quang Bình", "Huyện Vị Xuyên", "Huyện Xín Mần", "Huyện Yên Minh"],
        "Hà Nam": ["Thành phố Phủ Lý", "Thị xã Duy Tiên", "Huyện Bình Lục", "Huyện Kim Bảng", "Huyện Lý Nhân", "Huyện Thanh Liêm"],
        "Hà Tĩnh": ["Thành phố Hà Tĩnh", "Thị xã Hồng Lĩnh", "Huyện Cẩm Xuyên", "Huyện Can Lộc", "Huyện Đức Thọ", "Huyện Hương Khê", "Huyện Hương Sơn", "Huyện Kỳ Anh", "Huyện Nghi Xuân", "Huyện Thạch Hà", "Huyện Vũ Quang"],
        "Hải Dương": ["Thành phố Hải Dương", "Thị xã Chí Linh", "Huyện Bình Giang", "Huyện Cẩm Giàng", "Huyện Gia Lộc", "Huyện Kim Thành", "Huyện Nam Sách", "Huyện Ninh Giang", "Huyện Thanh Hà", "Huyện Thanh Miện", "Huyện Tứ Kỳ"],
        "Hậu Giang": ["Thành phố Vị Thanh", "Thành phố Ngã Bảy", "Thị xã Long Mỹ", "Huyện Châu Thành A", "Huyện Châu Thành", "Huyện Long Mỹ", "Huyện Phụng Hiệp", "Huyện Vị Thủy"],
        "Hòa Bình": ["Thành phố Hòa Bình", "Huyện Cao Phong", "Huyện Đà Bắc", "Huyện Kim Bôi", "Huyện Lạc Sơn", "Huyện Lạc Thủy", "Huyện Lương Sơn", "Huyện Mai Châu", "Huyện Tân Lạc", "Huyện Yên Thủy"],
        "Hưng Yên": ["Thành phố Hưng Yên", "Thị xã Mỹ Hào", "Huyện Ân Thi", "Huyện Khoái Châu", "Huyện Kim Động", "Huyện Phù Cừ", "Huyện Tiên Lữ", "Huyện Văn Giang", "Huyện Văn Lâm", "Huyện Yên Mỹ"],
        "Khánh Hòa": ["Thành phố Nha Trang", "Thành phố Cam Ranh", "Thị xã Ninh Hòa", "Huyện Diên Khánh", "Huyện Khánh Sơn", "Huyện Khánh Vĩnh", "Huyện Trường Sa", "Huyện Vạn Ninh"],
        "Kiên Giang": ["Thành phố Rạch Giá", "Thành phố Hà Tiên", "Thị xã Phú Quốc", "Huyện An Biên", "Huyện An Minh", "Huyện Châu Thành", "Huyện Giồng Riềng", "Huyện Gò Quao", "Huyện Hòn Đất", "Huyện Kiên Hải", "Huyện Kiên Lương", "Huyện Tân Hiệp", "Huyện U Minh Thượng", "Huyện Vĩnh Thuận"],
        "Kon Tum": ["Thành phố Kon Tum", "Huyện Đăk Glei", "Huyện Đăk Hà", "Huyện Đăk Tô", "Huyện Ia H'Drai", "Huyện Kon Plông", "Huyện Kon Rẫy", "Huyện Ngọc Hồi", "Huyện Sa Thầy", "Huyện Tu Mơ Rông"],
        "Lai Châu": ["Thành phố Lai Châu", "Huyện Mường Tè", "Huyện Nậm Nhùn", "Huyện Phong Thổ", "Huyện Sìn Hồ", "Huyện Tam Đường", "Huyện Tân Uyên", "Huyện Than Uyên"],
        "Lâm Đồng": ["Thành phố Đà Lạt", "Thành phố Bảo Lộc", "Huyện Bảo Lâm", "Huyện Cát Tiên", "Huyện Đạ Huoai", "Huyện Đạ Tẻh", "Huyện Đam Rông", "Huyện Di Linh", "Huyện Đơn Dương", "Huyện Đức Trọng", "Huyện Lạc Dương", "Huyện Lâm Hà"],
        "Lạng Sơn": ["Thành phố Lạng Sơn", "Huyện Bắc Sơn", "Huyện Bình Gia", "Huyện Cao Lộc", "Huyện Chi Lăng", "Huyện Đình Lập", "Huyện Hữu Lũng", "Huyện Lộc Bình", "Huyện Tràng Định", "Huyện Văn Lãng", "Huyện Văn Quan"],
        "Lào Cai": ["Thành phố Lào Cai", "Thị xã Sa Pa", "Huyện Bắc Hà", "Huyện Bảo Thắng", "Huyện Bảo Yên", "Huyện Bát Xát", "Huyện Mường Khương", "Huyện Si Ma Cai", "Huyện Văn Bàn"],
        "Long An": ["Thành phố Tân An", "Thị xã Kiến Tường", "Huyện Bến Lức", "Huyện Cần Đước", "Huyện Cần Giuộc", "Huyện Châu Thành", "Huyện Đức Hòa", "Huyện Đức Huệ", "Huyện Mộc Hóa", "Huyện Tân Hưng", "Huyện Tân Thạnh", "Huyện Tân Trụ", "Huyện Thạnh Hóa", "Huyện Thủ Thừa", "Huyện Vĩnh Hưng"],
        "Nam Định": ["Thành phố Nam Định", "Huyện Giao Thủy", "Huyện Hải Hậu", "Huyện Mỹ Lộc", "Huyện Nam Trực", "Huyện Nghĩa Hưng", "Huyện Trực Ninh", "Huyện Vụ Bản", "Huyện Xuân Trường", "Huyện Ý Yên"],
        "Nghệ An": ["Thành phố Vinh", "Thị xã Cửa Lò", "Thị xã Thái Hòa", "Thị xã Hoàng Mai", "Huyện Anh Sơn", "Huyện Con Cuông", "Huyện Diễn Châu", "Huyện Đô Lương", "Huyện Hưng Nguyên", "Huyện Kỳ Sơn", "Huyện Nam Đàn", "Huyện Nghi Lộc", "Huyện Nghĩa Đàn", "Huyện Quế Phong", "Huyện Quỳ Châu", "Huyện Quỳ Hợp", "Huyện Quỳnh Lưu", "Huyện Tân Kỳ", "Huyện Thanh Chương", "Huyện Tương Dương", "Huyện Yên Thành"],
        "Ninh Bình": ["Thành phố Ninh Bình", "Thành phố Tam Điệp", "Huyện Gia Viễn", "Huyện Hoa Lư", "Huyện Kim Sơn", "Huyện Nho Quan", "Huyện Yên Khánh", "Huyện Yên Mô"],
        "Ninh Thuận": ["Thành phố Phan Rang - Tháp Chàm", "Huyện Bác Ái", "Huyện Ninh Hải", "Huyện Ninh Phước", "Huyện Ninh Sơn", "Huyện Thuận Bắc", "Huyện Thuận Nam"],
        "Phú Thọ": ["Thành phố Việt Trì", "Thị xã Phú Thọ", "Huyện Cẩm Khê", "Huyện Đoan Hùng", "Huyện Hạ Hòa", "Huyện Lâm Thao", "Huyện Phù Ninh", "Huyện Tam Nông", "Huyện Tân Sơn", "Huyện Thanh Ba", "Huyện Thanh Sơn", "Huyện Thanh Thủy", "Huyện Yên Lập"],
        "Phú Yên": ["Thành phố Tuy Hòa", "Thị xã Sông Cầu", "Thị xã Đông Hòa", "Huyện Đồng Xuân", "Huyện Phú Hòa", "Huyện Sơn Hòa", "Huyện Sông Hinh", "Huyện Tây Hòa", "Huyện Tuy An"],
        "Quảng Bình": ["Thành phố Đồng Hới", "Thị xã Ba Đồn", "Huyện Bố Trạch", "Huyện Lệ Thủy", "Huyện Minh Hóa", "Huyện Quảng Ninh", "Huyện Quảng Trạch", "Huyện Tuyên Hóa"],
        "Quảng Nam": ["Thành phố Tam Kỳ", "Thành phố Hội An", "Thị xã Điện Bàn", "Huyện Bắc Trà My", "Huyện Đại Lộc", "Huyện Đông Giang", "Huyện Duy Xuyên", "Huyện Hiệp Đức", "Huyện Nam Giang", "Huyện Nam Trà My", "Huyện Nông Sơn", "Huyện Núi Thành", "Huyện Phú Ninh", "Huyện Phước Sơn", "Huyện Quế Sơn", "Huyện Tây Giang", "Huyện Thăng Bình", "Huyện Tiên Phước", "Huyện Trà My"],
        "Quảng Ngãi": ["Thành phố Quảng Ngãi", "Thị xã Đức Phổ", "Huyện Ba Tơ", "Huyện Bình Sơn", "Huyện Lý Sơn", "Huyện Minh Long", "Huyện Mộ Đức", "Huyện Nghĩa Hành", "Huyện Sơn Hà", "Huyện Sơn Tây", "Huyện Sơn Tịnh", "Huyện Trà Bồng", "Huyện Tư Nghĩa"],
        "Quảng Ninh": ["Thành phố Hạ Long", "Thành phố Cẩm Phả", "Thành phố Móng Cái", "Thành phố Uông Bí", "Thị xã Đông Triều", "Thị xã Quảng Yên", "Huyện Ba Chẽ", "Huyện Bình Liêu", "Huyện Cô Tô", "Huyện Đầm Hà", "Huyện Hải Hà", "Huyện Hoành Bồ", "Huyện Tiên Yên", "Huyện Vân Đồn"],
        "Quảng Trị": ["Thành phố Đông Hà", "Thị xã Quảng Trị", "Huyện Cam Lộ", "Huyện Cồn Cỏ", "Huyện Đa Krông", "Huyện Gio Linh", "Huyện Hải Lăng", "Huyện Hướng Hóa", "Huyện Triệu Phong", "Huyện Vĩnh Linh"],
        "Sóc Trăng": ["Thành phố Sóc Trăng", "Thị xã Vĩnh Châu", "Thị xã Ngã Năm", "Huyện Châu Thành", "Huyện Cù Lao Dung", "Huyện Kế Sách", "Huyện Long Phú", "Huyện Mỹ Tú", "Huyện Mỹ Xuyên", "Huyện Thạnh Trị", "Huyện Trần Đề"],
        "Sơn La": ["Thành phố Sơn La", "Huyện Bắc Yên", "Huyện Mai Sơn", "Huyện Mộc Châu", "Huyện Mường La", "Huyện Phù Yên", "Huyện Quỳnh Nhai", "Huyện Sông Mã", "Huyện Sốp Cộp", "Huyện Thuận Châu", "Huyện Vân Hồ", "Huyện Yên Châu"],
        "Tây Ninh": ["Thành phố Tây Ninh", "Thị xã Trảng Bàng", "Thị xã Hòa Thành", "Huyện Bến Cầu", "Huyện Châu Thành", "Huyện Dương Minh Châu", "Huyện Gò Dầu", "Huyện Tân Biên", "Huyện Tân Châu"],
        "Thái Bình": ["Thành phố Thái Bình", "Huyện Đông Hưng", "Huyện Hưng Hà", "Huyện Kiến Xương", "Huyện Quỳnh Phụ", "Huyện Thái Thụy", "Huyện Tiền Hải", "Huyện Vũ Thư"],
        "Thái Nguyên": ["Thành phố Thái Nguyên", "Thành phố Sông Công", "Thị xã Phổ Yên", "Huyện Đại Từ", "Huyện Định Hóa", "Huyện Đồng Hỷ", "Huyện Phú Bình", "Huyện Phú Lương", "Huyện Võ Nhai"],
        "Thanh Hóa": ["Thành phố Thanh Hóa", "Thành phố Sầm Sơn", "Thị xã Bỉm Sơn", "Thị xã Nghi Sơn", "Huyện Bá Thước", "Huyện Cẩm Thủy", "Huyện Đông Sơn", "Huyện Hà Trung", "Huyện Hậu Lộc", "Huyện Hoằng Hóa", "Huyện Lang Chánh", "Huyện Mường Lát", "Huyện Nga Sơn", "Huyện Ngọc Lặc", "Huyện Như Thanh", "Huyện Như Xuân", "Huyện Nông Cống", "Huyện Quan Hóa", "Huyện Quan Sơn", "Huyện Quảng Xương", "Huyện Thạch Thành", "Huyện Thiệu Hóa", "Huyện Thọ Xuân", "Huyện Thường Xuân", "Huyện Tĩnh Gia", "Huyện Triệu Sơn", "Huyện Vĩnh Lộc", "Huyện Yên Định"],
        "Thừa Thiên Huế": ["Thành phố Huế", "Thị xã Hương Thủy", "Thị xã Hương Trà", "Huyện A Lưới", "Huyện Nam Đông", "Huyện Phong Điền", "Huyện Phú Lộc", "Huyện Phú Vang", "Huyện Quảng Điền"],
        "Tiền Giang": ["Thành phố Mỹ Tho", "Thị xã Cai Lậy", "Thị xã Gò Công", "Huyện Cai Lậy", "Huyện Châu Thành", "Huyện Chợ Gạo", "Huyện Gò Công Đông", "Huyện Gò Công Tây", "Huyện Tân Phú Đông", "Huyện Tân Phước"],
        "Trà Vinh": ["Thành phố Trà Vinh", "Thị xã Duyên Hải", "Huyện Càng Long", "Huyện Cầu Kè", "Huyện Cầu Ngang", "Huyện Châu Thành", "Huyện Duyên Hải", "Huyện Tiểu Cần", "Huyện Trà Cú"],
        "Tuyên Quang": ["Thành phố Tuyên Quang", "Huyện Chiêm Hóa", "Huyện Hàm Yên", "Huyện Lâm Bình", "Huyện Na Hang", "Huyện Sơn Dương", "Huyện Yên Sơn"],
        "Vĩnh Long": ["Thành phố Vĩnh Long", "Thị xã Bình Minh", "Huyện Bình Tân", "Huyện Long Hồ", "Huyện Mang Thít", "Huyện Tam Bình", "Huyện Trà Ôn", "Huyện Vũng Liêm"],
        "Vĩnh Phúc": ["Thành phố Vĩnh Yên", "Thành phố Phúc Yên", "Huyện Bình Xuyên", "Huyện Lập Thạch", "Huyện Sông Lô", "Huyện Tam Dương", "Huyện Tam Đảo", "Huyện Vĩnh Tường", "Huyện Yên Lạc"],
        "Yên Bái": ["Thành phố Yên Bái", "Thị xã Nghĩa Lộ", "Huyện Lục Yên", "Huyện Mù Cang Chải", "Huyện Trạm Tấu", "Huyện Trấn Yên", "Huyện Văn Chấn", "Huyện Văn Yên", "Huyện Yên Bình"]
    };

    function getDistricts(province) {
        return districtsData[province] || ["Quận/Huyện trung tâm", "Huyện phía Bắc", "Huyện phía Nam", "Thị xã"];
    }

    // Load danh sách tỉnh
    const provinceSelect = document.getElementById('provinceSelect');
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });

    const districtSelect = document.getElementById('districtSelect');

    function populateDistricts() {
        const selectedProvince = provinceSelect.value;
        districtSelect.innerHTML = '<option value="">-- Chọn Quận/Huyện --</option>';
        if (!selectedProvince) return;
        const districts = getDistricts(selectedProvince);
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }

    provinceSelect.addEventListener('change', populateDistricts);

    // ========= GIỎ HÀNG ĐỘNG - LẤY TỪ localStorage =========
    let cartItems = [];

    // Hàm lấy dữ liệu giỏ hàng từ localStorage (được thêm từ trang sản phẩm)
    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                cartItems = typeof getCart === 'function' ? getCart() : JSON.parse(storedCart);
            } catch(e) {
                cartItems = [];
            }
        } else {
            cartItems = [];
        }
        
        // Nếu không có dữ liệu, giỏ hàng trống
        if (!cartItems || cartItems.length === 0) {
            cartItems = [];
        }
        
        renderCart();
    }

    const cartContainer = document.getElementById('cartItemsContainer');
    const subtotalSpan = document.getElementById('subtotalAmount');
    const shipFeeSpan = document.getElementById('shipFeeDisplay');
    const totalSpan = document.getElementById('totalAmount');
    const couponInput = document.getElementById('couponCodeInput');
    const applyBtn = document.getElementById('applyCouponBtn');
    const couponMsgDiv = document.getElementById('couponMsg');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    let shipping = 15000;
    let discountAmount = 0;

    function getItemPrice(item) {
        if (!item) return 0;
        if (typeof parseVND === 'function') {
            return parseVND(item.price || item.productPrice || 0);
        }
        const normalized = String(item.price || item.productPrice || 0).replace(/\./g, '').replace(/₫/g, '').trim();
        return parseInt(normalized, 10) || 0;
    }

    function calculateSubtotal() {
        return cartItems.reduce((sum, item) => sum + (getItemPrice(item) * item.quantity), 0);
    }

    function renderCart() {
        if (!cartContainer) return;
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<div class="cart-empty-msg">🛒 Giỏ hàng của bạn đang trống</div>';
            updateTotals();
            return;
        }
        
        cartContainer.innerHTML = cartItems.map(item => `
            <li>
                <span class="product-name">${item.name}</span>
                <span class="product-qty">x${item.quantity}</span>
                <span class="product-price">${(getItemPrice(item) * item.quantity).toLocaleString('vi-VN')}₫</span>
            </li>
        `).join('');
        
        updateTotals();
    }

    function updateTotals() {
    const subtotal = calculateSubtotal();
    subtotalSpan.innerText = subtotal.toLocaleString('vi-VN') + '₫';
    
    // Tự động miễn phí vận chuyển khi đơn >= 500.000đ
    if (subtotal >= 500000 && cartItems.length > 0) {
        shipping = 0;
        shipFeeSpan.innerText = 'Miễn phí';
        shipFeeSpan.style.color = 'green';
        shipFeeSpan.style.fontWeight = '600';
    } else if (discountAmount < 15000) {
        shipping = 15000;
        shipFeeSpan.innerText = shipping.toLocaleString('vi-VN') + '₫';
        shipFeeSpan.style.color = '';
        shipFeeSpan.style.fontWeight = '';
    }
    
    let total = subtotal + shipping - discountAmount;
    if (total < 0) total = 0;
    
    if (cartItems.length === 0) {
        totalSpan.innerText = shipping.toLocaleString('vi-VN') + '₫';
    } else {
        totalSpan.innerText = total.toLocaleString('vi-VN') + '₫';
    }
}

    function applyDiscount() {
        const code = couponInput.value.trim().toUpperCase();
        const subtotal = calculateSubtotal();
        
        if (cartItems.length === 0) {
            couponMsgDiv.innerHTML = '<span style="color:#d9534f;">❌ Giỏ hàng trống, không thể áp dụng mã giảm giá</span>';
            return;
        }
        
        if (!code) {
            couponMsgDiv.innerHTML = '<span style="color:#d9534f;">❌ Vui lòng nhập mã giảm giá</span>';
            return;
        }
        
        if (code === "GIAM15") {
            discountAmount = subtotal * 0.15;
            couponMsgDiv.innerHTML = `<span style="color:#2c7a4a;">✅ Áp dụng GIAM15: giảm 15% ( -${discountAmount.toLocaleString('vi-VN')}₫ )</span>`;
        } else if (code === "FREESHIP") {
            discountAmount = shipping;
            shipping = 0;
            couponMsgDiv.innerHTML = `<span style="color:#2c7a4a;">✅ Áp dụng FREESHIP: Miễn phí vận chuyển ( -${discountAmount.toLocaleString('vi-VN')}₫ )</span>`;
        } else if (code === "THE180C") {
            discountAmount = 50000;
            couponMsgDiv.innerHTML = `<span style="color:#2c7a4a;">✅ Áp dụng THE180C: giảm 50.000đ ( -${discountAmount.toLocaleString('vi-VN')}₫ )</span>`;
        } else {
            couponMsgDiv.innerHTML = '<span style="color:#d9534f;">❌ Mã không hợp lệ! (Gợi ý: GIAM15, FREESHIP, THE180C)</span>';
            return;
        }
        updateTotals();
    }

    applyBtn.addEventListener('click', applyDiscount);

    // ========= VALIDATION FORM =========
    function validateForm() {
        let isValid = true;
        
        const fullname = document.getElementById('fullname').value.trim();
        if (!fullname) {
            document.getElementById('fullnameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('fullnameError').style.display = 'none';
        }
        
        const phone = document.getElementById('phone').value.trim();
        const phoneRegex = /^(0[3|5|7|8|9])[0-9]{8}$/;
        if (!phone || !phoneRegex.test(phone)) {
            document.getElementById('phoneError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('phoneError').style.display = 'none';
        }
        
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('emailError').style.display = 'none';
        }
        
        const street = document.getElementById('streetAddress').value.trim();
        if (!street) {
            document.getElementById('streetError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('streetError').style.display = 'none';
        }
        
        const province = provinceSelect.value;
        if (!province) {
            document.getElementById('provinceError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('provinceError').style.display = 'none';
        }
        
        const district = districtSelect.value;
        if (!district) {
            document.getElementById('districtError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('districtError').style.display = 'none';
        }
        
        if (cartItems.length === 0) {
            showCheckoutPopup('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng!', 'error');
            isValid = false;
        }
        
        return isValid;
    }

    function showCheckoutPopup(message, type, redirectUrl) {
        const oldPopup = document.getElementById('checkout-result-popup');
        if (oldPopup) {
            oldPopup.remove();
        }

        const popup = document.createElement('div');
        popup.id = 'checkout-result-popup';
        popup.className = 'checkout-result-popup ' + (type === 'success' ? 'success' : 'error');
        popup.innerHTML = `
            <div class="checkout-result-popup__box">
                <div class="checkout-result-popup__icon">${type === 'success' ? '✓' : '!'}</div>
                <div class="checkout-result-popup__message">${message}</div>
            </div>
        `;

        document.body.appendChild(popup);

        if (redirectUrl) {
            setTimeout(function() {
                window.location.href = redirectUrl;
            }, 1600);
        } else {
            setTimeout(function() {
                popup.classList.add('is-hiding');
                setTimeout(function() {
                    if (popup.parentNode) {
                        popup.remove();
                    }
                }, 220);
            }, 1800);
        }
    }

    // ========= MODAL THẺ NGÂN HÀNG =========
    const modal = document.getElementById('bankModal');
    const bankRadio = document.getElementById('bankRadio');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const confirmBankModalBtn = document.getElementById('confirmBankModalBtn');
    const modalBankStatus = document.getElementById('modalBankStatus');
    let isBankVerified = false;

    function openModal() {
        // Ghi chú yêu cầu: thêm class is-open để modal thẻ chỉ bắt click khi mở, không che khu vực nhập thông tin đơn hàng.
        modal.classList.add('is-open');
        modal.style.display = 'flex';
        document.getElementById('modalCardNumber').value = '';
        document.getElementById('modalExpiryDate').value = '';
        document.getElementById('modalCvv').value = '';
        document.getElementById('modalCardHolderName').value = '';
        modalBankStatus.innerHTML = '';
        isBankVerified = false;
        updatePlaceOrderButton();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.style.display = 'none';
    }

    bankRadio.addEventListener('change', function() {
        if (this.checked) {
            openModal();
        }
    });

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    confirmBankModalBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('modalCardNumber').value.trim();
        const expiryDate = document.getElementById('modalExpiryDate').value.trim();
        const cvv = document.getElementById('modalCvv').value.trim();
        const cardHolderName = document.getElementById('modalCardHolderName').value.trim();

        if (!cardNumber) {
            modalBankStatus.innerHTML = '<span class="error">❌ Vui lòng nhập số thẻ</span>';
            return;
        }
        if (!expiryDate) {
            modalBankStatus.innerHTML = '<span class="error">❌ Vui lòng nhập ngày hết hạn</span>';
            return;
        }
        if (!cvv) {
            modalBankStatus.innerHTML = '<span class="error">❌ Vui lòng nhập mã CVV</span>';
            return;
        }
        if (!cardHolderName) {
            modalBankStatus.innerHTML = '<span class="error">❌ Vui lòng nhập tên chủ thẻ</span>';
            return;
        }

        isBankVerified = true;
        modalBankStatus.innerHTML = '<span class="success">✅ Xác nhận thẻ thành công!</span>';
        setTimeout(() => {
            closeModal();
            updatePlaceOrderButton();
        }, 1000);
    });

    function updatePlaceOrderButton() {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (paymentMethod === 'bank' && !isBankVerified) {
            placeOrderBtn.disabled = true;
            placeOrderBtn.style.opacity = '0.5';
        } else {
            placeOrderBtn.disabled = false;
            placeOrderBtn.style.opacity = '1';
        }
    }

    document.querySelectorAll('input[name="paymentMethod"]').forEach(function(input) {
        input.addEventListener('change', updatePlaceOrderButton);
    });

    // ========= ĐẶT HÀNG =========
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const fullname = document.getElementById('fullname').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const street = document.getElementById('streetAddress').value.trim();
        const province = provinceSelect.value;
        const district = districtSelect.value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        if (paymentMethod === 'bank' && !isBankVerified) {
            showCheckoutPopup('Vui lòng xác nhận thẻ ngân hàng trước khi đặt hàng!', 'error');
            return;
        }

        const paymentText = { cod: 'COD thanh toán khi nhận hàng', momo: 'Ví MoMo', bank: 'Thẻ ngân hàng', zalopay: 'ZaloPay' }[paymentMethod];
        const fullAddress = `${street}, ${district}, ${province}`;
        const totalAmount = cartItems.length === 0 ? shipping : (calculateSubtotal() + shipping - discountAmount);
        
        // Sau khi đặt hàng thành công, xóa giỏ hàng trong localStorage
        const order = {
            id: Date.now(),
            date: new Date().toLocaleString('vi-VN'),
            customerName: fullname,
            customerEmail: email,
            items: cartItems,
            subtotal: calculateSubtotal(),
            shipping: shipping,
            discount: discountAmount,
            total: totalAmount,
            paymentMethod: paymentText,
            address: fullAddress
        };
        const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        history.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(history));
        localStorage.removeItem('cart');
        if (typeof updateCartBadge === 'function') updateCartBadge();
        cartItems = [];
        renderCart();
        
        // Ghi chú yêu cầu: popup sau khi đặt hàng chỉ hiển thị nội dung ngắn gọn "Đã đặt hàng thành công".
        showCheckoutPopup('Đã đặt hàng thành công', 'success', 'index.html');
    });

    // Load giỏ hàng từ localStorage khi trang được tải
    loadCartFromStorage();
    
    // Lắng nghe sự kiện storage để cập nhật giỏ hàng khi có thay đổi từ trang khác
    window.addEventListener('storage', function(e) {
        if (e.key === 'cart') {
            loadCartFromStorage();
        }
    });
}

// Buy again functionality
$(document).on('click', '.Buy-again', function(e) {
    e.preventDefault();
    var productId = $(this).data('product-id');
    var name = $(this).data('product-name');
    var price = $(this).data('product-price');
    var image = $(this).data('product-image');
   
    // Xóa giỏ hàng cũ, chỉ giữ đúng sản phẩm này
    var newCart = [sanitizeCartItem({
        id: productId,
        name: name,
        price: String(price),
        image: image,
        quantity: 1
    }, 0)];
    saveCart(newCart);
    updateCartBadge();
   
    // Redirect to checkout
    window.location.href = 'thanhtoan.html';
});


function loadOrderHistory() {
    var history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    var container = document.querySelector('.dropdown-user-info-history-content');
   
    if (!container) return;
   
    var nameElement = container.querySelector('.customer-name');
    var nameSpan = container.querySelector('.dropdown-user-info-history-content-name');
    var itemContainer = container.querySelector('.dropdown-user-info-history-content-item');
    var noHistoryMessage = container.querySelector('.no-history-message');
   
    if (history.length === 0) {
        // No history, show empty message
        if (nameElement) nameElement.style.display = 'none';
        if (itemContainer) itemContainer.style.display = 'none';
        if (noHistoryMessage) noHistoryMessage.style.display = 'block';
    } else {
        // Has history, show customer name and items
        var userName = localStorage.getItem('username') || 'Khách hàng';
        if (nameSpan) nameSpan.textContent = userName;
        if (nameElement) nameElement.style.display = 'block';
        if (itemContainer) itemContainer.style.display = 'block';
        if (noHistoryMessage) noHistoryMessage.style.display = 'none';
       
        // Clear existing items
        if (itemContainer) itemContainer.innerHTML = '';
       
        // Add orders
        history.forEach(function(order) {
            order.items.forEach(function(item) {
                var itemDiv = document.createElement('div');
                itemDiv.className = 'dropdown-user-info-history-product-item';
                itemDiv.innerHTML = `
                    <div class="dropdown-user-info-history-product-item-img">
                        <img src="${item.image}" alt="Product">
                        <div class="dropdown-user-info-history-product-quantity">${item.quantity}</div>
                        <span class="product-item-name">${item.name}</span>
                        <div class="product-item-price">${item.price}</div>
                    </div>
                    <a href="#" class="Buy-again" data-product-id="${item.id}" data-product-name="${item.name}" data-product-price="${item.price}" data-product-image="${item.image}">Mua lại</a>
                `;
                itemContainer.appendChild(itemDiv);
            });
        });
    }
}
// Gọi hàm populateCheckout khi trang checkout load
function initializeCartButtons() {
    document.querySelectorAll('.cart-btn').forEach(function(button) {
        if (button.dataset.productId) return;


        var card = button.closest('.single-product-item, .single-product-content');
        if (!card) return;


        var nameElement = card.querySelector('h3');
        var priceElement = card.querySelector('.product-price, .single-product-pricing');
        var imageElement = card.querySelector('img');


        if (!imageElement) {
            var row = card.closest('.row');
            if (row) {
                imageElement = row.querySelector('.single-product-img img');
            }
        }


        if (!nameElement || !priceElement || !imageElement) return;


        button.dataset.productId = slugifyProductName(nameElement.textContent);
        button.dataset.productName = nameElement.textContent.trim();
        button.dataset.productPrice = parseVND(priceElement.textContent);
        button.dataset.productImage = imageElement.getAttribute('src');
    });
}


function initializePageState() {
    var path = window.location.pathname.toLowerCase();

    // [SỬA] Reset giỏ hàng về 0 chỉ khi trang chủ (index.html) load
    // Không reset trên các trang khác (giỏ hàng, thanhtoan) để giữ dữ liệu sản phẩm
    if (path.indexOf('index.html') !== -1 || path.endsWith('/') || path.endsWith('/html/')) {
        localStorage.removeItem('cart');
        saveCart([]);
    }

    updateCartBadge();

    if (path.indexOf('cart.html') !== -1 || path.indexOf('giohang.html') !== -1) {
        populateCart();
    }

    if (path.indexOf('checkout.html') !== -1 || path.indexOf('defaultcheckout.html') !== -1 || path.indexOf('thanhtoan.html') !== -1) {
        if (path.indexOf('thanhtoan.html') !== -1 && document.getElementById('cartItemsContainer')) {
            initializeModernCheckout();
        } else {
            populateCheckout();
            hideLegacyPaymentControls();
            initializeCheckoutValidation();
            initializeCheckoutCouponControls();
        }
    }

    if (path.indexOf('history.html') !== -1 || path.indexOf('lichsumuahang.html') !== -1) {
        loadOrderHistory();
    }

    initializeCartButtons();
}


document.addEventListener('DOMContentLoaded', initializePageState);


function slugifyProductName(value) {
    return (value || 'product')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'product';
}


function showCartFeedback(message) {
    var toast = document.querySelector('.cart-feedback-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'cart-feedback-toast';
        toast.style.position = 'fixed';
        toast.style.right = '24px';
        toast.style.bottom = '24px';
        toast.style.zIndex = '10001';
        toast.style.padding = '12px 18px';
        toast.style.borderRadius = '999px';
        toast.style.background = 'rgba(3, 62, 140, 0.95)';
        toast.style.color = '#fff';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '600';
        toast.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.18)';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
        toast.style.transition = 'opacity 220ms ease, transform 220ms ease';
        document.body.appendChild(toast);
    }


    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';


    clearTimeout(showCartFeedback.timer);
    showCartFeedback.timer = setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
    }, 1800);
}


function animateProductToCart(button) {
    var card = button.closest('.single-product-item, .single-product-content, .product-details, .product-filters-item');
    if (!card) return;


    var image = card.querySelector('img');
    if (!image) {
        var row = card.closest('.row');
        if (row) {
            image = row.querySelector('.single-product-img img');
        }
    }


    var cartIcon = document.querySelector('.shopping-cart');
    if (!image || !cartIcon) return;


    var imageRect = image.getBoundingClientRect();
    var cartRect = cartIcon.getBoundingClientRect();
    var clone = image.cloneNode(true);


    clone.className = 'cart-fly-clone';
    clone.style.position = 'fixed';
    clone.style.top = imageRect.top + 'px';
    clone.style.left = imageRect.left + 'px';
    clone.style.width = imageRect.width + 'px';
    clone.style.height = imageRect.height + 'px';
    clone.style.objectFit = 'cover';
    clone.style.borderRadius = '12px';
    clone.style.pointerEvents = 'none';
    clone.style.zIndex = '10000';
    clone.style.opacity = '0.95';
    clone.style.transform = 'translate3d(0, 0, 0) scale(1)';
    clone.style.transition = 'top 780ms cubic-bezier(0.22, 1, 0.36, 1), left 780ms cubic-bezier(0.22, 1, 0.36, 1), width 780ms cubic-bezier(0.22, 1, 0.36, 1), height 780ms cubic-bezier(0.22, 1, 0.36, 1), opacity 780ms ease, transform 780ms cubic-bezier(0.22, 1, 0.36, 1)';
    clone.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.22)';
    clone.style.top = imageRect.top + 'px';
    clone.style.left = imageRect.left + 'px';
    clone.style.width = imageRect.width + 'px';
    clone.style.height = imageRect.height + 'px';
    document.body.appendChild(clone);


    requestAnimationFrame(function() {
        clone.style.top = cartRect.top + 'px';
        clone.style.left = cartRect.left + 'px';
        clone.style.width = '36px';
        clone.style.height = '36px';
        clone.style.opacity = '0.2';
        clone.style.transform = 'translate3d(0, 0, 0) scale(0.2)';
    });


    if (cartIcon.animate) {
        cartIcon.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.22)' },
            { transform: 'scale(0.92)' },
            { transform: 'scale(1)' }
        ], {
            duration: 420,
            easing: 'ease-out'
        });
    }


    setTimeout(function() {
        clone.remove();
    }, 850);
}


document.addEventListener('click', function(event) {
    var button = event.target.closest('.cart-btn');
    if (!button || !button.dataset.productId) return;
    animateProductToCart(button);
    showCartFeedback('Đã thêm sản phẩm vào giỏ hàng');
}, true);

function getApiBaseUrl() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:4000/api'
        : '/api';
}

function setFooterSubscribeStatus(form, message, color) {
    if (!form) return;

    var status = form.parentNode.querySelector('.footer-subscribe-status');
    if (!status) {
        status = document.createElement('div');
        status.className = 'footer-subscribe-status';
        form.insertAdjacentElement('afterend', status);
    }

    status.textContent = message || '';
    status.style.color = color || '#fff';
}

function initializeFooterSocialLinks() {
    var containers = document.querySelectorAll('.social-icons ul');
    if (!containers.length) return;

    var socialItems = [
        {
            href: 'https://web.facebook.com/fined06?mibextid=wwXIfr&rdid=IM6S1j6EXaqcLVJM&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1GwLVTmF2B%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr',
            ariaLabel: 'Facebook',
            content: '<i class="fab fa-facebook-f"></i>'
        },
        {
            href: 'https://www.instagram.com/heart2_dnga?igsh=MTAwMzE2cjM1bnIydQ==',
            ariaLabel: 'Instagram',
            content: '<i class="fab fa-instagram"></i>'
        },
        {
            href: 'https://www.threads.com/@heart2_dnga?igshid=NTc4MTIwNjQ2YQ==',
            ariaLabel: 'Threads',
            content: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.743 11.123a8.547 8.547 0 0 0-.315-.142c-.185-3.414-2.05-5.368-5.182-5.388h-.042c-1.874 0-3.431.8-4.39 2.255l1.722 1.181c.716-1.087 1.84-1.319 2.669-1.319h.028c1.031.007 1.81.307 2.313.892c.367.425.612 1.014.733 1.756a13.176 13.176 0 0 0-2.96-.143c-2.977.172-4.892 1.908-4.763 4.321c.065 1.224.675 2.277 1.717 2.965c.88.582 2.015.866 3.195.802c1.557-.086 2.778-.68 3.63-1.766c.648-.825 1.057-1.894 1.238-3.241c.742.448 1.292 1.037 1.596 1.745c.517 1.205.547 3.184-1.068 4.797c-1.415 1.414-3.116 2.025-5.686 2.044c-2.851-.02-5.008-.935-6.41-2.717c-1.313-1.67-1.991-4.08-2.016-7.165c.025-3.085.703-5.496 2.016-7.165c1.402-1.782 3.558-2.696 6.41-2.717c2.871.02 5.065.94 6.521 2.73c.714.879 1.252 1.983 1.607 3.27l2.018-.538c-.43-1.585-1.107-2.95-2.027-4.083C18.43 1.2 15.7.024 12.185 0h-.014C8.66.024 5.963 1.205 4.15 3.51c-1.614 2.05-2.446 4.905-2.474 8.482v.016c.028 3.578.86 6.431 2.473 8.482c1.813 2.305 4.512 3.486 8.022 3.51h.014c3.12-.022 5.319-.839 7.13-2.649c2.371-2.368 2.3-5.336 1.518-7.158c-.56-1.307-1.629-2.368-3.09-3.07zm-5.387 5.065c-1.305.074-2.66-.512-2.728-1.766c-.05-.93.662-1.969 2.808-2.092c.246-.015.487-.021.724-.021c.78 0 1.508.075 2.171.22c-.247 3.088-1.697 3.59-2.975 3.66z"/></svg>'
        }
    ];

    containers.forEach(function(list) {
        list.innerHTML = socialItems.map(function(item) {
            return '<li><a href="' + item.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + item.ariaLabel + '">' + item.content + '</a></li>';
        }).join('');
    });
}

function initializeFooterSubscribeForms() {
    var forms = document.querySelectorAll('.footer-box.subscribe form');
    if (!forms.length) return;

    forms.forEach(function(form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            var emailInput = form.querySelector('input[type="email"]');
            var email = emailInput ? emailInput.value.trim() : '';

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setFooterSubscribeStatus(form, 'Vui lòng nhập email hợp lệ.', '#ffb3b3');
                return;
            }

            setFooterSubscribeStatus(form, 'Đang gửi đăng ký...', '#fbb734');

            try {
                var response = await fetch(getApiBaseUrl() + '/newsletter/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: email,
                        sourcePage: window.location.pathname.split('/').pop() || 'index.html'
                    })
                });

                var payload = await response.json().catch(function() {
                    return {};
                });

                if (!response.ok) {
                    throw new Error(payload.message || 'Không thể gửi đăng ký lúc này.');
                }

                setFooterSubscribeStatus(
                    form,
                    payload.mailSent
                        ? 'Đăng ký thành công. Shop và khách hàng đã nhận email xác nhận.'
                        : 'Đăng ký thành công. Email đã được lưu, cần cấu hình SMTP để gửi thư thật.',
                    '#9ee493'
                );
                form.reset();
            } catch (error) {
                setFooterSubscribeStatus(form, error.message || 'Có lỗi xảy ra, vui lòng thử lại.', '#ffb3b3');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeFooterSocialLinks();
    initializeFooterSubscribeForms();
});

document.addEventListener('click', function(event) {
    var thumb = event.target.closest('.modern-thumb');
    if (thumb) {
        var targetId = thumb.getAttribute('data-target-image');
        var imageUrl = thumb.getAttribute('data-image');
        var heroImage = targetId ? document.getElementById(targetId) : null;
        var rail = thumb.parentNode;

        if (heroImage && imageUrl) {
            heroImage.src = imageUrl;
        }

        if (rail) {
            rail.querySelectorAll('.modern-thumb').forEach(function(item) {
                item.classList.remove('is-active');
            });
        }

        thumb.classList.add('is-active');
        return;
    }

    var qtyButton = event.target.closest('.modern-qty-btn');
    if (!qtyButton) return;

    var inputId = qtyButton.getAttribute('data-target-input');
    var input = inputId ? document.getElementById(inputId) : null;
    if (!input) return;

    var currentValue = Number(input.value || 1);
    if (qtyButton.getAttribute('data-qty') === 'increase') {
        input.value = currentValue + 1;
    } else {
        input.value = Math.max(1, currentValue - 1);
    }
});


document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        var price = parseInt(this.getAttribute('data-price'));
        var size = this.getAttribute('data-size');

        var displayPrice = document.getElementById('display-price');
        var displaySize = document.getElementById('display-size');

        if (displayPrice) displayPrice.textContent = price.toLocaleString('vi-VN') + '₫';
        if (displaySize) displaySize.textContent = size;

        var cartBtn = document.querySelector('.modern-add-cart-btn');
        if (cartBtn) cartBtn.setAttribute('data-product-price', price);

        // Lưu size đang chọn
        localStorage.setItem('selectedSize', size);
    });
});
//=====Tính năng giảm giá cho sản phẩm=====/
    // ========= CHỈ GIỮ MÃ GIẢM GIÁ DONKERY20 - GIẢM 20% TOÀN BỘ ĐƠN HÀNG =========
(function() {
    // Chờ trang load xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDiscount);
    } else {
        initDiscount();
    }
    
    function initDiscount() {
        // Tìm nút áp dụng và ô nhập mã
        let applyBtn = document.getElementById('applyCouponBtn');
        let couponInput = document.getElementById('couponCodeInput');
        let couponMsg = document.getElementById('couponMsg');
        let subtotalSpan = document.getElementById('subtotalAmount');
        let totalSpan = document.getElementById('totalAmount');
        let shipFeeSpan = document.getElementById('shipFeeDisplay');
        
        if (!applyBtn) {
            console.log('Không tìm thấy nút áp dụng, thử tìm lại sau 0.5s...');
            setTimeout(initDiscount, 500);
            return;
        }
        
        console.log('Đã tìm thấy nút áp dụng, đang cài đặt...');
        
        // Xóa event cũ và tạo nút mới
        const newBtn = applyBtn.cloneNode(true);
        applyBtn.parentNode.replaceChild(newBtn, applyBtn);
        applyBtn = newBtn;
        
        // Gắn sự kiện mới
        applyBtn.onclick = function(e) {
            e.preventDefault();
            
            const code = couponInput ? couponInput.value.trim().toUpperCase() : '';
            
            // Chỉ chấp nhận mã DONKERY20
            if (code !== 'DONKERY20') {
                if (couponMsg) {
                    couponMsg.innerHTML = '<span style="color:#d9534f;">❌ Mã không hợp lệ! Chỉ chấp nhận mã DONKERY20</span>';
                }
                return;
            }
            
            // Lấy giỏ hàng từ localStorage
            let cart = [];
            const cartStorage = localStorage.getItem('cart');
            if (cartStorage) {
                try {
                    cart = JSON.parse(cartStorage);
                } catch(e) {
                    cart = [];
                }
            }
            
            if (cart.length === 0) {
                if (couponMsg) {
                    couponMsg.innerHTML = '<span style="color:#d9534f;">❌ Giỏ hàng trống!</span>';
                }
                return;
            }
            
            // Tính tổng tiền giỏ hàng
            let subtotal = 0;
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i];
                let price = 0;
                if (typeof item.price === 'string') {
                    price = parseInt(item.price.replace(/\./g, '').replace(/₫/g, '')) || 0;
                } else {
                    price = Number(item.price) || 0;
                }
                subtotal += price * (item.quantity || 1);
            }
            
            // Giảm 20%
            const discount = subtotal * 0.2;
            const shipping = 15000;
            const total = subtotal + shipping - discount;
            
            // Cập nhật hiển thị
            if (subtotalSpan) subtotalSpan.innerText = subtotal.toLocaleString('vi-VN') + '₫';
            if (shipFeeSpan) shipFeeSpan.innerText = shipping.toLocaleString('vi-VN') + '₫';
            if (totalSpan) totalSpan.innerText = total.toLocaleString('vi-VN') + '₫';
            
            if (couponMsg) {
                couponMsg.innerHTML = `<span style="color:#2c7a4a;">✅ Áp dụng thành công. Giảm -${discount.toLocaleString('vi-VN')}₫</span>`;
            }
            
            // Lưu discount để dùng khi đặt hàng (nếu cần)
            window.discountApplied = discount;
        };
    }
})();
//Kết thúc
(function() {
    var allCb = document.getElementById('price-all');
    var filters = document.querySelectorAll('.price-filter');

    if (!allCb || !filters.length) return;

    function applyFilter() {
        var checked = document.querySelector('.price-filter:checked');
        var products = document.querySelectorAll('.product-lists [data-price]');

        if (!checked) {
            $('.product-lists').isotope({ filter: '*' });
            return;
        }

        var minPrice = parseInt(checked.getAttribute('data-min'));
        var maxPrice = parseInt(checked.getAttribute('data-max'));

        products.forEach(function(p) {
            var price = parseInt(p.getAttribute('data-price'));
            if (price >= minPrice && price <= maxPrice) {
                p.classList.add('price-match');
                p.classList.remove('price-nomatch');
            } else {
                p.classList.add('price-nomatch');
                p.classList.remove('price-match');
            }
        });

        $('.product-lists').isotope({ filter: '.price-match' });
    }

    allCb.addEventListener('change', function() {
        $('.product-lists').isotope({ filter: '*' });
    });

    filters.forEach(function(f) {
        f.addEventListener('change', function() {
            applyFilter();
        });
    });
})();
    document.querySelectorAll('.sublink-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            this.classList.toggle('open');
            var dropdown = this.nextElementSibling;
            dropdown.classList.toggle('open');
        });
    });