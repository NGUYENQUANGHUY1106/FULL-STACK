import { useState,useEffect } from "react";
import axios  from "axios";
import Bai2_B from "./Bai2_B";
function Bai2_A() {
    const [data, setData] = useState([]);

    useEffect(() =>
    {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) =>
        {
            console.log(response.data[0]);
            
            setData(response.data[0]);
        })
        .catch((error) =>
        {
            console.error('Error fetching data:', error);
        })
    },[])
    return (
        <>
            <Bai2_B data={data} />
        </>
    )
    
}
export default Bai2_A;