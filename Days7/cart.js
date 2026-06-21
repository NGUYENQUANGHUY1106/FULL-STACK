const newProduct = localStorage.getItem("newProduct");
const cartItems = JSON.parse(newProduct);
console.log(cartItems);
let total = 1;
let sum = 0;
const tbody = document.getElementById("table-body");
const html = (tbody.innerHTML = Object.entries(cartItems)
  .map(function ([key, values]) {
    let price = values.price.replace("$", "");
    console.log(key);
    console.log(values);

    total = price * values.qty;
    sum = sum + total;
    return `
    <tr>
     <td><img src="${values.img}" alt="" width="100"></td>
     <td>${values.info}</td>
     <td class = "price">${values.price}</td>
     <td>
<div class="quantity">
    <button class="minus" onclick = "changeQty('${key}',this , -1)">-</button>
    <input type="number" value="${values.qty}" class = "inputQty" >
    <button class="plus" onclick = "changeQty('${key}',this,+1)">+</button>
</div>
     </td>
     <td class = "total">${total}$</td>
     <td>
     <button  class = "deleteItem" onclick = "deleteItem('${key}',this)">X </button>
     </td>
    </tr>
   `;
  })
  .join(""));
tbody.innerHTML =
  html +
  `
  <tr>
   <td colspan="3">Total</td>
    <td colspan = "3" class ="totalSum"></td>
  </tr>
`;
updateTotalSum(); 
function deleteItem(key, button) {
  delete cartItems[key];
  updateTotalSum();
  const tr = button.closest("tr");
  tr.remove();
  localStorage.setItem("newProduct", JSON.stringify(cartItems));
}
function changeQty(key, button, change) {
  if (cartItems[key].qty + change < 1) {
    alert("không thể xóa sản phẩm");
  } else {
    cartItems[key].qty = cartItems[key].qty + change;
    const input = button.closest(".quantity").querySelector("input");
    input.value = cartItems[key].qty;
    const tr = button.closest("tr");
    const total = tr.querySelector(".total");
    console.log(total);

const price = Number(cartItems[key].price.replace("$", ""));
total.innerHTML = price * cartItems[key].qty + "$";

    updateTotalSum();

    localStorage.setItem("newProduct", JSON.stringify(cartItems));
  }
}
function updateTotalSum() {
    let sum = 0;

    Object.values(cartItems).forEach(item => {
        sum += Number(item.price.replace("$", "")) * item.qty;
    });

    document.querySelector(".totalSum").innerHTML = sum + "$";
}