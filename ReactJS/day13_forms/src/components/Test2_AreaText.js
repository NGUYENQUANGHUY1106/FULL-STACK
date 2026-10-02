import { useState } from "react";

function Test2_AreaText(props) {
  const [content, setContent] = useState("");
  const [err, setErr] = useState("");

  function handleChange(e) {
    setContent(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // ngăn chặn reload lại trang

    if (content === "") {
      setErr("Vui lòng nhập nội dung");
    } else {
      setErr("");
    }
  }
  return (
    <>
     <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange}>{content}</textarea>
    
        <p>{content}</p>
        <p>
            {err}
        </p>
        <button type="submit">Submit</button>


     </form>
    </>
  )
  
}

export default Test2_AreaText;
