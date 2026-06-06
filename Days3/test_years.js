// Viết chương trình kiểm tra thế kỷ của một năm bất kỳ.

// Nếu năm < 1900 → in ra "thế kỷ 18"

// Ngược lại nếu năm từ 1900 đến 1999 → in ra "thế kỷ 19"

// Ngược lại nếu năm từ 2000 đến 2099 → in ra "thế kỷ 20"

// Ngược lại nếu năm từ 2100 trở đi → in ra "thế kỷ 21 trở lên

//  bài 1 :
// let years = prompt("Nhập năm bất kỳ: ");
// if (years <1900 && years >= 1800)
// {
//     console.log(years + "ở thế kỉ 18");
    
// }
// else if (years >= 1900  && years <= 1999)
// {
//     console.log(years + "ở thế kỉ 19");
    
// }
// else if (years >= 2000 && years <= 2099)
// {
//     console.log(years + "ở thế kỉ 20");
    
// }
// else
// {
//     console.log(years + "ở thế kỉ 21 ");
// }

// bài 2 :
let numbers_1 = prompt("Nhập số 1: ") ;
let numbers_2 = prompt("Nhập số 2: ") ;
let numbers_3 = prompt("Nhập số 3: ") ;
// console.log(numbers_1,numbers_2,numbers_3);


if(numbers_1 == 1 || numbers_2 == 1  || numbers_3 == 1)
{
    console.log("loại");
    
}
else if ( numbers_1 <5 || numbers_2 < 5 || numbers_3 < 5)
{
   console.log("yếu");
   
}
else 
{
    let sum = (parseInt(numbers_1) + parseInt(numbers_2) + parseInt(numbers_3)) /3 ;
    if (sum <  7)
    {
        console.log(" trung bình");
        
    }
    else if (sum >=7 && sum < 8)
    {
      console.log("khá");
      
    }
    else if (sum >= 8 && sum <= 10)
    {
        console.log("giỏi");
        
    }

}