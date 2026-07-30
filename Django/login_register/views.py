from django.shortcuts import render

# Create your views here.
from django.shortcuts  import render,redirect
from django.contrib.auth import  login,logout
from .forms import RegisterForm,LoginForm
from .models  import Login_Register
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST,request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.password = make_password(
                form.cleaned_data['password']
            )
            # mã hóa mật khẩu 
            user.save()
            return redirect('user_login')
    else:
        form = RegisterForm()
    return render(request,'register.html',{'form' :form})
from .models import Login_Register

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            try:
                user = Login_Register.objects.get(
                    email=email,
                )

                # Lưu thông tin vào session
                request.session['user_id'] = user.id
                request.session['name'] = user.name

                if check_password(password, user.password):

                    request.session['user_id'] = user.id
                    request.session['name'] = user.name

                    print("Đăng nhập thành công")


            except Login_Register.DoesNotExist:
                form.add_error(None, 'Email hoặc mật khẩu không đúng')
                # thử đoạn code có thể gây lỗi và fix lỗi

    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})

# logout
def custom_logout(request):
    logout(request)
    # xóa thông tin ss người dùng
    return redirect ('login')

# nếu models tự tạo thì phải tạo def riêng từng chức năng 
# 