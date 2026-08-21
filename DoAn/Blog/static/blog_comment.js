document.addEventListener("DOMContentLoaded", function () {

    const commentForm = document.getElementById("comment-form");

    if (commentForm) {

        commentForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const formData = new FormData(commentForm);

            fetch(commentForm.action, {
                method: "POST",
                body: formData
            })

            .then(response => response.json())

            .then(data => {

                if (data.success) {

                    alert(data.message);

                    // Reload lại trang
                    location.reload();

                } else {

                    alert(data.message);

                }

            })

            .catch(error => {

                console.error(error);

                alert("Có lỗi xảy ra");

            });

        });

    }


// phản hồi

    const replyButtons =
        document.querySelectorAll(".reply-btn");


    replyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Lấy ID comment cha
            const commentId =
                button.dataset.commentId;
                // lấy id khi nguoif dùng click vào reply


            // Lấy form reply tương ứng với cmt muốn reply
            const replyForm =
                document.getElementById(
                    "reply-form-" + commentId
                );


            if (replyForm.style.display === "none") {

                replyForm.style.display = "block";
                // hiển thị form phản hồi đó lên

            } else {

                replyForm.style.display = "none";

            }

        });

    });


//   reply


    const replyForms =
        document.querySelectorAll(".reply-form");


    replyForms.forEach(function (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();
            // ngăn chặn load trang


            // Lấy comment cha
            const parentId =
                form.dataset.parentId;
                // lấy id của thk cmt cha 


            // Lấy URL từ form comment chính
            const action =
                commentForm.action;


            // Tạo dữ liệu gửi lên
            const formData = new FormData(form);
            // lấy dữ liệu ở form lưu vào FormData


            // thêm parent_id
            formData.append(
                "parent_id",
                parentId
            );


            fetch(action, {

                method: "POST",

                body: formData

            })
            // gửi dữ liệu lên bằng ajax

            .then(response => response.json())

            .then(data => {

                if (data.success) {

                    alert(data.message);

                    // Reload trang
                    location.reload();

                } else {

                    alert(data.message);

                }

            })

            .catch(error => {

                console.error(error);

                alert("Có lỗi xảy ra");

            });

        });

    });

});