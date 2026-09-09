document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".add-to-cart");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Lấy ID sản phẩm
            const product_id = this.dataset.productId;

            console.log("PRODUCT ID:", product_id);

            fetch("/Product/account/add_to_cart/", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },

                body: JSON.stringify({
                    product_id: product_id,
                }),
            })

            .then(response => {

                console.log("STATUS:", response.status);

                return response.json();
            })

            .then(data => {

                console.log("DATA:", data);

                if (data.success) {

                    const CartCount =
                        document.getElementById("product_count");

                    if (CartCount) {
                        CartCount.textContent = data.cart_count;
                    }

                } else {

                    alert(data.message);
                }
            })

            .catch(error => {
                console.error("LỖI:", error);
            });
        });
    });


    function getCookie(name) {

        let cookieValue = null;

        if (document.cookie && document.cookie !== "") {

            const cookies = document.cookie.split(";");

            for (let cookie of cookies) {

                cookie = cookie.trim();

                if (
                    cookie.substring(
                        0,
                        name.length + 1
                    ) === name + "="
                ) {

                    cookieValue =
                        decodeURIComponent(
                            cookie.substring(
                                name.length + 1
                            )
                        );

                    break;
                }
            }
        }

        return cookieValue;
    }
});