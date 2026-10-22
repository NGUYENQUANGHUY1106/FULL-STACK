
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../Config/Api";
import ErrorForm from './../Errors/ErrorForm';

function UpdateProduct() {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  // Đổi thành state để lưu tên ảnh được chọn xóa
  const [avatarCheckBox, setAvatarCheckBox] = useState([]);

  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});

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

  // Xử lý chọn ảnh mới
  function handleFile(e) {
    setFile(Array.from(e.target.files));
  }

  // Kiểm tra định dạng ảnh
  function allowed_file(file) {
    return (
      file &&
      allowedFiles.includes(file.name.split(".").pop())
    );
  }
  // lấy product để edit
  useEffect(() => {
    API.get(`/user/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        const product = response.data.data;

        setData(product);

        // Bổ sung: lưu dữ liệu sản phẩm vào input
        // để người dùng có thể chỉnh sửa
        setInput({
          name: product.name ?? "",
          price: product.price ?? "",
          category: product.id_category ?? "",
          brand: product.id_brand ?? "",
          status: String(product.active ?? "1"),
          sale: product.sale ?? "0",
          company: product.company_profile ?? "",
          avatar: null,
          detail: product.detail ?? "",
        });

        setAvatarCheckBox([]);
        setFile([]);
      })
      .catch((error) => {
        console.log(error);
      });
      // lấy brand vs category
    API.get("category-brand")
      .then((response) => {
        setCategory(response.data.category);
        setBrand(response.data.brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  // Xử lý thay đổi input
  function handleInput(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,

      ...(name === "status" && value === "0"
        ? { sale: "0" }
        : {}),
    });
  }

  // Bổ sung: xử lý checkbox ảnh cũ
  function handleCheckbox(e, image) {
    if (e.target.checked) {
      // Nếu tích checkbox thì thêm tên ảnh vào mảng
      setAvatarCheckBox((prev) => [...prev, image]);
    } else {
      // Nếu bỏ tích thì xóa tên ảnh khỏi mảng
      setAvatarCheckBox((prev) =>
        prev.filter((item) => item !== image)
      );
    }
  }

  // Bổ sung: xử lý cập nhật sản phẩm
  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    // Kiểm tra thông tin
    if (input.name.trim() === "") {
      newErrors.name = "Vui lòng nhập tên sản phẩm";
    }

    if (
      input.price === "" ||
      !Number.isFinite(Number(input.price)) ||
      Number(input.price) <= 0
    ) {
      newErrors.price = "Giá sản phẩm không hợp lệ";
    }

    if (input.category === "") {
      newErrors.category = "Vui lòng chọn category";
    }

    if (input.brand === "") {
      newErrors.brand = "Vui lòng chọn brand";
    }

    if (input.company.trim() === "") {
      newErrors.company = "Vui lòng nhập company";
    }

    if (input.detail.trim() === "") {
      newErrors.detail = "Vui lòng nhập detail";
    }

    // Kiểm tra định dạng ảnh mới
    file.forEach((image) => {
      if (!allowed_file(image)) {
        newErrors.avatar = "Ảnh phải có định dạng jpg, jpeg, png";
      }
    });

    // kiểm tra xem có ddure 3 ảnh k 
    const totalImages =
      (data.image?.length || 0) -
      avatarCheckBox.length +
      file.length;

    if (totalImages > 3) {
      newErrors.avatar = "Tổng số ảnh tối đa là 3";
    }

    if (file.length === 0) {
      newErrors.avatar = "Vui lòng chọn ảnh upload";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Tạo FormData
    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("brand", input.brand);
    formData.append("status", input.status);
    formData.append("sale", input.sale);
    formData.append("company", input.company);
    formData.append("detail", input.detail);

    // Đưa ảnh mới vào FormData
    file.forEach((image) => {
      formData.append("file[]", image);

    });

    // Đưa tên ảnh cần xóa vào FormData
    avatarCheckBox.forEach((image) => {
      formData.append("avatarCheckBox[]", image);
    });


    // Gửi API Update
    // Kiểm tra endpoint chính xác trong tài liệu API
    API.post(`/user/product/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        alert("Cập nhật sản phẩm thành công");
      })
      .catch((error) => {
        console.log(error);

      });
  }

  return (
    <>
      <div className="add-product">
        <h2>Cập nhật sản phẩm</h2>
        <ErrorForm errors ={errors} />
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={input.name}
            placeholder="Name"
          />

          <input
            type="number"
            name="price"
            value={input.price}
            placeholder="Price"
            onChange={handleInput}
          />

          <input
            type="text"
            name="company"
            value={input.company}
            placeholder="Company"
            onChange={handleInput}
          />

          <select
            name="category"
            className="create-product-select"
            value={input.category}
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
            value={input.brand}
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
            onChange={handleInput}
            value={input.status}
          >
            <option value="1">New</option>
            <option value="0">Sale</option>
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

          <div className="add-product-upload">
            <input
              type="file"
              name="avatar"
              onChange={handleFile}
              accept="image/*"
              multiple
            />
          </div>

          <div className="add-product-images">
            {data.image?.map((image, index) => {
              return (
                <div className="add-product-image" key={index}>
                  <img
                    src={`http://localhost/laravel8/laravel8/public/upload/product/${data.id_user}/${image}`}
                    alt={`Product`}
                  />

                  <input
                    type="checkbox"
                    checked={avatarCheckBox.includes(image)}
                    onChange={(e) => handleCheckbox(e, image)}
                  />
                </div>
              );
            })}
          </div>

          <textarea
            name="detail"
            value={input.detail}
            placeholder="Detail"
            rows="6"
            onChange={handleInput}
          />

          <button type="submit" className="add-product-btn">
            Edit Product
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;
