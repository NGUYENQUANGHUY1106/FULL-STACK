import React from "react";
import { Link } from "react-router-dom";

function MenuAcc() {
    return (
        <div className="account-menu">

            <div className="account-menu-title">
                <span>ACCOUNT</span>
            </div>

            <div className="account-menu-list">

                <Link to="/account" className="account-menu-item">
                    <span>ACCOUNT</span>
                    <span className="account-menu-plus">+</span>
                </Link>

                <Link to="/my-product" className="account-menu-item">
                    <span>MY PRODUCT</span>
                    <span className="account-menu-plus">+</span>
                </Link>

            </div>

        </div>
    );
}

export default MenuAcc;