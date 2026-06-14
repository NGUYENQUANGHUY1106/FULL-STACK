let tong = 0;
// tong = tong + qty;
let remove_tong = 0;
let color = document.getElementById("color");
let size = document.getElementById("size");
let qty = document.getElementById("quantity");
let quantity_cart = document.getElementById("quantity_cart");
function addToCart() 
{ 

  let err = false;
  if(color.value == "")
  {
    alert("Vui Lòng chọn màu sắc");
    err = true;
  }
  if(size.value == "")
  {
    alert("Vui Lòng chọn kích thước");
    err = true;
  }
  if(!err)
  {
    alert("Thêm vào giỏ hàng thành công");
    tong = parseInt(tong) + parseInt(qty.value);
    quantity_cart.textContent = tong;
    
  }
  
  // remove_tong = tong;

}
    
function removeToCart()
{
  let err = false;
     if(tong == 0)
     {
      alert('Không có sản phẩm để xóa');
      err =  true;
     }
     if(tong < parseInt(qty.value) )
     {
      alert('Số lượng sản phẩm k đủ để xóa');
      err = true;
     }
     if(!err)
     {
      tong = tong - parseInt(qty.value);
      quantity_cart.textContent = tong;
     }
 
  
}
