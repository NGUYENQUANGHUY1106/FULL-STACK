function A_1(props)
{
   const  xx = props.user 
   console.log(xx);
   
    function data_render ()
    {
        if (xx)
            // object không có length
        {
            return (
                <div>
                    <p >ID : {xx.id}</p>
                    <p>Name : {xx.name}</p>
                    <p>Username : {xx.username}</p>
                    <p>Email : {xx.email}</p>
                    <ul>Address 
                        {
                            (Object.keys(xx.address).map((key,index) =>
                            {
                                // console.log(key,index);
                                // key là street và suite index là số thứ tự 0,1
                                
                                return (
                                    <li key = {key}> {key} : {xx.address[key]}</li>
                                )
                            }))
                        }

                    </ul>
                    <p>Phone : {xx.phone}</p>
                    <p>Website : {xx.website}</p>
                    <ul>Company
                      {
                         (Object.keys(xx.company).map((key,index) =>
                          <li key={key}>{key} : {xx.company[key]}</li>
                        ))
                      }
                    </ul> 

                </div>
            )
        }
    }
 return (
    <>
    {data_render()}
    </>
 )
}
export default A_1;