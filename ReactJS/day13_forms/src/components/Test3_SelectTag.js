import { useState } from "react";

function Test3_SelectTag() {
    const [getInput,setInput] = useState("")
    const [err,setErr]  = useState("")

    function handleInput(e)
    {
        setInput(e.target.value)
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        if(getInput === "")
        {
            setErr ("Vui lòng chọn 1 giá trị")
        }
        else{
            setErr("")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} >

                <select value={getInput} onChange={handleInput} >
                    <option value="">--Chọn--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                </select>

                <p>{err}</p>
                <p>Giá trị được chọn: {getInput}</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default Test3_SelectTag;