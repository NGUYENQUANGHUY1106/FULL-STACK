import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, increaseByAmount } from "./counterSlice";


function Test() {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const count = useSelector((state) => state.counter.value);
//  state  toàn bộ state trong redux store  counter key bạn khai báo trong  store.js 
// value là initialvalue  giá trị hiện tại 
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const dispatch = useDispatch();


 return (
   <div style={{ padding: 20 }}>
     <h1>Counter: {count}</h1>


     <button onClick={() => dispatch(increase())}>Increase</button>
     <button onClick={() => dispatch(decrease())}>Decrease</button>


     
<button onClick={() => dispatch(increaseByAmount(5))}>
    {/* 5 là payload */}
       Increase +5
     </button>
   </div>
 );
}


export default Test;
