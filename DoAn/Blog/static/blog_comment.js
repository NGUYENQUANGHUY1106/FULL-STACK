document.addEventListener("DOMContentLoaded", function () {
const comment_form = document.getElementById('comment-form')
const csrfToken = document.querySelector(
        '[name="csrfmiddlewaretoken"]'
    ).value;

    // tạo hàm để trả ra HTML 
function createComment(comment) {
    return `
        <div
            class="list_comment"
            id="comment-${comment.id}"
            style="margin-top: 20px; padding: 10px"
        >

            <div
             style="display: flex; align-items: center; gap: 5px"
             class="comment-user">

                ${
                    comment.avatar_user
                    ? `
                        <img
                            class="comment-avatar"
                            src="${comment.avatar_user}"
                            alt="avatar"
                            style="width: 30px; height: 30px; border-radius: 50%"
                        >
                    `
                    : ``
                }

                <strong>${comment.name_user}</strong>

            </div>

            <p class="comment-text">
                ${comment.cmt}
            </p>

            <button
                type="button"
                class="reply-btn"
                data-comment-id="${comment.id}"
            >
                Phản hồi
            </button>

            <div
                class="reply-form-container"
                id="reply-form-${comment.id}"
                style="display:none;"
            >
                <form
                    class="reply-form"
                    data-parent-id="${comment.id}"
                    action="${comment_form.action}"
                    method="POST"
                >

                    <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value="${csrfToken}"
                    >

                    <input
                        type="text"
                        name="cmt"
                        placeholder="Nhập phản hồi..."
                        required
                    >

                    <button type="submit">
                        Gửi
                    </button>

                </form>
            </div>

            <div
                class="reply-list"
                id="reply-list-${comment.id}"
            ></div>

        </div>
    `;
}



//  tạo HTML comment cho cmt con 
function createCommentReply(comment) {
    return `
        <div
            class="child-comment"
            id="comment-${comment.id}"
            style="
              margin-left: 40px;
              margin-top: 15px;
              padding-left: 10px;
              border-left: 2px solid #ddd;
            "
        >

            <div class="reply-user" style="display: flex; align-items: center; gap: 8px;">

                ${
                    comment.avatar_user
                    ? `
                        <img
                            class="reply-avatar"
                            src="${comment.avatar_user}"
                            alt="avatar"
                            style="width: 30px !important; height: 30px !important; border-radius: 50% !important; object-fit: cover !important;"
                        >
                    `
                    : ``
                }

                <strong>${comment.name_user}</strong>

            </div>

            <p class="reply-text" style="margin-top: 4px; margin-left: 38px;">
                ${comment.cmt}
            </p>

        </div>
    `;
}
//  bắt sự kiện khi cmt cha bình luận 

if(comment_form)
{
  comment_form.addEventListener(
    "submit", function(e)
    {
      e.preventDefault()

      const formData = new FormData(
        comment_form
      )

      fetch(
        comment_form.action,
        {
          method : "POST",
          body :  formData
        }
        // gửi dữ liệu khi người dùng nhấn vào nút submit sẽ lấy cmt của người dùng để gửi lên
      )
      .then(response => response.json())
      .then(data =>
      {
        if(data.success)
        {
          console.log(data);

          const  comment_list = document.getElementById('comment-list')


          // gọi đến hàm  để tạo comment mới 
          const commentHTML  = createComment(

            data.comment
          )

          comment_list.insertAdjacentHTML(
            "afterbegin",
            commentHTML
          );
          
          comment_form.reset()

          
        }
        else
        {
          alert(data.message)
        }
      })
      .catch(error =>
      {
        console.error(error)
        alert("Lỗi")
      }
      )
    }
  )

}

// reply
document.addEventListener(
  "click", function(e)
  {
    if(e.target.classList.contains("reply-btn"))
    {
       
    
    // kiểm tra xem nút vừa click có class là reply-btn k 
    const button = e.target
    // lấy phần tử mà người dùng đó vừa click vào 

    // lấy id của thk bạn muốn phản hồi 
    const comment_ID = button.dataset.commentId

    const replyForm = document.getElementById
    (
      "reply-form-"  + comment_ID
    )
    if (replyForm.style.display === 'none' || replyForm.style.display === '')
    {
      replyForm.style.display = 'block'
    }
    else
    {
      replyForm.style.display = 'none'

    }
  }
}
)
// gửi reply 
document.addEventListener(
  "submit" , function(e)
  {
    if (!e.target.classList.contains("reply-form"))
    {
      return
    }
    e.preventDefault()

    const form = e.target;


    // lấy id của comment cha

    const parentId = form.dataset.parentId;

    const formData = new FormData(form)
    //  lấy dữ liệu mà form vừa nhấn submit

    formData.append(
      "parent_id" , parentId
    )

    fetch(
       comment_form.action,
       {
        method: 'POST',
        body : formData
       }
    )
    .then(response => response.json())
    .then(data =>
    {
      if (data.success)
      {
        console.log(data);

        const replyList = document.getElementById("reply-list-" + parentId)
        
        const replyHTML = createCommentReply(
          data.comment
        )

        replyList.insertAdjacentHTML(
          "beforeend",
          replyHTML
        );

        form.reset()

        form.style.display = "none"
      }
      else
      {
        alert(data.message)
      }
    }).catch(error =>
    {
      console.error(error)
      alert('lỗi');
    });
  });
  });