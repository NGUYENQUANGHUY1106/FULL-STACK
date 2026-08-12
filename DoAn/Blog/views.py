from django.shortcuts import render,redirect
from .models import Blog
from .forms import add_Blog
# Create your views here.
def add_blog(request):
    if request.method == 'POST':
        blog = add_Blog(request.POST,request.FILES)
        if blog.is_valid():
            blog = blog.save(commit = False)
            blog.save()

            print("Đăng bài thành công")
            return redirect('blog_list')
    else:
        blog = add_Blog()
    return render(request, 'add_blog.html',{'blog' : blog})
def  blog_list(request):
    blogs = Blog.objects.all()
    return render(request , 'blog_list.html',{'blogs' : blogs})