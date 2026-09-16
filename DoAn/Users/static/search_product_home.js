const searchForm = document.getElementById("search-form");
const productList = document.getElementById("list-products");
const productDetailUrl = "{% url 'product_details' 0 %}";

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // lấy dữ liệu  trong form
  const formData = new FormData(searchForm);
  // chuyển dữ liệu thành parmas name = nike ,category = 1 => name=Nike&category=1
  const params = new URLSearchParams(formData);

  fetch(searchForm.action + "?" + params.toString(), {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      productList.innerHTML = "";

      if (data.products.length === 0) {
        productList.innerHTML = `
             <p>Không có sản phẩm nào </p>
            `;
        return;
      }
      data.products.forEach((item) => {
        productList.innerHTML += `
                <div
                    class="list-product"
                    style="
                        border: 1px solid #e5e5e5;
                        padding: 10px;
                        text-align: center;
                        box-sizing: border-box;
                    "
                >

                    <a
                        href="${productDetailUrl.replace('0', item.id)}"
                        style="
                            text-decoration: none;
                            color: inherit;
                        "
                    >

                        ${
                          item.image
                            ? `
                            <img
                                src="/media/${item.image}"
                                alt="${item.name}"
                                style="
                                    width: 100%;
                                    height: 230px;
                                    object-fit: cover;
                                "
                            >
                            `
                            : ""
                        }

                        <h3
                            style="
                                color: orange;
                                font-size: 22px;
                                font-weight: 500;
                                margin: 10px 0 5px;
                            "
                        >
                            ${item.price} $
                        </h3>

                        <p
                            style="
                                color: #777;
                                font-size: 17px;
                                margin: 0 0 15px;
                            "
                        >
                            ${item.name}
                        </p>

                    </a>

                    <button
                        type="button"
                        class="add-to-cart"
                        data-product-id="${item.id}"
                        style="
                            width: 100%;
                            padding: 10px;
                            background-color: #888;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                        "
                    >
                        Add to Cart
                    </button>

                </div>
            `;
      });
    })
    .catch(error =>
    {
        console.error('Lỗi' , error)
    }
    )
});
