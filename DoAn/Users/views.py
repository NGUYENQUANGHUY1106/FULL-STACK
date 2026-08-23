from django.shortcuts import render,redirect
from .models import User,Country

from .forms import RegisterForm ,LoginForm
from django.contrib.auth import  login,logout


from django.contrib.auth.hashers import make_password ,check_password

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
            return redirect('login')
            
    else:
        form = RegisterForm()
    return render(request,'register.html',{'form' : form})

def login(request): 
    if request.method == 'POST': 
        form = LoginForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            try:
                user = User.objects.get(
                    email = email
                )
                if check_password(password ,user.password):


                    request.session['user_id'] = user.id
                    request.session['username'] = user.username

                    print("đăng nhập thành công")
                    return redirect('home')

            except User.DoesNotExist:
                form.add_error(None,'Email hoặc mật khẩu không đúng')

    else:
        form = LoginForm()
    return render (request,'login.html',{'form' : form})

def custom_logout(request):
    request.session.flush()
    return redirect('login')


def account(request):
    user_id = request.session.get('user_id')
    user = User.objects.get(
        id = user_id
    )
    
    country = Country.objects.all()
    if request.method == 'POST':
        user.username = request.POST.get('username')
        user.email =  request.POST.get('email')
        avatar = request.FILES.get('avatar')
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        password = request.POST.get('password')

        if avatar:
            user.avatar = avatar
        country_id = request.POST.get('id_country')
        if country_id:
            user.id_country_id = country_id
        
        if password : 
            user.password = make_password(password)
        user.save()
        return redirect('account')
    return render(request,'account.html',{'user' : user,
                                          'country' :country
                                          })
