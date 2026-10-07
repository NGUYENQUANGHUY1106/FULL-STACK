
import axios  from "axios";
import { useEffect, useState } from "react";
import B from "./B";
function A()
{
    const [data,setData] = useState ([])

    useEffect(() =>
    {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) =>
        {
            setData(response.data)
        })
        .catch((error) =>
        {
            console.error(error.message);
            
        })
    },[])

  
    
    
    return (
        <>
        <B data = {data} />
        
        </>
    )
}

export default A;