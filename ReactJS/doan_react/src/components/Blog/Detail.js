import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../Config/Api";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  function handleNext() {
    const nextId = Number(id) + 1;
    navigate(`/blogdetails/${nextId}`);
  }

  function handlePrev() {
    const prevId = Number(id) - 1;
    navigate(`/blogdetails/${prevId}`);
  }

  function handleCommentAdded(savedComment) {
    setComments((currentComments) =>
      Number(savedComment.id_comment) === 0
        ? [savedComment, ...currentComments]
        : [...currentComments, savedComment],
    );
  }

  useEffect(() => {
    let active = true;

    setData(null);
    setComments([]);

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

      <Comment
        key={`comment-${id}`}
        blogId={id}
        onCommentAdded={handleCommentAdded}
      />

      <ListComment
        key={`list-comment-${id}`}
        comments={comments}
        blogId={id}
        onCommentAdded={handleCommentAdded}
      />

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

export default Detail;
