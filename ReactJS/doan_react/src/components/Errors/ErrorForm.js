function ErrorForm(props)
{
    let {errors} = props

    function renderErrors()
    {
        if(Object.keys(errors).length >0)
        {
            return Object.keys(errors).map((key,index) =>
                {
                    return (
                        <>
                        <li key={key} >{errors[key]}</li>
                        
                        </>
                    )
                })
        }
    }
    return(
        <>
        {renderErrors()}
        </>
    )
}
export default  ErrorForm