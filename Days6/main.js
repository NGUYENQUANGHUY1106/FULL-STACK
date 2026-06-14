// bải1
// var arr1 = [];
// for (var i = 1; i <= 10; i++) {
//     arr1.push(i);
// }
// console.log(arr1);
// var xx = JSON.stringify(arr1);
// localStorage.setItem("arr1",xx);
// bài 2
let glocal = localStorage.getItem("arr1");
var arr2 = [];
var arr3 = [];
if(glocal){
    let arr1 = JSON.parse(glocal);
    // console.log(arr1);
    arr1.map(function(value,key)
{
     if(value <10)
     {
        // console.log(value);

        
     }
     if(value <= 5)
     {
        arr2.push(value);
     }

     
})
console.log(arr2);
let find = arr1.filter(checkValue);
function checkValue(value)
{
   if(value <= 5)
   {
    arr3.push(value);
   }
}

console.log(arr3);

let arr3String = JSON.stringify(arr3);
localStorage.setItem("arr3",arr3String);
    
}
