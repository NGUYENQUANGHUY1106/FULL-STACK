import { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorForm from "../Errors/ErrorForm";
import API from "./../../Config/Api" ;
function Login() {
  const navigate = useNavigate(); 
  const [inputs,setInput] = useState({
    email : "" ,
    password : ""
  })
  const[err,setError] = useState({})
  function handleInput(e)
  {
   const nameInput = e.target.name ;
   const value  = e.target.value ;

   setInput((state)=>({...state,[nameInput]:value}))

  }
  function handleSubmit(e)
  {
    e.preventDefault() ;
    let errSubmit = {}
    let flag = true ;

    if(inputs.email === "")
    {
      errSubmit.email = "Vui lòng nhập email"
      flag = false
    }
    if(inputs.password === "")
    {
      errSubmit.password = "Vui lòng nhập password"
            flag = false

    }
    if(!flag)
    {
      setError(errSubmit)
    }
    else
    {
      const data ={
        email : inputs.email ,
        password :  inputs.password ,
      }
      API.post('login',data)
      .then((response)=>
      {
        if(response.data.errors)
        {
          console.log(response.data.errors);
          
        }
        else
        {
          const authUser = response.data.Auth;
          console.log(response);
          localStorage.setItem("user", JSON.stringify(authUser));
          localStorage.setItem("token", response.data.token);


          window.dispatchEvent(new Event("authChanged"));
          // reload lại header
          setError({})
          alert(" đăng nhập thành công")
          navigate('/')
          
        }
      })
      .catch(function(error)
      {
        console.log(error);
        
      })
    }
  }
  return (
    <div className="register-container">
      <h2>Login</h2>
      <ErrorForm  errors = {err}/>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email Address" onChange={handleInput} />

        <input type="password" name="password" placeholder="Password" onChange={handleInput} />

        <div style={{ display: "flex", gap: "15px" }} className="btn">
          <button type="submit">Login</button>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              fontWeight: "bold",
              alignItems: "center",
              width: "116px",
              height: "40px",
              background: "green",
              color: "white",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Login;
