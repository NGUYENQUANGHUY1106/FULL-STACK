import prompt from 'prompt';

// cấu trúc  for (let item of numbers) ; lấy các phần tử của mảng 
//  member : là tên của mảng 
// item là lần lượt các giá trị bên trong của mảng 
//  for in  dùng để lặp qua các  key , value  trong object 
//  map tuowngt ự như forr 
//  cú pháp  khai báo mảng number 
//  numbers.map = [1,2,3,4];
// number.map((item) =>
// {
//     console.log(item);}
// object : là một kiểu dữ liệu trong JavaScript, nó cho phép chúng ta lưu trữ và quản lý dữ liệu theo dạng cặp key-value. Mỗi key trong object là một chuỗi (string) hoặc một symbol, và mỗi value có thể là bất kỳ kiểu dữ liệu nào, bao gồm cả các object khác. Object thường được sử dụng để đại diện cho các thực thể phức tạp, như người dùng, sản phẩm, hoặc bất kỳ đối tượng nào mà chúng ta muốn mô tả bằng cách sử dụng các thuộc tính và giá trị.
// Object.entries() là giúp chuyển đổi một object thành một cặp key và value 
// - dung for in ra cac so tu 1-10
// - dung for in ra cac so le tu 1-10
// - dung for duyệt qua các số tư 1-10 va in ra các số < 5
// - dung for duyệt qua các số tư 1-10 va in ra số 6
// - dung for tinh tong tu 1-10
// - dung for tinh tong theo cong thuc : s = 1 + 1/n , n la số tự nhiên bất kỳ.
// - cho 3 số tự nhien, viet hàm tìm số lớn nhất : dung if else

    
// bai 1 :
for (let i = 1 ; i <=10; i++)
{
   console.log(i);
   
}
// bài 2
for (let i =0 ; i <= 10 ; i++)
{
    if(i%2 !=0)
    {
        console.log(i);
        
    }
}
// bài 3
for (let i = 0 ; i<=10 ;i++)
{
    if(i<5)
    {
        console.log(i);
        
    }
}
// bài 4 
for (let i = 0 ; i<=10 ;i++)
{
    if (i=== 6)
    {
        console.log(i);
    }
}
// bài 5 
let sum =  0 ;
for (let i =0 ; i<= 10 ;i++)
{
    sum+=i;
}
console.log(sum);
// bài 6
let number = prompt('nhập số tự nhiên bất kỳ');
let sum1 = 0 ;
for(let i = 0 ;i<= 10;i++)
{
    sum1 += 1+1/number;
}
console.log(sum1);

// bài 7
let a = prompt('nhập số thứ nhất');
let b = prompt('nhập số thứ hai');
let c = prompt('nhập số thứ ba');
function SLN(a,b,c)
{
    if(a>b && a>c)
    {
        console.log('số lớn nhất là ' + a);
    }
    else if(b>a && b>c)
    {
        console.log('số lớn nhất là ' + b);
    }
    else
    {
        console.log('số lớn nhất là ' + c);
    }
}
SLN(a,b,c);