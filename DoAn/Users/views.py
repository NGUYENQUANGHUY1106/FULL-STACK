from django.shortcuts import render,redirect
from .forms import RegisterForm
from django.contrib.auth.hashers import make_password
# Create your views here.
def home(request):
    return render(request , 'index.html')
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST,request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.password = make_password(
                form.cleaned_data['password']
            )
            user.is_superuser = False
            user.is_staff = False
            user.save()
            print("Đăng kí thành công")
            
    else:
        form = RegisterForm()
    return render(request,'register.html',{'form' : form})