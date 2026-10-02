import { useState } from "react";
function Login()
{
    const [email,setEmail] =  useState("")
    const [password,setPassword] =  useState("")

    const [errorEmail,setErrorEmail] =  useState("")
    const [errorPassword,setErrorPassword] =  useState("")


        function handleForm(e)
        {
            e.preventDefault()
            if(email === "")
            {
                setErrorEmail("Vui Lòng nhập email")
            }
            else
            {
                setErrorEmail("")
            }
            if(password === "")
            {
                setErrorPassword("Vui Lòng nhập password")
            }
            else
            {
                setErrorPassword("")
            }

        }
        function handleEmail(e)
        {
            setEmail(e.target.value)
        }
    
        function handlePassword(e)
        {
            setPassword(e.target.value)
        }
    



    return (

        <>
        
        <form onSubmit={handleForm}>
            <input type="email" value={email} onChange={handleEmail}  />
            <p style={{color:"red"}}>{errorEmail}</p>
            
            <input type="password" value={password} onChange={handlePassword} />
            <p style={{color:"red"}}>{errorPassword}</p>
            <button type="Submit">Login</button>

        </form>
        
        
        </>
    )

}
export default Login;