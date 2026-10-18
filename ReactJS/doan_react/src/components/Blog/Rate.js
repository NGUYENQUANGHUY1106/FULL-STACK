import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import API from "../../Config/Api";

function Rate(props) {
    const [rating, setRating] = useState(0);
    const [totalRate, setTotalRate] = useState(0);

    const blog_id = props.blogId;

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // Lấy điểm trung bình khi vào trang
    useEffect(() => {
        API.get(`blog/rate/${blog_id}`)
            .then((response) => {
                const rates = response.data.data || [];

                let total = 0;

                Object.keys(rates).forEach((key) => {
                    total += Number(rates[key].rate);
                });

                const count = Object.keys(rates).length;

                const AvgRate = count > 0
                    ? Math.round(total / count)
                    : 0;

                setTotalRate(AvgRate);
                setRating(0);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [blog_id]);

    // Xử lý khi người dùng chọn sao
    const handleRating = (rate) => {
        if (!user || !token) {
            alert("Vui lòng đăng nhập để đánh giá");
            return;
        }

        const data_rate = {
            user_id: user.id,
            blog_id: blog_id,
            rate: rate
        };

        API.post(`blog/rate/${blog_id}`, data_rate, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json"
            }
        })
        .then((response) => {
            if (response.data.status === 200) {
                setRating(rate);
                alert("Đánh giá thành công");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center"
        }}>
            <Rating
                key={`${blog_id}-${rating || totalRate}`}
                onClick={handleRating}
                initialValue={rating || totalRate}
                size={35}
                fillColor="gold"
                emptyColor="gray"
            />

            <p>Rate: {rating || totalRate}</p>
        </div>
    );
}

export default Rate;