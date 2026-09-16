const search_input = document.getElementById("search-input");

const searchSuggest = document.getElementById("search-suggest");

const searchBox = document.getElementById("search-box");

const searchUrl = searchBox.dataset.searchUrl;

search_input.addEventListener("input", function () {
  const keyword = this.value.trim();

  if (keyword == "") {
    searchSuggest.innerHTML = "";

    searchSuggest.style.display = "none";

    return;
  }

  fetch(
    // search_product + name_product + keyword
    searchUrl + "?name_product=" + encodeURIComponent(keyword),
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      searchSuggest.innerHTML = "";

      if (data.products.length == 0) {
        searchSuggest.innerHTML = `
                <div style="padding:10px;">
                    Không tìm thấy sản phẩm
                </div>
            `;

        searchSuggest.style.display = "block";

        return;
      }

      data.products.forEach((product) => {
        const item = document.createElement("div");

        item.style.padding = "10px";

        item.style.borderBottom = "1px solid #eee";

        item.style.cursor = "pointer";

        item.innerHTML = `
                <a href="/Product/account/product_details/${product.id}/"
        style="text-decoration: none; color: inherit">
                    <div>
                    <strong>${product.name}</strong>
                </div>

                <div style="color:red;">
                    ${product.price}
                </div>
                </a>
            `;

        searchSuggest.appendChild(item);
      });

      searchSuggest.style.display = "block";
    })

    .catch((error) => {
      console.error("Lỗi:", error);
    });
});
