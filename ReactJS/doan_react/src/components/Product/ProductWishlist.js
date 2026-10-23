import { useContext, useEffect, useState } from "react";
import API from '../../Config/Api'
import { Link } from 'react-router-dom';
import { UserContext } from "../../UserContext";
function ProductWishlist() {
  const [data,setData] = useState({})
  const { setTotalCart, setTotalWishList } = useContext(UserContext);
    const [wishList, setWishList] = useState(() => {
  return JSON.parse(localStorage.getItem("wishList") || "{}");
});
  useEffect(() =>
  {
     API.get('/product/wishlist')
     .then((response) =>
    {
      const product = response.data.data ;
      
      const dataWishList = product.filter((item) =>
      {
        // console.log(item.id);
        
         return wishList[item.id] !== undefined
        //  tìm id của product có trong wishlist 
      })

      setData(dataWishList)
      
      
      
    })
    .catch((error) =>
    {
      console.log( error);
      
    })

  },[wishList])
    function handleAddToCart(product) {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "{}"
  );

  if (cart[product.id]) {
    cart[product.id] += 1;
  } else {
    cart[product.id] = 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  console.log(cart);
  let total = 0;

  Object.keys(cart).forEach((key) => {
    total += Number(cart[key]);
  });

  setTotalCart(total);
}
function handleDeleteWishlist(id)
{
  const newWishList = {...wishList}
  
  console.log(id);
  if(wishList[id])
  {
    delete newWishList[id]
  }
  setWishList(newWishList)
  localStorage.setItem("wishList",JSON.stringify(newWishList))

  setTotalWishList(Object.keys(newWishList).length);


  const newData = {...data};

  Object.keys(newData).forEach((key) =>
  {
    if(Number(newData[key].id) === Number(id))
    {
      delete newData[key]
    }

    setData(newData)
  })
  
  
}
  console.log(data);
  
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
        </div>

        <div className="featured-actions">
          <Link style={{textDecoration : 'none' , color : 'gray'}} to={'/product_details/' + product.id} type="button">
            ✚ Product detail
          </Link>

          <button onClick={() => handleDeleteWishlist(product.id)} type="button">
            ✚ Remove to wishlist
          </button>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}
export default ProductWishlist;
