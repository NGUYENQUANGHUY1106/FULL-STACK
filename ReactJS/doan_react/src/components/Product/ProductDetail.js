import { useState, useEffect } from "react";
import API from "../../Config/Api";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ProductDetail() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");
  const [file, setfile] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

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
}

  useEffect(() => {
    API.get(`user/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        setData(response.data.data);
        const images = response.data.data.image;

        const imageList =
          typeof images === "string" ? JSON.parse(images) : images || [];

        setfile(imageList);

        // ảnh hiển thị đầu tiên
        setImage(imageList[0] || "");
      })
      .catch((error) => {
        console.log(error);
      });

    API.get("category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  console.log(file);

  const [image, setImage] = useState("");

  //   cấu hình

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="product-details">
        <div className="product-details-left">
          <div className="product-main-image">
            {data.status === 0 ? (
              <span className="product-sale-tag">NEW</span>
            ) : (
              <span
                style={{ color: "white", background: "green" }}
                className="product-sale-tag"
              >
                SALE
              </span>
            )}

            {image && (
              <img
                src={
                  `http://localhost/laravel8/laravel8/public/upload/product/` +
                  `${data.id_user}/` +
                  `${image}`
                }
                alt={data.name}
              />
            )}

            <button className="product-zoom">ZOOM</button>
          </div>

          <div className="product-thumbnails">
            <Carousel
              responsive={responsive}
              arrows={true}
              infinite={file.length > 3}
              autoPlay={false}
              showDots={false}
              containerClass="carousel-container"
              itemClass="carousel-item-padding"
            >
              {file.map((value, index) => {
                return (
                  <div
                    className={
                      image === value
                        ? "product-thumbnail active"
                        : "product-thumbnail"
                    }
                    key={index}
                    onClick={() => setImage(value)}
                  >
                    <img
                      src={
                        `http://localhost/laravel8/laravel8/public/upload/product/` +
                        `${data.id_user}/` +
                        `${value}`
                      }
                      alt={data.name}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>

        <div className="product-details-right">
          <h2 className="product-details-title">{data.name}</h2>

          <p className="product-web-id">{data.name}</p>

          <div className="product-price-cart">
            <h4 className="product-details-price">$ {data.price}</h4>
            <button
              onClick={() => handleAddToCart(data)}
              className="product-add-cart"
            >
              🛒 Add to cart
            </button>{" "}
          </div>

          <div className="product-details-info">
            <p>
              <strong>Availability:</strong> In Stock
            </p>

            <p>
              <strong>Condition:</strong> 1
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {
                category.find((value) => value.id === data.id_category)
                  ?.category
              }
            </p>

            <p>
              <strong>Brand:</strong>{" "}
              {brand.find((value) => value.id === data.id_brand)?.brand}
            </p>

            <p>
              <strong>Rating:</strong>
              <span className="product-star"> ★</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
