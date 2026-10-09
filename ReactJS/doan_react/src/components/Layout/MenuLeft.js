import React from "react";

function MenuLeft() {
    return (
        <div className="menu-left">

            <div className="title-box">
                <div className="title-line"></div>
                <h3>CATEGORY</h3>
                <div className="title-line"></div>
            </div>

            <div className="category-box">

                <div className="category-item">
                    <span>SPORTSWEAR</span>
                    <span className="plus">+</span>
                </div>

                <div className="category-item">
                    <span>MENS</span>
                    <span className="plus">+</span>
                </div>

                <div className="category-item">
                    <span>WOMENS</span>
                    <span className="plus">+</span>
                </div>

                <div className="category-item">
                    <span>KIDS</span>
                </div>

                <div className="category-item">
                    <span>FASHION</span>
                </div>

                <div className="category-item">
                    <span>HOUSEHOLDS</span>
                </div>

                <div className="category-item">
                    <span>INTERIORS</span>
                </div>

                <div className="category-item">
                    <span>CLOTHING</span>
                </div>

                <div className="category-item">
                    <span>BAGS</span>
                </div>

                <div className="category-item">
                    <span>SHOES</span>
                </div>

            </div>


            <div className="title-box">
                <div className="title-line"></div>
                <h3>BRANDS</h3>
                <div className="title-line"></div>
            </div>

            <div className="brand-box">

                <div className="brand-item">
                    <span>ACNE</span>
                    <span>(50)</span>
                </div>

                <div className="brand-item">
                    <span>GRÜNE ERDE</span>
                    <span>(56)</span>
                </div>

                <div className="brand-item">
                    <span>ALBIRO</span>
                    <span>(27)</span>
                </div>

                <div className="brand-item">
                    <span>RONHILL</span>
                    <span>(32)</span>
                </div>

                <div className="brand-item">
                    <span>ODDMOLLY</span>
                    <span>(5)</span>
                </div>

                <div className="brand-item">
                    <span>BOUDESTIJN</span>
                    <span>(9)</span>
                </div>

                <div className="brand-item">
                    <span>RÖSCH CREATIVE CULTURE</span>
                    <span>(4)</span>
                </div>

            </div>


            <div className="title-box">
                <div className="title-line"></div>
                <h3>PRICE RANGE</h3>
                <div className="title-line"></div>
            </div>

            <div className="price-box">

                <input
                    className="price-range"
                    type="range"
                    min="0"
                    max="600"
                    defaultValue="320"
                />

                <div className="price-value">
                    <span>$ 0</span>
                    <span>$ 600</span>
                </div>

            </div>

        </div>
    );
}

export default MenuLeft;