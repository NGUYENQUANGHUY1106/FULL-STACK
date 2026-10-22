import { useState, useEffect } from "react";
import API from "../../Config/Api";

function Cart() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(() => {
  return JSON.parse(localStorage.getItem("cart") || "{}");
});
  console.log(cart);


 function updateQuantity(value, id) {
  const newCart = { ...cart };

  if (newCart[id]) {
    newCart[id] = newCart[id] + value;
  } else {
    newCart[id] = 1;
  }

  if (newCart[id] < 1) {
    newCart[id] = 1;
  }

  setCart(newCart);
  localStorage.setItem("cart", JSON.stringify(newCart));
}

function totalCart() {
  let total = 0;

  Object.keys(data).forEach((key) => {
    const id = data[key].id;
    const price = Number(data[key].price);
    const quantity = cart[id] || 0;

    total = total + price * quantity;
  });

  return total;
}

function removeCart(id)
{
   const newCart = {...cart}

   if(cart[id])
   {
     delete newCart[id]
   }
   setCart(newCart)
   localStorage.setItem("cart", JSON.stringify(newCart));
  //  xóa cart có id trong giỏ hàng 

   const newData = { ...data };
  //  data là dữ liệu khi API trả về
  // còn cart là dữ liệu khi người dùng nhấn thêm dỏ hàng và lưu ở local
     Object.keys(newData).forEach((key) => {
    if (Number(newData[key].id) === Number(id)) {
      delete newData[key];
    }

    setData(newData)
  });
}
  // console.log(value);
  
  // console.log(totalPrice);
  

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    API.post("product/cart", cart)
      .then((response) => {
        setData(response.data.data);
        // Sau khi kiểm tra cấu trúc response
        // mới setData vào danh sách sản phẩm
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <div className="cart-container">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
          
          Object.keys(data).map((key, index) => {
                const listImage = JSON.parse(data[key].image || "[]");
                console.log(listImage);
                
                console.log(data[key].id_user);
                
            return (
              <tr>
                <td className="cart-product">
                   <img
            src={
              `http://localhost/laravel8/laravel8/public/upload/product/` +
              `${data[key].id_user}/` +
              `${listImage[0]}`
            }
            alt={data.name}
          />
                  <div className="cart-product-info">
                    <p>{data[key].name}</p>
                  </div>
                </td>

                <td  className="cart-price">$ {data[key].price}</td>

                <td>
                  <div className="cart-quantity">
                    <button onClick={() =>updateQuantity(1 , data[key].id)}  type="button">+</button>
                    <input type="text" value={cart[data[key].id] || 0}  />
                    <button onClick={() =>updateQuantity(-1 ,data[key].id)} type="button">-</button>
                  </div>
                </td>

                <td className="cart-total">{(cart[data[key].id] || 0) * data[key].price}</td>

                <td>
                  <button onClick={() => removeCart(data[key].id)} className="cart-remove" type="button">
                    ×
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
          <div style={{display : 'flex', gap : ' 20px', justifyContent :'space-evenly', fontSize: '30px'}}>
            <p>Tổng Tiền :</p>
            <p>$ {totalCart()}</p>
          </div>
    </div>
  );
}

export default Cart;
