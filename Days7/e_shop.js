let objcon = {};
let dataQty = localStorage.getItem("newProduct");
let valueCartQty = document.getElementById("cart-qty");

let sum = 0;
if (dataQty) {
  let qty = JSON.parse(dataQty);
  console.log(qty);
  Object.values(qty).map(function (item) {
    console.log(item.qty);
    sum += item.qty;
    valueCartQty.innerText = sum;
  });
}

function addToCart(btn) {
  let product = btn.closest(".product");
  console.log(product);

  let price = product.querySelector(".price");
  let image = product.querySelector("img");
  let info = product.querySelector(".info");
  let id = product.dataset.id;

  objcon = {
    img: image.src,
    price: price.innerText,
    info: info.innerText,
    qty: 1,
  };

  let objCha = JSON.parse(localStorage.getItem("newProduct")) || {};
  if (objCha[id]) {
    objCha[id].qty++;
  } else {
    objCha[id] = objcon;
  }
  console.log(objCha);

  
  let cartqty = document.getElementById("cart-qty");
  console.log(cartqty);
  
  let sumQty = 0;
  
  Object.values(objCha).map(function (item) {
      sumQty += item.qty;
    });
    localStorage.setItem("newProduct", JSON.stringify(objCha));
  cartqty.innerText = sumQty;
}
function RemoveItem(btn)
{
  let item = btn.closest(".product");
  let id = item.dataset.id;
  
  console.log(id);
  let newProduct = localStorage.getItem("newProduct");
  let cartItems = JSON.parse(newProduct);
   let sumCart = 0;
  if(cartItems)
  {
    console.log(cartItems[id].qty);
    if(cartItems[id].qty > 0)
    {
      cartItems[id].qty--;
      Object.values(cartItems).map(function(item)
    {
        console.log(item.qty);
        sumCart += item.qty;
      })
      valueCartQty.innerText = sumCart;
      localStorage.setItem("newProduct", JSON.stringify(cartItems));
    }
    else
    {
      alert("Không thể xóa sản phẩm cuối cùng")
    }
    
  }
  
  
}
