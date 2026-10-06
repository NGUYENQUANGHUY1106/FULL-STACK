import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import FormError from './FormError';
function Login_BT() {

    const [errors,setErr] = useState({})
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // lấy dữ liêu từ localStorage
    const userLocal = JSON.parse(localStorage.getItem("user") || "{}")
    // console.log(userLocal);
    


    const [inputs ,setInputs] =  useState({
        email : "" ,
        password : ""
    })
    function handleInput (e)
    {
        const  nameInput  =  e.target.name
        // lấy ra type của input đang thao tác
        const value = e.target.value
        // lấy ra value của input đang thao tác 
        setInputs((state) =>
        ({
            ...state,[nameInput] : value
            // state là giá trị cũ của inputs , 
            // ...state là lấy ra tất cả các giá trị cũ của inputs , [nameInput] : value là gán giá trị mới cho input đang thao tác
            
        }))
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        let errSubmit = {}
        let flag = true ;


        if(inputs.email === "")
        {
            errSubmit.email = "Email không được để trống"
            flag = false
        }
        else if(!emailRegex.test(inputs.email))
        {
            errSubmit.email = "Email không hợp lệ"
            flag = false
        }
        else if(inputs.email !== userLocal.email)
        {
            errSubmit.email = "Email không đúng"
            flag = false
        }
        if(inputs.password === "")
        {
            errSubmit.password = "Password không được để trống"
            flag = false
        }
        else if(inputs.password !==  userLocal.password)
        {
            errSubmit.password = "Password không đúng"
            flag = false
        }
        if(!flag)
        {
            setErr(errSubmit)
        }
        else
        {
            alert("Đăng nhập thành công")
            setErr({})
        }
    }

    return ( 
        <>
        <FormError errors={errors} />
        <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleInput}/>
        <input type="password" name="password" onChange={handleInput} />
        <button>Login</button>


        </form>
        
        </>
    )
}
export default Login_BT