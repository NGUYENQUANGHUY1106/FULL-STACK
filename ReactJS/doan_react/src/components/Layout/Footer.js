import React from "react";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-top">
                <div className="footer-container footer-top-content">

                    <div className="footer-logo-box">

                        <div className="footer-logo">
                            <span className="logo-orange">E-</span>
                            <span>SHOPPER</span>
                        </div>

                        <p>
                            Discover quality products,
                            modern fashion and great
                            shopping experiences.
                        </p>

                    </div>


                    <div className="footer-post">

                        <div className="footer-image">
                            <img
                                src="/images/footer-1.jpg"
                                alt="footer"
                            />
                        </div>

                        <p>New Collection</p>
                        <span>24 DEC 2026</span>

                    </div>


                    <div className="footer-post">

                        <div className="footer-image">
                            <img
                                src="/images/footer-2.jpg"
                                alt="footer"
                            />
                        </div>

                        <p>Fashion Story</p>
                        <span>24 DEC 2026</span>

                    </div>


                    <div className="footer-post">

                        <div className="footer-image">
                            <img
                                src="/images/footer-3.jpg"
                                alt="footer"
                            />
                        </div>

                        <p>Winter Style</p>
                        <span>24 DEC 2026</span>

                    </div>


                    <div className="footer-post">

                        <div className="footer-image">
                            <img
                                src="/images/footer-4.jpg"
                                alt="footer"
                            />
                        </div>

                        <p>Special Sale</p>
                        <span>24 DEC 2026</span>

                    </div>


                    <div className="footer-location">

                        <div className="map-shape">
                            🌍
                        </div>

                        <p>
                            505 S Atlantic Ave
                            <br />
                            Virginia Beach,
                            <br />
                            VA, USA
                        </p>

                    </div>

                </div>
            </div>


            <div className="footer-middle">

                <div className="footer-container footer-middle-content">

                    <div className="footer-column">

                        <h3>SERVICE</h3>

                        <p>Online Help</p>
                        <p>Contact Us</p>
                        <p>Order Status</p>
                        <p>Change Location</p>
                        <p>FAQ's</p>

                    </div>


                    <div className="footer-column">

                        <h3>QUICK SHOP</h3>

                        <p>T-Shirt</p>
                        <p>Mens</p>
                        <p>Womens</p>
                        <p>Gift Cards</p>
                        <p>Shoes</p>

                    </div>


                    <div className="footer-column">

                        <h3>POLICIES</h3>

                        <p>Terms of Use</p>
                        <p>Privacy Policy</p>
                        <p>Refund Policy</p>
                        <p>Billing System</p>
                        <p>Ticket System</p>

                    </div>


                    <div className="footer-column">

                        <h3>ABOUT SHOPPER</h3>

                        <p>Company Information</p>
                        <p>Careers</p>
                        <p>Store Location</p>
                        <p>Affiliate Program</p>
                        <p>Copyright</p>

                    </div>


                    <div className="footer-newsletter">

                        <h3>NEWSLETTER</h3>

                        <div className="newsletter-box">

                            <input
                                type="email"
                                placeholder="Your email address"
                            />

                            <button>
                                ➜
                            </button>

                        </div>

                        <p>
                            Subscribe to receive our latest
                            products, offers and shopping updates.
                        </p>

                    </div>

                </div>
            </div>


            <div className="footer-bottom">

                <div className="footer-container footer-bottom-content">

                    <p>
                        Copyright © 2026 E-SHOPPER.
                        All rights reserved.
                    </p>

                    <p>
                        Designed by MyShop
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;