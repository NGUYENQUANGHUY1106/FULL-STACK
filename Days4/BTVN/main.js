let nameInput = document.getElementById("name");
let addressEmailInput = document.getElementById("addressEmail");
let phoneInput = document.getElementById("phone");
let newAddressInput = document.getElementById("newAddress");
let contentInput = document.getElementById("content");
let nameErr = document.getElementById("errName");
let addressEmailErr = document.getElementById("addressEmailErr");
let phoneErr = document.getElementById("errPhone");
let newAddressErr = document.getElementById("errNewAddress");
let contentErr = document.getElementById("errContent");

let form = document.getElementById("contact");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  nameErr.textContent = "";
  addressEmailErr.textContent = "";
  phoneErr.textContent = "";
  newAddressErr.textContent = "";
  contentErr.textContent = "";
  let err = false;

  name = nameInput.value;
  addressEmail = addressEmailInput.value;
  phone = phoneInput.value;
  newAddress = newAddressInput.value;
  content = contentInput.value;

  if (name === "") {
    nameErr.textContent = "Vui lòng điền tên";
    err = true ;
  }
  if (addressEmail === "") {
    addressEmailErr.textContent = "Vui lòng điền địa chỉ";
        err = true ;

  }
  if (phone === "") {
    phoneErr.textContent = "Vui lòng điền số điện thoại";
        err = true ;

  }
  if (newAddress === "") {
    newAddressErr.textContent = "Vui lòng điền địa chỉ mới";
        err = true ;

  }
  if (content === "") {
    contentErr.textContent = "Vui lòng điền nội dung";
        err = true ;

  } if(!err) {
    alert("login thanh công");
    form.submit();
  }
});
