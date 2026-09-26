function HamTrue()
{
    return(
        <div>
            <h1>Greeting True</h1>
        </div>
    )
}
function HamFalse()
{
    return(
        <div>
            <h1>Greeting False</h1>
        </div>
    )
}

function Greeting(props)
{
    const xx = props.xx;
    if(xx) 
        // nếu là true lấy xx thì Vidu1 truyền qua 
    {
        return <HamTrue/>
    }
    else
    {
        return <HamFalse/>
    }
}
export default Greeting