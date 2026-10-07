import { useState } from 'react';
import axios from 'axios';
// gửi các request post, put, delete, patch thì cần phải có data
function PostRequest18() {

    const [input,setInput] = useState("")
    function handleChange(e){

        setInput(e.target.value)
        // lấy giá trị từ input và set vào state input


    }
    function handleSubmt(e)
    {
        e.preventDefault()
        const data = {
            name : input 
        }
        // axios.post("https://jsonplaceholder.typicode.com/users",data)
        axios.delete("https://jsonplaceholder.typicode.com/users",data)
        .then((res) =>
        {
            console.log(res)
        })
    }

    return (
        <>
        <form onSubmit={handleSubmt}>
            <input type='text' name='username' value={input} onChange={handleChange} />
            <button type='submit' >Submit</button>


        </form>
        
        
        </>
    )

}
export default PostRequest18