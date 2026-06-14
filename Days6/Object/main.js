let obb1 ={};
obb1['xx'] = "ok";
obb1.yy = "ok2";

console.log(obb1);
console.log(Object.keys(obb1).length);

if(Object.keys(obb1).length > 0){
    console.log("có");
}
console.log(obb1['yy']);


// mapp
// Object.values(obb1).map(function(value,index)
// {
//     console.log(index);
//     console.log(value);
    
    
// })
Object.keys(obb1).map(function(keys,index)
{
    // console.log(index);
    console.log(keys); // trả về key cha
    console.log(obb1[keys]); // trả về value của key cha
    
    
})
// index để trả về  các só tự tự  key trong mảng 
// dùng forr để duyệt  nhưu sau 
 for(let key in obb1)
    {
      console.log(key + ": " +obb1[key]);
      
    }
    