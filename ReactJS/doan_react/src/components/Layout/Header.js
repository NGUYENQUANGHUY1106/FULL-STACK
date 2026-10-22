import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || null);
  const totalCart = useContext(UserContext)
  console.log(totalCart);
  
  const navigate = useNavigate();
  function Logout()
{
    localStorage.removeItem('user')
    localStorage.removeItem("token");
    navigate('/login')

}
function checkAccount() {
  if (!user || !user.id) {
    navigate("/login");
  } else {
    navigate("/account");
  }
}

  return (
    <div className="header">
      <div className="header-top">
        <div className="container header-top-content">
          <div className="contact">
            <span>☎ +84 905 123 456</span>
            <span>✉ support@shop.com</span>
          </div>

          <div className="social">
            <span>f</span>
            <span>𝕏</span>
            <span>in</span>
            <span>◎</span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-main-content">
          <div className="header-left">
            <div className="logo">
              <div className="logo-icon">QH</div>

              <div className="logo-name">
                <span>QuangHuy11</span>
                <b>SHOP</b>
              </div>
            </div>

            <div className="select-group">
              <select>
                <option>Vietnam</option>
                <option>USA</option>
                <option>Japan</option>
              </select>

              <select>
                <option>VND</option>
                <option>USD</option>
                <option>JPY</option>
              </select>
            </div>
          </div>

          <div className="user-menu">
            <div className="user-item">
              <span className="icon">♙</span>
              <span onClick={checkAccount}>Account</span>
            </div>

            <div className="user-item">
              <span className="icon">♥</span>
              <span>Wishlist</span>
            </div>

            <div className="user-item">
              <span className="icon">✓</span>
              <span>Checkout</span>
            </div>

            <div className="user-item">
             <div style={{display :' flex', alignItems :'center'}}>
               <span className="icon">🛒</span>
             </div>
              <Link style={{textDecoration :'none', color : 'GrayText'}} to='/cart'>Cart</Link>
               <p style={{fontSize : '15px', background :'red', padding : '2px 4px',   color: 'white', borderRadius : '100%', marginTop : '-25px'}}>{totalCart}</p>
            </div>

            {user && user.id ? (
              <div className="user-item login">
                <span>Xin chào, {user.name}</span>
                <button
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={Logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="user-item login">
                <span className="icon">🔒</span>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container header-bottom-content">
          <div className="menu">
            <Link  style={{textDecoration : 'none'}} to='/' className="menu-item active">Home</Link>

            <div className="menu-item">Shop</div>

            <Link style={{textDecoration : 'none'}} to='/account/my_product' className="menu-item">Products</Link>

            <div className="menu-item">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/bloglist"
              >
                Blog
              </Link>
            </div>

            <div className="menu-item">Contact</div>
          </div>

          <div className="search">
            <input type="text" placeholder="Search products..." />

            <button>🔍</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
