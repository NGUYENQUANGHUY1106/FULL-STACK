import { useState } from "react";
import FormError from "./FormError";
function Register() {
  const arr = [
    {
      id: "",
      name: "vui lòng chọn",
    },
    {
      id: 2,
      name: "Male",
    },
    {
      id: 3,
      name: "Female",
    },
  ];

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    avatar: "",
    sex: "",
  });
  const [file, setFile] = useState("");
  const allowedFiles = ["png", "jpg", "jpeg", "PNG", "JPG"];
  function handleFile(e) {
    setFile(e.target.files[0] || "");
  }
  function allowed_file(file) {
    return file && allowedFiles.includes(file.name.split(".").pop());
    // file.name.split('.').pop() lấy ra phần mở rộng của file
    // ví dụ file.name = "image.png" => file.name.split('.') = ["image","png"] => file.name.split('.').pop() = "png"
    // pop() lấy ra phần tử cuối cùng của mảng
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [errors, setErrors] = useState({});
  function handleInput(e) {
    const nameInput = e.target.name;
    // lấy ra name của input đang thao tác
    const value = e.target.value;
    // lấy ra value của input đang thao tác
    setInputs((state) => ({
      ...state,
      [nameInput]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;

    if (inputs.email === "") {
      errSubmit.email = "Email không được để trống";
      flag = false;
    } else if (!emailRegex.test(inputs.email)) {
      errSubmit.email = "Email không đúng định dạng";
      flag = false;
    }
    if (inputs.password === "") {
      errSubmit.password = "Password không được để trống";
      flag = false;
    }
    if (inputs.sex === "") {
      errSubmit.sex = "Vui lòng chọn giới tính";
      flag = false;
    }
    if (file === "") {
      errSubmit.file = "VUi lòng chọn file";
      flag = false;
    } else {
      console.log(file.name, file.size, file.type);
      if (!allowed_file(file)) {
        errSubmit.file = "File không hợp lệ";
        flag = false;
      } else if (file.size > 1024 * 1024) {
        errSubmit.file = "File quá lớn";
        flag = false;
      }
    }

    if (!flag) {
      setErrors(errSubmit);
    } else {
      alert("Đăng ký thành công");
      setErrors({});
      // lưu vào localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      );
    }
  }
  return (
    <>
      <FormError errors={errors} />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleInput} />
        <input type="text" name="password" onChange={handleInput} />
        <input type="file" name="upload" onChange={handleFile} />
        <select name="sex" onChange={handleInput}>
          {arr.map((value, index) => {
            return (
              <option key={index} value={value.id}>
                {value.name}
              </option>
            );
          })}
        </select>

        <button type="submit">Register</button>
      </form>
    </>
  );
}
export default Register;
