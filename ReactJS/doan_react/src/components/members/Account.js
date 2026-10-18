
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Config/Api";

function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    address: user?.address || "",
    phone: user?.phone || "",
    avatar: null,
    // ?. kiểm tra xem giá trị đó có tồn tại k user lấy ở localstorage 
  });

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login", { replace: true });
    }
  }, [user.id, navigate, user]);

  if (!user || !user.id) {
    return null;
  }

  // Hàm lấy dữ liệu khi nhập input
  function hadleInput(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      // dữ lại những dữ liệu không thay đổi
      [name]: value,
    });
  }

  // Hàm xử lý ảnh
  function handleFile(e) {
    const file = e.target.files[0];

    if (file) {
      setInput({
        ...input,
        // dữ lại nhưng dữ liệu k thay đổi
        avatar: file,
      });
    }
  }

  // Hàm cập nhật thông tin
  function handleUpdate(e) {
    e.preventDefault();

    const formData = new FormData();
    // lấy dữ liệu ở form để post 
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("address", input.address);
    formData.append("phone", input.phone);

    if (input.password !== "") {
      // nếu có thy đổi thì đưa password mới lên k thì thôi
      formData.append("password", input.password);
    }

    if (input.avatar) {
      formData.append("avatar", input.avatar);
    }


    API.post(`user/update/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("Response:", response.data);

        if (response.data.errors) {
          console.log(response.data.errors);
          ;
          return;
        }

        if (response.data.Auth) {
          const updatedUser = response.data.Auth;

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );

          alert("Cập nhật thành công!");
        } else {
          alert("Chưa nhận được dữ liệu user từ API");
        }
      })
      .catch((error) => {
        console.log(error.response?.data || error);
        alert("Cập nhật thất bại!");
      });
  }

  return (
    <form onSubmit={handleUpdate} className="account-update">
      <h3 className="account-update-title">
        User Update!
      </h3>

      <div className="account-update-form">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={input.name}
          onChange={hadleInput}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={input.email}
          readOnly
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={hadleInput}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={input.address}
          onChange={hadleInput}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={input.phone}
          onChange={hadleInput}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
        />

        {user.avatar && (
          <img
            src={
              "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
              user.avatar
            }
            alt={user.name}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <button type="submit" className="account-update-btn">
        Update
      </button>
    </form>
  );
}

export default Account;
