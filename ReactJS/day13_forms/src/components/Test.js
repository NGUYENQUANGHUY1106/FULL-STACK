import { useState } from "react"

function Test(props)
{
    const [getInput , setInput] = useState('')
    const [errE , setErrE] = useState('')

    function handleInput(e)
    {
        setInput(e.target.value)
        // lấy giá trị input và set vào state
    }

    function handleSubmit(e)
    {
        e.preventDefault()

        if(getInput === "")
        {
            setErrE("Nhập Input")
            // kiểm tra xem input có rỗng hay không, nếu rỗng thì setErrE("Nhập Input")
        }
        else
        {
            setErrE("")
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" value={getInput} onChange={handleInput} />
            <p>{errE}</p>

            <button type="submit">Click</button>

        </form>
        </>
    )
}
export default Test