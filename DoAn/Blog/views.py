from django.shortcuts import render, redirect, get_object_or_404
from .models import Blog, Rate, Comment
from .forms import add_Blog
from Users.models import User
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.db.models import Avg


# thêm blog
def add_blog(request):

    if request.method == 'POST':

        blog = add_Blog(
            request.POST,
            request.FILES
        )

        if blog.is_valid():

            blog = blog.save(commit=False)

            blog.save()

            return redirect('blog_list')

    else:

        blog = add_Blog()

    return render(
        request,
        'add_blog.html',
        {
            'blog': blog
        }
    )


# danh sách blog
def blog_list(request):

    blogs = Blog.objects.all().order_by(
        '-created_at'
    )

    paginator = Paginator(
        blogs,
        3
    )

    page_number = request.GET.get(
        'page'
    )

    page_obj = paginator.get_page(
        page_number
    )

    return render(
        request,
        'blog_list.html',
        {
            'page_obj': page_obj
        }
    )


# chi tiết blog
def blog_details(request, id):

    blog_details = get_object_or_404(
        Blog,
        id=id
    )

    prev_blog = Blog.objects.filter(
        id__lt=id
    ).order_by(
        '-id'
    ).first()

    next_blog = Blog.objects.filter(
        id__gt=id
    ).order_by(
        'id'
    ).first()

    # tính rating trung bình
    rating = Rate.objects.filter(
        id_blog=blog_details
    ).aggregate(
        average=Avg('rate')
    )['average']

    if rating is not None:

        rating = round(rating)

    else:

        rating = 0

    # lấy comment
    comment = Comment.objects.filter(
        id_blog=blog_details
    ).order_by(
        'id'
    )

    return render(
        request,
        'blog_details.html',
        {
            'blog_details': blog_details,
            'prev': prev_blog,
            'next': next_blog,
            'rating': rating,
            'comment': comment
        }
    )


# đánh giá blog
def rate_blog(request, id):

    if request.method != 'POST':

        return JsonResponse({
            'success': False,
            'message': 'Phương thức không hợp lệ'
        })

    user_id = request.session.get(
        'user_id'
    )

    if not user_id:

        return JsonResponse({
            'success': False,
            'message': 'Vui lòng đăng nhập để đánh giá'
        })

    blog = get_object_or_404(
        Blog,
        id=id
    )

    rate_value = request.POST.get(
        'rate'
    )

    try:

        rate_value = int(rate_value)

    except (TypeError, ValueError):

        return JsonResponse({
            'success': False,
            'message': 'Số sao không hợp lệ'
        })

    if rate_value < 1 or rate_value > 5:

        return JsonResponse({
            'success': False,
            'message': 'Số sao không hợp lệ'
        })

    user = get_object_or_404(
        User,
        id=user_id
    )

    user_rate = Rate.objects.filter(
        id_blog=blog,
        id_user=user
    ).first()

    if user_rate:

        return JsonResponse({
            'success': False,
            'message': 'Bạn đã đánh giá bài viết rồi'
        })

    Rate.objects.create(
        rate=rate_value,
        id_blog=blog,
        id_user=user
    )

    return JsonResponse({
        'success': True,
        'message': 'Đánh giá thành công'
    })


# comment và reply
def comment_blog(request, blog_id):

    if request.method != 'POST':

        return JsonResponse({
            'success': False,
            'message': 'Phương thức không hợp lệ'
        })

    user_id = request.session.get(
        'user_id'
    )

    if not user_id:

        return JsonResponse({
            'success': False,
            'message': 'Vui lòng đăng nhập trước khi bình luận'
        })

    user = get_object_or_404(
        User,
        id=user_id
    )

    blog = get_object_or_404(
        Blog,
        id=blog_id
    )

    cmt = request.POST.get(
        'cmt'
    )

    if not cmt or not cmt.strip():

        return JsonResponse({
            'success': False,
            'message': 'Vui lòng nhập nội dung bình luận'
        })


    # lấy parent_id
    parent_id = request.POST.get(
        'parent_id'
    )

    if not parent_id:

        new_comment = Comment.objects.create(

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
        )

        if parent_comment.id_blog_id != blog.id:

            return JsonResponse({
                'success': False,
                'message': 'Comment không thuộc bài viết này'
            })

        new_comment = Comment.objects.create(

            cmt=cmt,

            id_user=user,

            id_blog=blog,

            avatar_user=user.avatar,

            name_user=user.username,

            parent=parent_comment,

            level=1
        )

    avatar_url = ''

    if new_comment.avatar_user:

        avatar_url = new_comment.avatar_user.url

    # trả dữ liệu comment mới cho AJAX
    return JsonResponse({

        'success': True,

        'message': 'Bình luận thành công',

        'comment': {

            'id': new_comment.id,

            'cmt': new_comment.cmt,

            'name_user': new_comment.name_user,

            'avatar_user': avatar_url,

            'parent_id': new_comment.parent_id,

            'level': new_comment.level

        }

    })