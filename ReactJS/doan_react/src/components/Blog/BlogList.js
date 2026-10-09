import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/laravel8/laravel8/public/api/blog")
      .then((response) => {
        console.log("API trả về:", response.data.blog.data);
        setData(response.data.blog.data);
      })
      .catch((error) => {
        console.log("Lỗi API:", error.message);
      });
  }, []);

  function renderData() {
    if (data.length > 0) {
      return Object.keys(data).map((key, index) => {
        return (
          <div className="blog-item" key={data[key].id}>
            <h2 className="blog-title">{data[key].title}</h2>
            <div className="blog-info">
              <span>
                <i className="fa fa-user"></i>
                Author {data[key].id_auth}
              </span>

              <span>
                <i className="fa fa-calendar"></i>
                {data[key].created_at}
              </span>
            </div>

            <div className="blog-image">
              <img
                src={
                  "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
                  data[key].image
                }
                alt={data[key].title}
              />
            </div>

            <p className="blog-description">{data[key].description}</p>

            <Link to={"/blogdetails/" + data[key].id} className="blog-button">
              Read More
            </Link>
          </div>
        );
      });
    }
  }

  return (
    <div className="col-sm-9">
      <div className="blog-list">{renderData()}</div>
    </div>
  );
}

export default BlogList;
