let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let emailSN = document.getElementById("email");
let passwordSN = document.getElementById("password");
let errEmailSN = document.getElementById("errEmailSN");
let errPasswordSN = document.getElementById("errPasswordSN");
// register
let email_register = document.getElementById("email_register");
let password_register = document.getElementById("password_register");
let password_register_confirm = document.getElementById(
  "password_register_confirm",
);
let err_email_rgt = document.getElementById("err_email_rgt");
let err_pw_rgt = document.getElementById("err_pw_rgt");
let err_cf_rgt = document.getElementById("err_cf_rgt");
let newEmail = localStorage.getItem("email") || "";
let newPassword = localStorage.getItem("password") || "";

form2.addEventListener("submit", function (e) {
  let value_email_register = email_register.value;
  let value_password_register = password_register.value;
  let value_password_register_confirm = password_register_confirm.value;
  let cf_pass_word_rgt = "";
  let err = false;
  err_email_rgt.textContent = "";
  err_pw_rgt.textContent = "";
  err_cf_rgt.textContent = "";
  errEmailSN.textContent = "";
  errPasswordSN.textContent = "";

  console.log(newEmail, newPassword);

  if (value_email_register == "") {
    e.preventDefault();
    err_email_rgt.textContent = "Vui lòng nhập email";
    err = true;
  }
  if (value_password_register == "") {
    e.preventDefault();
    err_pw_rgt.textContent = "Vui lòng nhập nhập mật khẩu";
    err = true;
  } else {
    cf_pass_word_rgt = value_password_register_confirm;
  }
  if (value_password_register_confirm == "") {
    e.preventDefault();
    err_cf_rgt.textContent = "Vui lòng nhập lại mẩu khẩu";
    err = true;
  }
  if (!err) {
    // console.log(cf_pass_word_rgt);

    if (value_password_register === cf_pass_word_rgt) {
      alert("đăng ký thành công");
      newEmail = value_email_register;
      newPassword = value_password_register;

      localStorage.setItem("email", newEmail);
      localStorage.setItem("password", newPassword);
    } else {
      alert("Mật khẩu chưa đúng");
      e.preventDefault();
    }
  }
});
function Signin(e) {
  let value_emailSN = emailSN.value;
  let value_passwordSN = passwordSN.value;
  e.preventDefault();
  if (value_emailSN === "") {
    errEmailSN.textContent = "Vui lòng nhập Email";
  }
  if (value_passwordSN === "") {
    errPasswordSN.textContent = "Vui lòng nhập mật khẩu";
  }
  if (value_emailSN != newEmail || value_passwordSN != newPassword) {
    alert("Email hoặc password sai");
  } else {
    alert("Đăng nhập thành công");
  }
}
