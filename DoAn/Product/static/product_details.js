document.addEventListener("DOMContentLoaded", function () {

    const mainImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail-image");
    const zoomButton = document.getElementById("zoom-button");

    thumbnails.forEach(function (thumbnail) {

        thumbnail.addEventListener("click", function () {

            mainImage.src = this.src;

        });

    });


    zoomButton.addEventListener("click", function (event) {

        event.stopPropagation();
        // không cho sự kiện lan ra các phần tử bên ngoài 

        mainImage.classList.add("zoom-active");

    });


    mainImage.addEventListener("click", function (event) {

        event.stopPropagation();

    });


    document.addEventListener("click", function () {
        // nếu click ra ngoài ảnh thì thu ảnh lại 
        

        mainImage.classList.remove("zoom-active");

    });

});