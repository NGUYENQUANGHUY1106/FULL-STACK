const stars = document.querySelectorAll('.star');
// lấy tất cả các ngôi sao
const rating = document.querySelector('.rating')
const rateUrl = rating.dataset.rateUrl;
const csrfToken = rating.dataset.csrfToken;

console.log("Số lượng sao:", stars.length);

stars.forEach(star => {

    star.addEventListener('click', function(event) {
        // thêm sự kiện click

        event.preventDefault();
        // ngăn chặn load trang

        const rate = Number(this.dataset.rate);
        // lấy số sao mà bạn clcik vào dựa và dataset-rate


        stars.forEach(item => {

            const itemRate = Number(item.dataset.rate);
            // lấy số sao có ở data-rate 1-> i
            const icon = item.querySelector('i');
            // tìm thẻ i nằm bên trong item

            if (itemRate <= rate) {

                icon.style.color = "rgb(207, 179, 21)";

            } else {

                icon.style.color = "#ccc";

            }

        });
        fetch(rateUrl,
            {
                method : "POST",
                headers : {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "application/x-www-form-urlencoded"
                },                 
                body : `rate=${rate}`
            }
        )
        .then(response =>response.json())
        // .json là được bên trong response rồi chuyển nó thành object js
        .then(data =>
            // data= response.json()
        {
            if(data.success)
                alert(data.message);
            else
            {
                alert(data.message)
            }
            
        }
        )

    });

});