from django.shortcuts import render,redirect

from .forms import RegisterForm
from django.shortcuts import get_object_or_404
from  django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import logout


def register_view(request):

    if request.method == "POST":

        form = RegisterForm(request.POST)

        if form.is_valid():

            user = User.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password']
            )

            return redirect("user_login")

    else:
        form = RegisterForm()

    return render(request, "register.html", {
        "form": form
    })
def login_view(request):

    if request.method == "POST":

        form = AuthenticationForm(request, data=request.POST)

        if form.is_valid():

            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(
                request,
                username=username,
                password=password
            )

            if user is not None:

                login(request, user)

                return redirect("list_check")

    else:
        form = AuthenticationForm()

    return render(request, "login.html", {
        "form": form
    })
@login_required
def list_check(request):

    check = User.objects.all()

    return render(request,
                  "check_list.html",
                  {
                      "check": check
                  })
# Create your views here.
def logout_view(request):

    logout(request)

    return redirect("user_login")