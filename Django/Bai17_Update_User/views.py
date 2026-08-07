from django.shortcuts import render,redirect

# Create your views here.
from django.contrib.auth import authenticate ,logout ,login
from django.contrib.auth.forms import AuthenticationForm
from .forms import UserRegisterForm

def register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['pass_word'])
            user.save()
            return redirect('user_login')
        else:
            form = UserRegisterForm()
        return render(request,'register.html',{'form':form})