const status_product = document.getElementById('status_product');
const saleContainer = document.getElementById('sale-container');
const saleInput = document.getElementById('sale');

function checkStatus() {
    if (!status_product || !saleContainer || !saleInput) {
        return;
    }

    console.log("Status hiện tại:", status_product.value);

    if (status_product.value == "1") {
        saleContainer.style.display = "block";
    } else {
        saleContainer.style.display = "none";
        saleInput.value = "0";
    }
}

if (status_product) {
    status_product.addEventListener("change", checkStatus);
    checkStatus();
}