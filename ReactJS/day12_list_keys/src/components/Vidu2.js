function Vidu2(props) {
  // console.log(props.arr);
  // console.log(props.obj);

  const arr = props.arr;
  const obj = props.obj;
  console.log(arr);
  console.log(obj);
//   map theo array

//   function renderData() {
//     let { arr } = props;

//     if (arr.length > 0) {
//       return arr.map((value, key) => {
//         return <li key={key}>{value}</li>;
//       });
//     }
//   }

//   return (
//     <>
//       <p>map theo array</p>
//       <ul>
//         {renderData()}
//       </ul>
//     </>
//   );

// map theo object
    function renderDataObj()
    {
        let {obj} = props ;
        if(Object.keys(obj).length > 0)
        {
        return Object.keys(obj).map((key,index) =>
        {
            // key là name và age index là số thứ tự 0,1
            
            console.log(key);
            
             return (
                <li key={key}>
                       {obj[key]} 
                </li>
            );
        })
        };
    }
    return (
        <>
         <h2>Map theo object</h2>
         {renderDataObj()}
        </>
    );
};
export default Vidu2;
