import React from "react";
import { useState } from "react";

interface StateButton {
    stateLight: boolean; 
}
// interface là định nghĩa cấu trúc dữ liệu , 1 đối tượng cần có những thuộc tính gì 
// nếu sử dụng stateLIght thì kiểu dữ liệu phải là boolean

interface PropsButton {
    propsLight: boolean;
    color :string
}

function SwitchButton(props: PropsButton, state: StateButton) {
    
    // nhận props từ app truyền xuống
    // bắt buộc props phải là kiểu  boolean do đã quy định ở trên 
    
    const [stateLight, setStateLight] = useState<boolean>(props.propsLight);
    

    function change() {
        setStateLight(prev => !prev);

    }

    return (
        <>
            <button onClick={change}>Click</button>
            <p>The StateLight is {stateLight ? "ON" : "OFF"}</p>
            <p>{props.color}</p>
        </>
    ); 
}

export default SwitchButton;