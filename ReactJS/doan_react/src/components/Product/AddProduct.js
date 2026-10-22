import { useEffect, useState } from "react";
import API from "../../Config/Api";
import ErrorForm from "./../Errors/ErrorForm";

function AddProduct() {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    status: "1",
    sale: "0",
    company: "",
    avatar: null,
    detail: "",
  });
  const [file, setFile] = useState([]);
  const allowedFiles = ["png", "jpg", "jpeg", "PNG", "JPG"];
  function handleFile(e) {
    setFile(Array.from(e.target.files));
  }
  function allowed_file(file) {
    return file && allowedFiles.includes(file.name.split(".").pop());
  }

  useEffect(() => {
    API.get("category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("Category:", category);
  console.log("Brand:", brand);
  function handleInput(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
      ...(name === "status" && value === "0" ? { sale: "0" } : {}),
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;

    if (input.name === "") {
      errSubmit.name = "Vui lòng nhập name";
      flag = false;
    }

    if (input.price === "") {
      errSubmit.price = "Vui lòng nhập price";
      flag = false;
    }

    if (input.brand === "") {
      errSubmit.brand = "Vui lòng nhập brand";
      flag = false;
    }

    if (input.category === "") {
      errSubmit.category = "Vui lòng nhập category";
      flag = false;
    }

    if (input.company === "") {
      errSubmit.company = "Vui lòng nhập company";
      flag = false;
    }

    if (file.length === 0) {
      errSubmit.file = "Vui lòng chọn file";
      flag = false;
    } else if (file.length > 3) {
      errSubmit.file = "Chỉ được chọn tối đa 3 ảnh";
      flag = false;
    } else {
      file.forEach((item) => {
        if (!allowed_file(item)) {
          errSubmit.file = "File không hợp lệ";
          flag = false;
        } else if (item.size > 1024 * 1024) {
          errSubmit.file = "Mỗi ảnh không được vượt quá 1MB";
          flag = false;
        }
      });
    }

    if (input.detail === "") {
      errSubmit.detail = "Vui lòng nhập detail";
      flag = false;
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price);
      formData.append("category", input.category);
      formData.append("brand", input.brand);
      formData.append("company", input.company);
      formData.append("detail", input.detail);
      formData.append("status", input.status);
      formData.append("sale", input.sale);

      file.forEach((item) => {
        formData.append("file[]", item);
        // file[] báo cho biết là 1 mảng
      });


      API.post("user/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((response) => {
          console.log("Response:", response.data);

          if (response.data.response === "success") {
            alert("Thêm sản phẩm thành công");
            console.log(response.data);

          } else {
            console.log(response.data.error);
          }
        })
        .catch((error) => {
          console.log(error.response?.data || error);
        });
    }
  }
  return (
    <div className="create-product">
      <h2 className="create-product-title">Create product!</h2>
      <ErrorForm errors={errors} />
      <form
        onSubmit={handleSubmit}
        className="create-product-form"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="create-product-input"
          onChange={handleInput}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="create-product-input"
          onChange={handleInput}
        />

        <select
          name="category"
          className="create-product-select"
          defaultValue=""
          onChange={handleInput}
        >
          <option value="" disabled>
            Please choose category
          </option>
          {category.map((value, index) => {
            return (
              <option key={value.id} value={value.id}>
                {value.category}
              </option>
            );
          })}
        </select>

        <select
          name="brand"
          className="create-product-select"
          defaultValue=""
          onChange={handleInput}
        >
          <option value="" disabled>
            Please choose brand
          </option>
          {brand.map((value, index) => {
            return (
              <option key={value.id} value={value.id}>
                {value.brand}
              </option>
            );
          })}
        </select>

        <select
          name="status"
          className="create-product-select"
          value={input.status}
          onChange={handleInput}
        >
          <option value="0">New</option>
          <option value="1">Sale</option>
        </select>

        {input.status === "1" && (
          <div className="create-product-sale">
            <input
              type="number"
              name="sale"
              placeholder="0"
              min="0"
              max="100"
              value={input.sale}
              className="create-product-sale-input"
              onChange={handleInput}
            />
            <span>%</span>
          </div>
        )}

        <input
          type="text"
          name="company"
          placeholder="Company profile"
          className="create-product-input"
          onChange={handleInput}
        />

        <div className="create-product-file">
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            onChange={handleFile}
          />
        </div>

        <textarea
          name="detail"
          placeholder="Detail"
          className="create-product-textarea"
          onChange={handleInput}
        ></textarea>

        <div className="create-product-footer">
          <button type="submit" className="create-product-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddProduct;
