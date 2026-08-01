from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.decorators import login_required


def non_superuser_required(view_fuc):
    # chỉ cho phép người dùng không phải là superuser truy cập vào view
    actual_decorator = user_passes_test(
        lambda u: u.is_authenticated and not u.is_superuser,
        # u.is_authenticate : nguoif dùng đã đăng nhập
        # not u.is_superusser : người dùng không phải là superuser
    )
    return login_required(actual_decorator(view_fuc))