(function () {

    'use strict';

    var box = document.querySelector('.price-range');

    var rMin = document.getElementById('rangeMin');

    var rMax = document.getElementById('rangeMax');

    var fill = document.getElementById('priceFill');

    var tagMin = document.getElementById('priceMin');

    var tagMax = document.getElementById('priceMax');


    if (!box || !rMin || !rMax || !fill || !tagMin || !tagMax) {

        return;

    }


    var MIN = 0;

    var MAX = 2000;

    var GAP = 10;


    var track = box.querySelector('.price-range__track');


    if (track) {

        track.style.cssText =
            'position:absolute;' +
            'top:50%;' +
            'left:0;' +
            'right:0;' +
            'transform:translateY(-50%);' +
            'height:6px;' +
            'background:#eee;' +
            'border-radius:10px;' +
            'z-index:1;' +
            'overflow:hidden;';

    }


    var urlSearch_price = box.dataset.filterUrl;


    function render() {

        var min = parseInt(rMin.value, 10);

        var max = parseInt(rMax.value, 10);


        if (min > max - GAP) {

            if (document.activeElement === rMin) {

                min = max - GAP;

                rMin.value = min;

            } else {

                max = min + GAP;

                rMax.value = max;

            }

        }


        var pct = function (v) {

            return ((v - MIN) / (MAX - MIN)) * 100;

        };


        fill.style.cssText =
            'position:absolute;' +
            'top:0;' +
            'height:100%;' +
            'background:#f39c12;' +
            'border-radius:10px;' +
            'left:' + pct(min) + '%;' +
            'width:' + (pct(max) - pct(min)) + '%;';


        tagMin.textContent = '$ ' + min;

        tagMax.textContent = '$ ' + max;


        tagMin.style.left = pct(min) + '%';

        tagMax.style.left = pct(max) + '%';


        console.log('[PRICE RANGE]', min, max);

    }


    function search_Price(min, max) {

    //     console.log('Gửi Python:', min, max);

    // console.log('URL:', urlSearch_price);


        fetch(
            urlSearch_price +
            '?min_price=' + min +
            '&max_price=' + max
        )

        .then(function (response) {

            return response.json();

        })

        .then(function (data) {

            // console.log('Python trả về:', data);


            var productList =
                document.getElementById('list-products');


            if (!productList) {

                return;

            }


            productList.innerHTML = '';


            if (data.products.length === 0) {

                productList.innerHTML = `
                    <p>Không có sản phẩm nào</p>
                `;

                return;

            }


            data.products.forEach(function (product) {

                var item =
                    document.createElement('div');


                item.style.border =
                    '1px solid #e5e5e5';

                item.style.padding =
                    '10px';

                item.style.textAlign =
                    'center';

                item.style.boxSizing =
                    'border-box';


                item.innerHTML = `

                    <a
                        href="/Product/account/product_details/${product.id}/"
                        style="
                            text-decoration:none;
                            color:inherit;
                        "
                    >

                        <img
                            src="/media/${product.image}"
                            alt="${product.name}"
                            style="
                                width:100%;
                                height:230px;
                                object-fit:cover;
                            "
                        >

                        <h3
                            style="
                                color:orange;
                                font-size:22px;
                                font-weight:500;
                                margin:10px 0 5px;
                            "
                        >
                            ${product.price} $
                        </h3>

                        <p
                            style="
                                color:#777;
                                font-size:17px;
                                margin:0 0 15px;
                            "
                        >
                            ${product.name}
                        </p>

                    </a>

                    <button
                        type="button"
                        class="add-to-cart"
                        data-product-id="${product.id}"
                        style="
                            width:100%;
                            padding:10px;
                            background-color:#888;
                            color:white;
                            border:none;
                            border-radius:8px;
                            cursor:pointer;
                        "
                    >
                        Add to Cart
                    </button>

                `;


                productList.appendChild(item);

            });

        })

        .catch(function (error) {

            console.error('Lỗi:', error);

        });

    }


    rMin.addEventListener('input', function () {

        render();

    });


    rMax.addEventListener('input', function () {

        render();

    });


    rMin.addEventListener('change', function () {

        render();

        var min =
            parseInt(rMin.value, 10);

        var max =
            parseInt(rMax.value, 10);

        search_Price(min, max);

    });


    rMax.addEventListener('change', function () {

        render();

        var min =
            parseInt(rMin.value, 10);

        var max =
            parseInt(rMax.value, 10);

        search_Price(min, max);

    });


    render();

})();