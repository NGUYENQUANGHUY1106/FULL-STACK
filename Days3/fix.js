// bài 1

// let color =   prompt("Vd: green");

// if (color == "màu xanh" || color == "Màu Xanh")
// {
//     console.log("Đây là màu xanh");
// }
// else if (color == "màu đỏ" || color == "Màu Đỏ")
// {
//     console.log("Đây là màu đỏ");
// }
// else if (color == "màu vàng" || color == "Màu Vàng")
// {
//     console.log("Đây là màu vàng");
// }
// else {
//     console.log("màu khác ")
// }

// Bài 2

// let  years = prompt("năm ?");
// if (years %2 ==0)
// {
//     console.log(years + " là năm chẵn")
// }
// else
// {
//     console.log(years + " là năm lẻ")
// }

//  bài 3
//  let years = prompt("năm ?");

//  if(years %4 == 0 ||  years % 400 == 0 && years % 100 != 0 )
//  {
//     console.log(years + " là năm nhuận");
//  }
//  else
//  {
//     console.log(years + "là năm không nhuận ");
    
//  }

//  bài 4 

let numbers = prompt("số ?");
if(numbers %2 == 0)
{
    if(numbers > 100)
    {
        console.log("Số chẵn lớn hơn 100");
        
    }
    else
    {
        console.log("Số chẳn và nhỏ hơn 100");
        
    }
}
else
{
    if(numbers > 100)
    {
        console.log("Số lẻ lớn hơn 100");
    }
    else
    {
        console.log("Số lẻ nhỏ hơn 100");
    }
}
