console.log("RATE JS ĐÃ LOAD");

const stars = document.querySelectorAll(".star");
const rating = document.querySelector(".rating");

if (rating) {

    const rateUrl = rating.dataset.rateUrl;
    const csrfToken = rating.dataset.csrfToken;

    stars.forEach(function (star) {

        star.addEventListener("click", function (event) {

            event.preventDefault();

            const rate = Number(
                this.dataset.rate
            );

            fetch(rateUrl, {

                method: "POST",

                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body: `rate=${rate}`

            })

            .then(function (response) {

                return response.json();

            })

            .then(function (data) {

                alert(data.message);

                if (data.success) {

                    stars.forEach(function (item) {

                        const itemRate = Number(
                            item.dataset.rate
                        );

                        const icon =
                            item.querySelector("i");

                        if (itemRate <= rate) {

                            icon.style.color =
                                "rgb(207, 179, 21)";

                        } else {

                            icon.style.color =
                                "#ccc";

                        }

                    });

                }

            })

            .catch(function (error) {

                console.error("Lỗi rate:", error);

            });

        });

    });

}