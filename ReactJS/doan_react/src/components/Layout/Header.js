import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
                            <div className="logo-icon">
                                QH
                            </div>

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
                            <span>Account</span>
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
                            <span className="icon">🛒</span>
                            <span>Cart</span>
                        </div>

                        <div className="user-item login">
                            <span className="icon">🔒</span>
                            <span>Login</span>
                        </div>

                    </div>

                </div>
            </div>


            <div className="header-bottom">

                <div className="container header-bottom-content">

                    <div className="menu">

                        <div className="menu-item active">
                            Home
                        </div>

                        <div className="menu-item">
                            Shop
                        </div>

                        <div className="menu-item">
                            Products
                        </div>

                        <div className="menu-item">
                            <Link style={{textDecoration : "none", color : "black"}} to="/bloglist">Blog</Link>
                        </div>

                        <div className="menu-item">
                            Contact
                        </div>

                    </div>


                    <div className="search">

                        <input
                            type="text"
                            placeholder="Search products..."
                        />

                        <button>
                            🔍
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Header;