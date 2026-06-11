const h1 = document.getElementById("box");

function hamHide()
{
    h1.style.display = "none"
}
function hamShow()
{
    h1.style.display = "block";
}
function hamAddClass()
{
    h1.classList.add("active")
}
function hamRemoveClass()
{
    h1.classList.remove("active");
}
let checkClass = h1.classList.contains("active");
console.log(checkClass);

if(checkClass ==true)
{
    console.log("có class active");
    hamShow();
    hamRemoveClass();
    
}
else
{
    console.log("ko có class active");
    hamHide();
    hamAddClass();
    
}
let elements = document.querySelectorAll("li");

let elements1 =document.querySelector("div.abc");

elements.forEach(function(item)
{
   item.addEventListener("click",function()
{
    item.classList.add("active");
})
})