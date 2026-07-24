from django.shortcuts import redirect, render

from form_check.models import Blog
from .forms import BlogForm
from django.shortcuts import get_object_or_404
# Create your views here.
def add_blog(request):
    if request.method == 'POST':
        form  = BlogForm(request.POST)
        # lấy dữ liệu ở form
        form.save()
        #  lưu vào database
        return redirect('list_blog')
    #  mở trang trang danh sách sau khi thêm xong
    else:
        form = BlogForm()
    return render(request,'form_check/add_blog.html',{'form':form})
def list_blog(request):
    blog = Blog.objects.all()
    return render(request,'form_check/blog_list.html',{'blog' : blog})