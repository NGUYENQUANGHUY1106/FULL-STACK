from django.shortcuts import render ,redirect ,get_object_or_404
from .models import User
# User là cái mà lúc nãy mình tạo bảng 
# chỉ định tên bảng được sử dụng 
from django.urls import reverse


# Create your views here.
def list_user(request):
    users = User.objects.all()
    #  lấy dữ liệu ở bảng lưu vào users
    return render(request,'users/list_users.html',{'users': users})


def add_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        User.objects.create(username = username ,email = email)
        #  thêm dữ liệu vào bảng bằng create
        return redirect('list_user')
    return render(request,'users/add_user.html')

def  edit_user(request,user_id):
    user = get_object_or_404(User, id = user_id)
    # nó sẽ lấy ra database đó và id    
    # chưa hiểu
    if request.method == 'POST':
        user.username = request.POST['username']
        # chưa hiểu
        user.email = request.POST['email']
        user.save()
        return redirect('list_user')
    return render(request ,'users/edit_user.html',{'user': user})

def delete_user(request,user_id):
    user = get_object_or_404(User,id = user_id)
    user.delete()
    return redirect('list_user')