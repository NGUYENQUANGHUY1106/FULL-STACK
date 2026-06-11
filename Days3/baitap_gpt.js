// bài 1 
let sum  = 0;
for(let i =1 ;i <=10;i++)
{
   sum = i *5 ;
   console.log(`5 * ${i} = ${sum}`);
}
/**
 * bài 2 
 */
let count = 0 ;
for (let i = 0 ;i<=100 ;i++)
{
    if (i%2 ==0)
    {
        count++;
    }
}
console.log(count);
// bài 3 for  of
let sum1= 0
let numbers = [1,2,3,4,5];
for (let item of numbers)
{
    console.log(item);
    sum1 += item;
}
console.log(sum1);
//  tìm số lớn nhất trong mảng
let numbersMax = [7,3,6,12,5,7];
let max = numbersMax[0];
console.log(max);
for(let item of numbersMax)
{
    if(item > max)
    {
        max = item;
    }
}
console.log(max);
// bài 5 
let count1 = 0 ;
let numbersOdd = [3, 5, 6, 9, 12, 14];

for(let item of numbersOdd)
{
    if(item % 2!=0)
    {
      count1 ++ ;
    }
}
console.log(count1);
// bài 6 
let arr = [1,2,3,4];
let newArr = []
for (let item of arr)
{
    newArr.push(item * 2);
}
console.log(newArr);
// for in 
let student = {
    name: "Huy",
    age: 20,
    major: "CNTT"
};
for ( let key in student)
{
    console.log(key);
    
}
for (let key in student)
{
    console.log(student[key]);  
}
let scores = {
    math: 8,
    physics: 7,
    english: 9
};

let totalScore = 0 ;
for(let key in scores)
{
   totalScore += scores[key];
}
console.log(totalScore);

