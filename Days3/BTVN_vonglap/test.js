// function demo (x,y)
// {
//     let sum = x +y ;
//     alert(sum)
// }
// demo(2,3);
// muốn gọi kết quả ra ngoài thì dùng return 
// bắt buộc phải tuyền tham số vào nếu chưa khai báo 
// function demo (x,y)
// {
//     let sum = x +y ;
//     return sum ;
// }

// let kq = demo(2,3);
// console.log(kq);

// hàm sự kiện 

{/* <body>
<h1>tạo 1 sự kiện onclick</h1>
<button onclick=demo(2,3,true)>tính tổng 1</button>
<button onclick=demo(5,5,false)>tính tông 2</button>

<script>
 function demo(x,y,z)
 {
//  let sum = x + y ;
//  console.log(sum);
//  console.log(z);
if(z == true)
{
    tong = x + y ;
    console.log(tong);
    
}
else
{
    tong = x *y ;
    console.log(tong);
    
}
 
 
 } */}
//  gọi hàm bên trong hàm  là một hàm  fuction  được gọi chạy bên trong 1 hàm khác 


// bài 1 

//    <!-- <h1>tạo 1 sự kiện onclick</h1>
//     <button onclick="demo(2, 3, true)">tính tổng 1</button>
//     <button onclick="demo(5, 5, false)">tính tông 2</button>
//     <h1>vdu về onchange : nghĩa là khi nhập dữ liệu vào input thì vào thayoi được gọi</h1>
//     <input type="text" name="" id="" onchange="thaydoi()">
//     <script>
      //  function demo(x,y,z)
      //  {
      // //  let sum = x + y ;
      // //  console.log(sum);
      // //  console.log(z);
      // if(z == true)
      // {
      //     tong = x + y ;
      //     console.log(tong);

      // }
      // else
      // {
      //     tong = x *y ;
      //     console.log(tong);

      // }

      //  }

      // hàm trong hàm
    //   function demo(x, y, z) {
    //     //  let sum = x + y ;
    //     //  console.log(sum);
    //     //  console.log(z);
    //     if (z == true) {
    //         tinhTong(x,y);
    //     } else {
    //         tinhTich(x,y);
    //     }
    //   }
    //   function tinhTong(x,y)
    //   {
    //     tong = x + y ;
    //     console.log(tong);
        
    //   }
    //   function tinhTich(x,y)
    //   {
    //     tich = x *y;
    //     console.log(tich);
        
    //   }
    // //   onchange
    // function thaydoi()
    // {
    //     console.log("1,2,3");
        
    // } --></script>