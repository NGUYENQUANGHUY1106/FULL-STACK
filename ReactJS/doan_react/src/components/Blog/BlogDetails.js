
import { useParams ,useNavigate } from "react-router-dom";
// useParams giúp lấy ví dụ như /blogdetails/:id thì nó sẽ lấy id
// useNavigate() được sử dụng để chuyển sang URL khác bằng JavaScript.
import { useEffect, useState } from "react";
import axios from "axios";

function BlogDetails() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [rating, setRating] = useState(5);
    const navigate = useNavigate ()

    function handleNext()
    {
        const nextId = Number(id) + 1;
         navigate(`/blogdetails/${nextId}`);
    }
        function handlePrev()
    {
        const prevId = Number(id) - 1;
         navigate(`/blogdetails/${prevId}`);
    }

    useEffect(() => {
        axios
            .get(`http://localhost/laravel8/laravel8/public/api/blog/detail/${id}`)
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [id]);

    function renderData() {
        if (!data) {
            return <p>Đang tải...</p>;
        }

        return (
            <div className="blog-details-page">

                <h3 className="blog-details-title">
                    {data.title}
                </h3>

                <div className="blog-details-info">

                    <div className="blog-details-meta">

                        <div className="blog-details-meta-item">
                            <span className="blog-details-icon">♟</span>
                            <span className="blog-details-meta-text">
                                Mac Doe
                            </span>
                        </div>

                        <div className="blog-details-meta-item">
                            <span className="blog-details-icon">◷</span>
                            <span className="blog-details-meta-text">
                                1:33 pm
                            </span>
                        </div>

                        <div className="blog-details-meta-item">
                            <span className="blog-details-icon">▦</span>
                            <span className="blog-details-meta-text">
                                DEC 5, 2013
                            </span>
                        </div>

                    </div>

                    <div className="blog-details-rating">
                        {[1, 2, 3, 4, 5].map((star) => {
                            return (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={
                                        star <= rating
                                            ? "blog-details-star active"
                                            : "blog-details-star"
                                    }
                                >
                                    ★
                                </span>
                            );
                        })}
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

                <div className="blog-details-navigation">
                    <button className="blog-details-btn-prev" onClick={handlePrev} disabled={Number(id) <=1}>
                        PRE
                    </button>

                    <button className="blog-details-btn-next" onClick={handleNext}>
                        NEXT
                    </button>
                </div>

            </div>
        );
    }

    return (
        <>
            {renderData()}
        </>
    );
}

export default BlogDetails;
