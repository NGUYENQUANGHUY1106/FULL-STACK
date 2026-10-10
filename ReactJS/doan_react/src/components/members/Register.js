    import React from "react";
    import { useState } from "react";
    import axios from "axios";
import ErrorForm from "../Errors/ErrorForm";
    function Register() {
    const [errors, setErrors] = useState({});
    const allowedFiles = ["png", "jpg", "jpeg", "PNG", "JPG"];
    const [file, setFile] = useState("");
    const[avatar,setAvatar] = useState("")


    const [inputs, setInputs] = useState({
        name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    avatar: "",
    level: "",
  });

  function handleFile(e)
  {
    const file = e.target.files ;

    // gửi file cho api server 

    let reader = new FileReader ()

    reader.onload = (e) =>
    {
        setAvatar(e.target.result) // gửi  qua api
        console.log(avatar);
        
        setFile(file[0])
    }
    reader.readAsDataURL(file[0]);

  }
  function allowed_file(file)
  {
    return file && allowedFiles.includes(file.name.split(".").pop());
  }
  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let errSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      errSubmit.name = "Tên không được để trống";
      flag = false;
    }
    if (inputs.email === "") {
      errSubmit.email = "Email không được để trống";
      flag = false;
    }

    if (inputs.password === "") {
      errSubmit.password = "Password không được để trống";
      flag = false;
    }
    if (inputs.phone === "") {
      errSubmit.phone = "Phone không được để trống";
      flag = false;
    }
    if (inputs.address === "") {
      errSubmit.address = "Address không được để trống";
      flag = false;
    }
    if(file === "")
    {
        errSubmit.file = "Vui lòng chọn file"
        flag = false
    }
    else
    {
        console.log(file.name , file.size , file.type);
        if(!allowed_file(file))
        {
            errSubmit.file = "File không hợp lệ"
            flag = false
        }
        else if(file.size > 1024*2024)
        {
            errSubmit.file = "File quá lớn"
            flag = false
        }
        
    }




    if (!flag) {
      setErrors(errSubmit)
    }
    else
    {
        setErrors({})
        // const hashPassword =  bcrypt.hash(password,10)
        // setPassword(hashPassword)
        // console.log("mk" + hashPassword);
        // kiểm tra mật khẩu 
        // const check =  bcrypt.compare(password, hashPassword);
        
        const data ={
            name : inputs.name ,
            email : inputs.email,
            password : inputs.password,
            phone :  inputs.phone ,
            address : inputs.address ,
            avatar  : avatar ,
            level : "0"
            
        }
        console.log(data);
        
        axios.post('http://localhost/laravel8/laravel8/public/api/register', data)
        .then((response)=>
        {
           if(response.data.error)
           {
             setErrors(response.data.error)
           }
           else
           {
            alert("Đăng kí thành công")
           }
            
        })

    }
  }
  return (
    <div className="register-container">
      <h2>New User Signup!</h2>
        <ErrorForm errors = {errors}/>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleInput} />

        <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />

        <input type="password" name="password" placeholder="Password" onChange={handleInput} />

        <input type="text" name="phone" placeholder="Phone" onChange={handleInput} />

        <input type="text" name="address" placeholder="Address"onChange={handleInput} />

        <input type="file" name="avatar" onChange={handleFile} />

        <select name="level" onChange={handleInput}>
          <option value="0">0</option>

        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
export default Register;
