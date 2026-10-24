import { useState, useEffect, useContext } from "react";
import API from "../../Config/Api";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";
function Home() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  const { setTotalCart, setTotalWishList } = useContext(UserContext);

  const dispatch = useDispatch();
  // addtocart
  useEffect(() => {
    API.get("user/my-product", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    .then((response) =>
    {
        setData(response.data.data);
        
    })
    .catch((error)=>
    {
        console.log(error);
        
    })
  }, [token]);

//   function handleAddToCart(product) {
//   const cart = JSON.parse(
//     localStorage.getItem("cart") || "{}"
//   );

//   if (cart[product.id]) {
//     cart[product.id] += 1;
//   } else {
//     cart[product.id] = 1;
//   }

//   localStorage.setItem("cart", JSON.stringify(cart));

//   console.log(cart);
//     let total = 0;

//   Object.keys(cart).forEach((key) => {
//     total += Number(cart[key]);
//   });

//   setTotalCart(total);
// }

  function handleAddToCart(product) {
  dispatch(addToCart(product));
}
  function handleWishlist(product)
  {
      console.log(product);
      const wishList = JSON.parse(localStorage.getItem('wishList') || "{}")

      if(wishList[product.id])
      {
        wishList[product.id] += 1 ;
      }
      else
      {
        wishList[product.id] = 1;
      }
      localStorage.setItem("wishList", JSON.stringify(wishList));
      setTotalWishList(Object.keys(wishList).length);
      console.log(wishList);
      
  }
  return (
    <div className="featured-items">
      <div className="featured-title">
        <span>FEATURES ITEMS</span>
      </div>

     <div className="featured-grid">
  {Object.keys(data).map((key, index) => {
    const product = data[key];
    const listImage = JSON.parse(product.image || "[]");

    return (
      <div className="featured-card" key={product.id}>
        <div className="featured-image">
          <img
            src={
              `http://localhost/laravel8/laravel8/public/upload/product/` +
              `${product.id_user}/` +
              `${listImage[0]}`
            }
            alt={product.name}
          />

          <span
            className={
              Number(product.sale) > 0
                ? "featured-label sale"
                : "featured-label new"
            }
          >
            {Number(product.sale) > 0 ? "SALE" : "NEW"}
          </span>
        </div>

        <div className="featured-info">
          <div className="featured-price">
            {Number(product.sale) > 0 && (
              <del>{product.price}</del>
            )}

            <span>
              {Number(product.sale) > 0
                ? (
                    Number(product.price) *
                    (1 - Number(product.sale) / 100)
                  ).toLocaleString()
                : product.price}
            </span>
          </div>

          <p className="featured-name">{product.name}</p>

          <button onClick={() => handleAddToCart(product)} type="button" className="featured-cart">
            🛒 Add to cart
          </button>
          {/* khi click thì nó có dispatch gửi action đến redux */}
        </div>

        <div className="featured-actions">
          <Link style={{textDecoration : 'none' , color : 'gray'}} to={'/product_details/' + product.id} type="button">
            ✚ Product detail
          </Link>

          <button onClick={() => handleWishlist(product)} type="button">
            ✚ Add to wishlist
          </button>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}
export default Home;
