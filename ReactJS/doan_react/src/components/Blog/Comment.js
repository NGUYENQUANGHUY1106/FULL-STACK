import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Config/Api";
import ErrorForm from "../Errors/ErrorForm";

function Comment({ blogId, parentId = 0, onCommentAdded, onSubmitted }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [err, setErr] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !user.id) {
      alert("Vui lòng đăng nhập để bình luận");
      navigate("/login");
      return;
    }

    if (!token) {
      setErr({
        comment: "Phiên đăng nhập không tồn tại",
      });
      return;
    }

    if (content.trim() === "") {
      setErr({
        [parentId === 0 ? "comment" : "reply"]:
          parentId === 0
            ? "Vui lòng nhập bình luận"
            : "Vui lòng nhập phản hồi",
      });
      return;
    }

    const commentData = {
      id_blog: blogId,
      id_user: user.id,
      id_comment: parentId,
      comment: content.trim(),
      image_user: user.avatar,
      name_user: user.name,
    };

    try {
      const response = await API.post(`blog/comment/${blogId}`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.status === 200) {
        onCommentAdded(response.data.data);
        setContent("");
        setErr({});

        if (onSubmitted) {
          onSubmitted();
        }
      }
    } catch (error) {
      console.error(error);
      setErr({
        [parentId === 0 ? "comment" : "reply"]:
          error.response?.data?.message || "Không thể gửi bình luận",
      });
    }
  }

  return (
    <div className="comment comment-form-section">
      <ErrorForm errors={err} />

      <form className="comment-form" onSubmit={handleSubmit}>
        <label className="comment-form-label">
          {parentId === 0 ? "Comment:" : "Reply:"}
        </label>

        <input
          className="comment-form-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          name={parentId === 0 ? "comment" : "reply"}
        />

        <button className="comment-form-submit" type="submit">
          {parentId === 0 ? "Đăng bình luận" : "Phản hồi"}
        </button>
      </form>
    </div>
  );
}

export default Comment;
