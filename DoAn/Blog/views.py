from django.shortcuts import render,redirect,get_object_or_404
from .models import Blog
from .forms import add_Blog
from django.core.paginator import Paginator
# phân trang
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
    blogs = Blog.objects.all().order_by("-created_at")
    paginator = Paginator(blogs,3)
    # chia tất cả blog trong database thành 3 3 blog / 1 trang
    page_number = request.GET.get("page")
    # lấy số trang hiện tại (2)
    page_obj = paginator.get_page(page_number)
    # nói sẽ lấy những blog có trang page2 ra 
    #  kiểu là khi ở page 2 sẽ truyền vào number 2 và page_obj sẽ lấy những blog có trong trang 2 ra 
    # dấu - là giảm dần 
    return render(request , 'blog_list.html',{'page_obj' : page_obj})

def blog_details(request,id):
    #  nhận id từ thẻ a 

    blog_details = get_object_or_404(Blog,id = id)
    #  lấy ra sp có id tương ửng
    prev_blog = Blog.objects.filter(id__lt = id).order_by('-id').first()
    # lt = less than
    next_blog = Blog.objects.filter(id__gt = id).order_by("id").first()
    #  gt = greater than
    
    return render(
    request,
    'blog_details.html',
    {
        'blog_details': blog_details,
        'prev': prev_blog,
        'next': next_blog
    }
)
#  trả về object html