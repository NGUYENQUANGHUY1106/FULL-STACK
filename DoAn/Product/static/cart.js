document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".quantity-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const btn = this;
      const cartID = btn.dataset.cartId;
      const action = btn.classList.contains("plus-btn") ? "increase" : "decrease";
      
      // tìm dòng sản phẩm được click
      const cartItemElement = btn.closest(".cart-item");

      fetch("/Product/account/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          cart_id: cartID,
          action: action,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            alert(data.message || "Có lỗi xảy ra");
            return;
          }
          // cập nhật số lượng ở header 
          const productCount = document.getElementById("product_count");
          if (productCount && data.cart_count !== undefined) {
            productCount.textContent = data.cart_count;
          }

          const cart_Total = document.getElementById("cart-total");
          console.log(cart_Total);
          
          if (cart_Total && data.total !== undefined) {
            cart_Total.textContent = Number(data.total).toFixed(2);
          }

          if (cartItemElement) {
            // nếu quantity nhỏ hơn 0
            if (data.deleted) {
              cartItemElement.remove();

              const remainingItems = document.querySelectorAll(".cart-item");
              if (remainingItems.length === 0) {
                const cartContainer = document.querySelector(".cart-container");
                if (cartContainer) {
                  cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
                }
              }
              return;
            }
            // cập nhật số lượng 
            const quantity = cartItemElement.querySelector(".quantity");
            if (quantity) {
              quantity.textContent = data.quantity;
            }
            // cập nhật số lượng tiền của riêng mỗi sản phẩm
            const itemTotal = cartItemElement.querySelector(".item-total");
            if (itemTotal) {
              itemTotal.textContent = Number(data.item_total).toFixed(2);
            }
          }
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        });
    });
  });

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});