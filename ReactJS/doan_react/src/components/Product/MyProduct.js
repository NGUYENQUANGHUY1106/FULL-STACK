import { useState, useEffect } from "react";
import API from "../../Config/Api";
import { Link } from "react-router-dom";
function Myproduct() {
  const [myProduct, setmyProduct] = useState({});
  const  token = localStorage.getItem('token')
  function deleteProduct(id)
  {
    API.get(`/user/product/delete/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    .then((response) =>
    {
      setmyProduct(response.data.data);
      
    })
    .catch((error) =>
    {
      console.log(error);
      
    })
    

  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get("user/my-product", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log( response.data.data);

      setmyProduct(response.data.data);
    }).catch((error) => {
      console.log(error);
    });


  }, []);

  return (
    <div className="my-product">
      <h1 className="my-product-title">Trang sản phẩm của tôi</h1>

      <div className="my-product-table-wrapper">
        <table className="my-product-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th colSpan="2" className="my-product-action-title">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(myProduct).map((key, index) => {
              const listImage = JSON.parse(myProduct[key].image);

              return (
                <tr key={myProduct[key].id}>
                  <td>{myProduct[key].id}</td>
                  <td>
                    <p>{myProduct[key].name}</p>
                  </td>
                  <td>
                    <img
                      src={
                        `http://localhost/laravel8/laravel8/public/upload/product/` +
                        `${myProduct[key].id_user}/` +
                        `${listImage[0]}`
                        // mã hóa một phàn của url
                      }
                      alt={myProduct[key].name}
                    />
                  </td>
                  <td>$ {myProduct[key].price}</td>
                  <td>
                    <Link to={"/account/update_product/" + myProduct[key].id} type="button" className="my-product-edit">
                      ✎
                    </Link>
                  </td>
                  <td>
                    <button onClick={() =>deleteProduct(myProduct[key].id)}  type="button" className="my-product-delete">
                      ✖
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="my-product-footer">
        <Link
          style={{ textDecoration: "none" }}
          to="/account/add_product"
          type="button"
          className="my-product-add"
        >
          Add New
        </Link>
      </div>
    </div>
  );
}
export default Myproduct;
