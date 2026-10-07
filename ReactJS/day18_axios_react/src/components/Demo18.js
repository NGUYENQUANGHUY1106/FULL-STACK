import axios from 'axios';
import {useState ,useEffect} from 'react';


function Demo()
{
    const [data,setData] =  useState([])

    useEffect(() =>
        // usereffect gọi apt khi component được gắn vào giao diện 
    {
        // useeffect có 2 tham số, tham số thứ 1 là 1 function, tham số thứ 2 là 1 mảng rỗng , chứa các biến mà khi thay đổi sẽ gọi lại function trong tham số thứ 1
        // useEffect sẽ chạy sau khi render xong, nên có thể gọi api ở đây
        // useEffect chỉ chạy khi reload lại trang
        // lấy data muốn lấy đầu tiên, sau đó setData để render lại component
        // sau phải có [] để useEffect chỉ chạy 1 lần, nếu không có thì sẽ chạy vô hạn
        // sau khi useeffect chauyj xong sẽ dùng setData để cập nhật lại dữ liệu


        axios.get('https://jsonplaceholder.typicode.com/users')
        // bất đồng bộ
        // lấy danh sách người dùng từ api
        
        .then((response)=>
        {
            setData(response.data)
            // tự động chuyển dữ liệu từ json sang object, nên không cần dùng JSON.parse
        })
        .catch((error) =>{
            console.log(error);
            
        })
        // console.log("ok");
        
    },[])

    async function getData()
    {
        const url = 'https://jsonplaceholder.typicode.com/users';
        try{
            const response = await fetch(url);
    //  đợi api phản hồi 
    //         khi fetch xong thì sẽ trả về 1 promise
    //         promise là 1 đối tượng đại diện cho 1 giá trị chưa xác định, có thể thành công hoặc thất bại
    //         cho nên phải dùng await để đợi kết quả trả về 
            if (!response.ok)
            {
                throw new Error(`Response Status: ${response.status}` );

            }
            const json = await response.json();
    // đợi lấy dữi liệu json từ response, khi fetch xong thì sẽ trả về 1 promise
            console.log(json);

            

        }catch(error)
        {
            console.error( error.message);
        }
    }

    function renderData()

    {
        // kiểm tra xem data có dữ liệu hay không, nếu có thì map ra từng phần tử
        if (data.length > 0)
        {
            return data.map((value,key) =>
            {
                return (
                    <li key={key}>
                        <p>{value.id}</p>
                        <p>{value.name}</p>
                    </li>
                )
            })
        }
    }
    // lúc vào thì chạy renderData() trước
    return (
        <>
        <ul>
            {renderData()}
        </ul>
        </>
    )
}
export default Demo;
// cứ mỗi lần setData thay đổi thì sẽ render lại component, nên khi setData xong thì sẽ render lại component và gọi renderData() để hiển thị dữ liệu mới