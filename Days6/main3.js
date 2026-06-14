let glocal = localStorage.getItem("arr1");
let arr4 = [11,12,13,14,15,16,17,18,19,20];
let sum = 0 ;
if (glocal) {
    let arr1 = JSON.parse(glocal);
    console.log(arr1);
    const arrNew = arr1.concat(arr4);
    console.log(arrNew);

    arrNew.map(function(value,key)
{
    sum += value;
})
alert(sum);
}
else
{
    alert("không có dữ liệu ")
}