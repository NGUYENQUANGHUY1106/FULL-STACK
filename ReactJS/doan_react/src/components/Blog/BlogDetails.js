import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../Config/Api";
import ErrorForm from "../Errors/ErrorForm";
import Rate from "./Rate";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [replyComment, setReplyComment] = useState("");
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState({});
  const [replyId, setReplyId] = useState(null);

  // Chuyển sang bài blog tiếp theo
  function handleNext() {
    const nextId = Number(id) + 1;
    navigate(`/blogdetails/${nextId}`);
  }

  // Quay về bài blog trước đó
  function handlePrev() {
    const prevId = Number(id) - 1;
    navigate(`/blogdetails/${prevId}`);
  }

  // Xử lý nhập bình luận
  function handleInput(e) {
    setComment(e.target.value);
  }

  // Gửi bình luận và phản hồi
  async function handleSubmitComment(e, parentId = 0) {
    e.preventDefault();

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

    const content = parentId === 0 ? comment : replyComment;

    if (content.trim() === "") {
      setErr({
        [parentId === 0 ? "comment" : "reply"]:
          parentId === 0 ? "Vui lòng nhập bình luận" : "Vui lòng nhập phản hồi",
      });
      return;
    }

    const commentData = {
      id_blog: id,
      id_user: user.id,
      id_comment: parentId,
      comment: content.trim(),
      image_user: user.avatar,
      name_user: user.name,
    };

    try {
      const response = await API.post(`blog/comment/${id}`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.status === 200) {
        const savedComment = response.data.data;

        // Cập nhật danh sách bình luận
        setComments((prevComments) =>
          parentId === 0
            ? [savedComment, ...prevComments]
            : [...prevComments, savedComment],
        );

        if (parentId === 0) {
          setComment("");
        } else {
          setReplyComment("");
          setReplyId(null);
        }

        setErr({});
      }
    } catch (error) {
      console.error(error);

      setErr({
        [parentId === 0 ? "comment" : "reply"]:
          error.response?.data?.message || "Không thể gửi bình luận",
      });
    }
  }

  // Lấy dữ liệu blog khi vào trang hoặc thay đổi ID
  useEffect(() => {
    let active = true;

    setData(null);
    setComments([]);
    setComment("");
    setReplyComment("");
    setReplyId(null);
    setErr({});

    API.get(`blog/detail/${id}`)
      .then((response) => {
        if (!active) return;

        setData(response.data.data);
        setComments(response.data.data.comment || []);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (!data) {
    return <p>Đang tải dữ liệu blog...</p>;
  }

  return (
    <div className="blog-details-page">
      <h3 className="blog-details-title">{data.title}</h3>

      <div className="blog-details-info">
        <div className="blog-details-meta">
          <div className="blog-details-meta-item">
            <span className="blog-details-icon">♟</span>
            <span className="blog-details-meta-text">Mac Doe</span>
          </div>

          <div className="blog-details-meta-item">
            <span className="blog-details-icon">◷</span>
            <span className="blog-details-meta-text">1:33 pm</span>
          </div>

          <div className="blog-details-meta-item">
            <span className="blog-details-icon">▦</span>
            <span className="blog-details-meta-text">DEC 5, 2013</span>
          </div>
        </div>

        <div className="blog-details-rating">
          <Rate key={id} blogId={id} />
        </div>
      </div>

      <div className="blog-details-image">
        <img
          src={
            "http://localhost/laravel8/laravel8/public/upload/Blog/image/" +
            data.image
          }
          alt="Blog"
        />
      </div>

      <div className="blog-details-description">
        <h2>{data.title}</h2>
      </div>

      <div className="comment">
        <ErrorForm errors={err} />

        <form onSubmit={(e) => handleSubmitComment(e, 0)}>
          <label>Comment:</label>

          <input
            value={comment}
            onChange={handleInput}
            type="text"
            name="comment"
          />

          <button type="submit">Đăng bình luận</button>
        </form>
      </div>

      <div className="comment-list">
        {comments.length === 0 ? (
          <p>Chưa có bình luận nào</p>
        ) : (
          comments
            .filter((item) => Number(item.id_comment) === 0)
            .map((item) => (
              <div
                className="comment-item"
                key={item.id}
                style={{
                  textAlign: "left",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "100%",
                    }}
                    src={
                      "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
                      item.image_user
                    }
                    alt={item.name_user}
                  />

                  <strong>{item.name_user}</strong>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <p style={{ margin: "10px 0 0 0" }}>{item.comment}</p>

                  {/* NÚT REPLY */}
                  {Number(item.id_comment) === 0 && (
                    <button
                      type="button"
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        if (replyId === item.id) {
                          setReplyId(null);
                          setReplyComment("");
                        } else {
                          setReplyId(item.id);
                          setReplyComment("");
                          setErr({});
                        }
                      }}
                    >
                      Reply
                    </button>
                  )}
                </div>

                {/* FORM PHẢN HỒI */}
                {replyId === item.id && (
                  <form
                    onSubmit={(e) => handleSubmitComment(e, item.id)}
                    style={{ marginTop: "10px" }}
                  >
                    <label>Reply:</label>

                    <input
                      value={replyComment}
                      onChange={(e) => setReplyComment(e.target.value)}
                      type="text"
                      name="reply"
                    />

                    <button type="submit">Phản hồi</button>
                  </form>
                )}

                {/* DANH SÁCH PHẢN HỒI */}
                <div className="reply-list" style={{ marginLeft: "45px" }}>
                  {comments
                    .filter(
                      (reply) => Number(reply.id_comment) === Number(item.id),
                    )
                    .map((reply) => (
                      <div
                        className="reply-item"
                        key={reply.id}
                        style={{ marginTop: "12px" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "100%",
                            }}
                            src={
                              "http://localhost/laravel8/laravel8/public/upload/user/avatar/" +
                              reply.image_user
                            }
                            alt={reply.name_user}
                          />

                          <strong>{reply.name_user}</strong>
                        </div>

                        <p
                          style={{
                            margin: "6px 0 0 40px",
                          }}
                        >
                          {reply.comment}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))
        )}
      </div>

      {/* ĐIỀU HƯỚNG BLOG */}
      <div className="blog-details-navigation">
        <button
          className="blog-details-btn-prev"
          onClick={handlePrev}
          disabled={Number(id) <= 1}
        >
          PRE
        </button>

        <button className="blog-details-btn-next" onClick={handleNext}>
          NEXT
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
