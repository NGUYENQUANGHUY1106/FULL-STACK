let objcon = {};
function addToCart(btn)
{
    let  product = btn.closest(".product");
    console.log(product);
    
    let price = product.querySelector(".price");
    let image = product.querySelector("img");
    let info = product.querySelector(".info");
    let id = product.dataset.id;
    
    
    objcon = { 
        'img' : image.src,
        'price' : price.innerText,
        'info' : info.innerText,
        'qty' : 1
    }
    
 let objCha = JSON.parse(localStorage.getItem("newProduct")) || {};
    if(objCha[id])
    {
        objCha[id].qty ++;
        
    }
    else
    {
        objCha[id] = objcon;
    }
    console.log(objCha);
    
    localStorage.setItem("newProduct", JSON.stringify(objCha));
    
}