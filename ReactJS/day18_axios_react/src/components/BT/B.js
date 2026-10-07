
function B(props)
{
    let {data} = props
    console.log(data);
    function renderData()
    {
        if(data.length > 0)
        {
            return Object.keys(data).map((key,index) =>
            {
                return (
                    <>
                        <li><p>{data[key].id}</p></li>
                        <li><p>{data[key].name}</p></li>
                        <li><p>{data[key].username}</p></li>
                        <li><p>{data[key].email}</p></li>
                        <li> Address :
                            <p>Street: {data[key].address.street}</p>
                            <p>Suite: {data[key].address.suite}</p>
                            <p>City: {data[key].address.city}</p>
                        </li>
                        <li><p>{data[key].phone}</p></li>
                        <li><p>{data[key].website}</p></li>
                        <li> Company :
                            <p>Name: {data[key].company.name}</p>
                            <p>CatchPhrase: {data[key].company.catchPhrase}</p>
                            <p>Bs: {data[key].company.bs}</p>
                        </li>
                        <hr></hr>
                            
                    </>
                    


                )
            })
        }
    }
    
    return (
        <>
        <ul>{renderData()}</ul>
        </>
    )
}

export default B;