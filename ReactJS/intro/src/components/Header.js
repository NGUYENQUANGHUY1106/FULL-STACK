
function Header() {
    return (
        <header className="header">
            <div className="logo">
                Quang Huy Sport
            </div>

            <div className="slide_bar">
                <nav className="navbar">
                <p >Home</p>
                <p >Product</p>
                <p >Blog</p>
                <p >About</p>
                <p >Contact</p>
            </nav>
            <div className="account">
               <button className="login">Login</button>
                <button className="register">Register</button>
            </div>
            </div>
        </header>
    );
}

export default Header;