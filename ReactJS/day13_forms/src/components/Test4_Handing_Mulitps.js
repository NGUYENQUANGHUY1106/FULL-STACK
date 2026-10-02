import { useState } from "react";
// dùng để xử lý nhiều input trong form
function Test4_Handing_Mulitps() {
  const [isGoing, setIsGoing] = useState(true);
  const [guest, setGuest] = useState(2);
  // guest = 2

  function renderList(e) {
    const target = e.target;
    // target là chính là input mà mình đang thao tác
    // console.log(target);
    

    if (target.type === "checkbox") {
      setIsGoing(target.checked);
    //   thay đổi trạng thái của isGoing dựa vào giá trị checked của checkbox
      
      
      // cập nhật trạng thái isGoing khi checkbox được click
    } else {
      setGuest(target.value);
    }
  }

  return (
    <>
      <form>
        <label>
          <input
            name="isGoing"
            type="checkbox"
            checked={isGoing}
            onChange={renderList}
          />
          <p>{isGoing ? "Yes" : "No"}</p>
          {/* nếu Isgoing  = true thì hiển thị "Yes", ngược lại hiển thị "No" */}
        </label>
        <label>
          <input
            name="guest"
            type="number"
            value={guest}
            onChange={renderList}
          />
          <p>{guest}</p>
        </label>
      </form>
    </>
  );
}
export default Test4_Handing_Mulitps;
