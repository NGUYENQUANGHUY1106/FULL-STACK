import { useState } from "react";
import Comment from "./Comment";

const avatarUrl =
  "http://localhost/laravel8/laravel8/public/upload/user/avatar/";

function ListComment({ comments, blogId, onCommentAdded }) {
  const [replyId, setReplyId] = useState(null);

  function handleReply(itemId) {
    setReplyId((currentId) => (currentId === itemId ? null : itemId));
  }

  if (comments.length === 0) {
    return (
      <div className="comment-list">
        <p>Chưa có bình luận nào</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments
        .filter((item) => Number(item.id_comment) === 0)
        .map((item) => (
          <div className="comment-item" key={item.id}>
            <div className="comment-user">
              <img
                className="comment-avatar"
                src={avatarUrl + item.image_user}
                alt={item.name_user}
              />

              <strong>{item.name_user}</strong>
            </div>

            <div className="comment-content-row">
              <p className="comment-text">{item.comment}</p>

              <button
                className="comment-reply-button"
                type="button"
                onClick={() => handleReply(item.id)}
              >
                Reply
              </button>
            </div>

            {replyId === item.id && (
              <div className="reply-form-wrap">
                <Comment
                  blogId={blogId}
                  parentId={item.id}
                  onCommentAdded={onCommentAdded}
                  onSubmitted={() => setReplyId(null)}
                />
              </div>
            )}

            <div className="reply-list">
              {comments
                .filter(
                  (reply) => Number(reply.id_comment) === Number(item.id),
                )
                .map((reply) => (
                  <div className="reply-item" key={reply.id}>
                    <div className="reply-user">
                      <img
                        className="reply-avatar"
                        src={avatarUrl + reply.image_user}
                        alt={reply.name_user}
                      />

                      <strong>{reply.name_user}</strong>
                    </div>

                    <p className="reply-text">{reply.comment}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListComment;
