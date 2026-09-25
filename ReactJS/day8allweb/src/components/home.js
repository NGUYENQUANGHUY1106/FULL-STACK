import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <header className="header">
        <h2>Quang Huy Sport</h2>

        <div className="header-row">
          <nav className="menu">
            <a href="/">Home</a>
            <Link to="/account">Account</Link>
            <a href="/">Blog</a>
            <a href="/">About</a>
            <Link to="/login">Login</Link>
          </nav>

          <div className="auth">
            <button className="login">Login</button>
            <button>Register</button>
          </div>
        </div>
      </header>

      <div className="main">

        <aside className="sidebar">
          <h2>Categories</h2>

          <ul>
            <li>Home</li>
            <li>Laptop</li>
            <li>Phone</li>
            <li>Tablet</li>
            <li>Accessories</li>
          </ul>
        </aside>

        <section className="content">

          <h1>Welcome to MyWebsite</h1>

          <p>Chào mừng bạn đến với trang Home</p>

          <button>Shop Now</button>

          <h2 className="featured-title">Featured Products</h2>

          <div className="products">

            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSEl55-N9uDB8LSaudhzCAwJWWIfknEVURYsaA2vPJ2-WVZSudj8sDmMlQPOF_FGln3ig6uPHNR4clHNOmheztcgQItIekN6XWmj7bWuBGkp1V0HtJx1Gm-3u6bdb7JrWEYm7T9GpilDw&usqp=CAc"
                alt="Laptop"
              />

              <p>
                Tuf Gamming F15 FX506HF-HN002W
                (i5-11400H/8GB RAM/512GB SSD/RTX2050 4GB/Win11)
              </p>

              <h3>Laptop</h3>

              <p>
                Laptop gaming hiệu năng cao phù hợp học tập và giải trí.
              </p>
            </div>

            <div className="product-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTNyjSEydVTpcfm1fcIqLT7ilm49BytwZYSCg7cMP1qoPp2NpKpl5GR2Js_pssHY8vY0ald_MHMQMQtQiqg-7KkiMS4vFbwgeUw5WJ16EzQiO7rBYm4MMkAmirO78Spec7DBNOCSz8fTw&usqp=CAc"
                alt="Nitro 5"
              />

              <p>
                Nitro 5 AN515-58-50X9
                (i5-12500H/8GB RAM/512GB SSD/RTX4050 6GB/Win11)
              </p>

              <h3>Laptop</h3>

              <p>
                Laptop gaming mạnh mẽ với card đồ họa RTX.
              </p>
            </div>

            <div className="product-card">
              <img
                src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQDLDubSeMV_Ig82n7mRm8SimmODeX9H97BUaAH3RKz3i_06b7ll65C4hb_Jp1sg1BD6Lciu2lz69s_AxnPcBbJkcy8qXdTspLvJX73b48tM0O1uOSUEdyJzyysAekW5cyOSqo7EsV7QAQ&usqp=CAc"
                alt="Tablet"
              />

              <p>
                Lenovo Tab M10 Plus 3rd Gen
                (4GB RAM/128GB ROM/10.61 inch/Android 13)
              </p>

              <h3>Tablet</h3>

              <p>
                Máy tính bảng phù hợp học tập và giải trí.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
export default Home;