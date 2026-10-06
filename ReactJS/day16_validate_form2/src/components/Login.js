import { useState }     from "react";
import FormErrors from "./FormErrors";

function Login(Props) {

    // state kiểu object để lưu dữ liệu của nhiều input 
    const [inputs,setInputs] = useState({
        email :  "" ,
        password : ""
    })  
     const [errors,setErrors] = useState({})
    // handleInput dùng để xử lý nhiều input cùng lúc, thay vì phải viết nhiều hàm handleInput cho từng input
    const handleInput =  (e) => 
    {
        const nameInput = e.target.name;
        const value = e.target.value ;
        // lấy giá trị người dùng vừa nhập vào 
        // e.target là input đang được thao tác 
        setInputs((state) =>({...state,[nameInput]:value}))
        console.log(inputs);
        
        
        // (state) là state hiện tại , ...state là lấy tất cả các giá trị trong state 
        // nameInput = "email";
        //value = "huy@gmail.com";

        //         setInputs((state) => ({
        //     ...state,
        //     [nameInput]: value
        // }));
        // sau đó 
        
        //     email: "huy@gmail.com",
        //     password: ""
        // }
        // và tiếp theo lấy giá trị của password 
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errSubmit = {} ;
        let flag = true ;


        if(inputs.email === "")
        {
            errSubmit.email = "Email không được để trống"
            flag = false
        }

        if(inputs.password === "")
        {
            errSubmit.password = "Password không được để trống"
            flag = false
        }

        if(!flag)
        {
            setErrors(errSubmit);
        }
        else
        {
            setErrors({});
        }
    }

    return (
        <>
        <FormErrors errors={errors} />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" onChange={handleInput}/>
                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                <button type="submit" className="btn btn-default">Login</button>


            </form>
        </>
    );

}

export default Login