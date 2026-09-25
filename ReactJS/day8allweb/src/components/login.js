function Login()
{
    return(
        <div>
            <p>Trang Login</p>
            <label >Username: </label>
            <input type="text" id="username" name="username"/>
            <label >Password: </label>
            <input type="password" id="password" name="password"/>
            <button>Login</button>
        </div>
    )   
}
export default Login;