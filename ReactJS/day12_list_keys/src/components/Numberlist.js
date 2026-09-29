
function Numberlist(props)
{
    const props_numbers = props.numbers_list ;
    function listItems()
    {
        return props_numbers.map((number,key) =>
        {
            return (
                <li key={key}>
                       {number} 
                </li>
            )
        }
        )
    }
    return(
        <>
        <h1>ok</h1>
        <ul>{listItems()}</ul>
        </>
    )
    // const xx = props.data;

    // const listItems = xx.map((value) =>
    //     // nếu dùng arrow funtion thì phải có return 
    // {
        
    //     return(
    //         <li key={value.toString()}>
    //         {value}
    //     </li>
    //     )
    // });
    // return (
    //     <ul>{listItems}</ul>
    // )
    // làm theo kiểu function
}
export default Numberlist