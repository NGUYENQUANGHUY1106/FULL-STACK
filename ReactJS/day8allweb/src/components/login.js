
import { useState } from 'react';
import Login_btn from './Loginbtn'
import Logout_btn  from './Logoutbtn'
import Warning from './Waring'
function Login()
{
    const [isToogle,setIsToogle] =  useState(false);
    function handleLoginClick()
    {
        setIsToogle(!isToogle);
    }
    function handleLogoutClick ()
    {
        setIsToogle(!isToogle);
    }

    function renderButton()
    {
        let button  ;
        if (isToogle)
        {
            // nếu true thì gọi đén funtion logout
            button = <Logout_btn onClick={handleLogoutClick} />
            // truyền vào dunction Logout_btn một cái sự kiện onclick và bên function logout_btn sẽ nhận được 1 props.onclick và khi click và sẽ gọi đến handleLogoutClick  
            console.log(isToogle);
            
        }
        else
        {
            button = <Login_btn onClick={handleLoginClick} />
            console.log(isToogle);
            
        }
        return button
    }
    const [showWarning,setShowWarning] = useState(true);

    function handleToogleWarningClick()
    {
        setShowWarning(!showWarning);
    }
    return(
        <div>
            <p>Trang Login</p>
            <label >Username: </label>
            <input type="text" id="username" name="username"/>
            <label >Password: </label>
            <input type="password" id="password" name="password"/>
            {renderButton()}
            <div>
                <Warning warning = {showWarning}>
                    {/*  truyền vào warning một data là showwarning  */}
                    <button onClick={handleToogleWarningClick}>
                        {showWarning ? 'Hide' : 'Show'}
                    </button>
                </Warning>
            </div>
        </div>
    )   
}
export default Login;