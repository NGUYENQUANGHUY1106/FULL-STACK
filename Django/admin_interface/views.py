from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.http import HttpResponse, request

def register_superuser(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']

        # kiểm tra xem đã có superuser nào chưa
        if User.objects.filter(is_superuser=True).exists():
            return HttpResponse("đã có superuser tồn tại, không thể tạo thêm superuser mới.")
        user = User.objects.create_superuser(username=username, email=email, password=password)
        user.save()

        login(request, user)
        return redirect('/admin/')
    return render(request, 'admin_interface/register_superuser.html')