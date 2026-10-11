import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login", { replace: true });
    //   replace thay thấy login
    }
  }, [user, navigate]);
//   chạy lại nếu user haowjc navigate thay đổi

  if (!user || !user.id) {
    return null;
  }

  return (
    <div>
      <h2>Account</h2>
      <p>Xin chào, {user.name}</p>
    </div>
  );
}

export default Account;