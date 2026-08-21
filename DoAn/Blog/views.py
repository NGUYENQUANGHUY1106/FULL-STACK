from django.shortcuts import render,redirect,get_object_or_404
from .models import Blog,Rate,Comment
from .forms import add_Blog
from Users.models  import User
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg
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
    
    # tính điểm trung bình

    rating = Rate.objects.filter(
        id_blog = blog_details
        #  là lấy những thk có id_blog ở bảng rate = thk blog đang được hiển thị á 
        #  tìm Blog có id = với id_blog
        #  là nó sẽ lấy cái đánh giá dựa theo id_blog ví dụ như Blog đang có id =4 thì nó sẽ lấy ở bảng 
        # Rate những id_blog =4 ra 

    ).aggregate(
        average = Avg('rate')
    )['average']
    if rating is not None:
        rating = round(rating)
    else:
        rating = 0;

    comment = Comment.objects.filter(
        id_blog = blog_details
    )
    return render(
    request,
    'blog_details.html',
    {
        'blog_details': blog_details,
        'prev': prev_blog,
        'next': next_blog,
        'rating' : rating,
        'comment' : comment
    }
)
#  trả về object html

def rate_blog(request, id):


# kiểm tra người dùng đã dăng nhập chưa

    user_id = request.session.get('user_id')

    if not user_id:
        return JsonResponse({
            'success': False,
            'message': 'Vui lòng đăng nhập để đánh giá'
        })


# lấy blog theo id ở blog_details

    blog = get_object_or_404(Blog, id=id)

# lấy số sao

    rate_value = request.POST.get('rate')
    # lấy số sao ỏ js gửi lên 



    rate_value = int(rate_value)


# kiểm tra số sao có hợp lệ hay k 

    if rate_value < 1 or rate_value > 5:
        return JsonResponse({
            'success': False,
            'message': 'Số sao không hợp lệ'
        })


# lấy user theo id

    user = get_object_or_404(User, id=user_id)


# kiểm tra xem đã đánh giá chưa 

    user_rate = Rate.objects.filter(
        id_blog=blog,
        id_user=user
    ).first()


    if user_rate:
        return JsonResponse({
            'success': False,
            'message': 'Bạn đã đánh giá bài viết rồi'
        })


# đánh giá 

    Rate.objects.create(
        rate=rate_value,
        id_blog=blog,
        id_user=user
    )

    return JsonResponse({
        'success': True,
        'message': 'Đánh giá thành công'
    })

def comment_blog(request, blog_id):

    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'Phương thức không hợp lệ'
        })

    # Lấy user đang đăng nhập
    user_id = request.session.get('user_id')

    if not user_id:
        return JsonResponse({
            'success': False,
            'message': 'Vui lòng đăng nhập trước khi bình luận'
        })

    # Lấy user
    user = get_object_or_404(
        User,
        id=user_id
    )

    # Lấy blog
    blog = get_object_or_404(
        Blog,
        id=blog_id
    )

    # Lấy nội dung comment
    cmt = request.POST.get('cmt')
    # lấy nội dung mà bên js gửi lên

    if not cmt or not cmt.strip():
        return JsonResponse({
            'success': False,
            'message': 'Vui lòng nhập nội dung bình luận'
        })

    # Lấy ID comment cha
    parent_id = request.POST.get('parent_id')
    # lấy id của cmt cha



    if not parent_id:

        Comment.objects.create(
            cmt=cmt,
            id_user=user,
            id_blog=blog,
            avatar_user=user.avatar,
            name_user=user.username,
            parent=None,
            level=0
        )



    else:

        parent_comment = get_object_or_404(
            Comment,
            id=parent_id
            # tìm trong thk commnt có parent_id = id ở js gửi lên
        )

        # Không cho reply comment
        # thuộc blog khác
        if parent_comment.id_blog_id != blog.id:
            return JsonResponse({
                'success': False,
                'message': 'Comment không thuộc bài viết này'
            })

        Comment.objects.create(
            cmt=cmt,
            id_user=user,
            id_blog=blog,
            avatar_user=user.avatar,
            name_user=user.username,
            parent=parent_comment,
            level=1
        )

    return JsonResponse({
        'success': True,
        'message': 'Bình luận thành công'
    })
    
    