import {useState} from "react";

function Toogle()
{
    const [isOn, setIsOn] = useState(true);
    // isOn là biến khởi tạo với giá trị true, setIsOn là hàm để thay đổi giá trị của isOn

    function handleClick()
    {
        setIsOn(!isOn)
        
        // thay đổi giá trị của isOn thành giá trị ngược lại
    }   
    return (
        <div>
            <button onClick={handleClick}>
                {isOn ? 'ON' : 'OFF'}
                {/* nếu true thì hiển thị on còn false thì hiển thị offf */}
            </button>
        </div>
    )
}
export default Toogle;