"""
URL configuration for Django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import include, path

from django.conf import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('form_check.urls')),
    path('validate/',include('form_validate.urls')),
    path('login_register/',include('login_register.urls'))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
    #  kiểm tra xem trong URL có media k  nếu có bỏ media đi chỉ lấy avatars/pig.png
    # có nghĩa nó thay media thành media_root  
                           document_root=settings.MEDIA_ROOT)
    # khi nhận request có chứa media đầu thì sẽ lấy trong media root sẽ lấy từ 
    # media_root lúc này là D:django/media sau đó no ghép với 
#    urlpatterns nó ghép dữ media_url với media_root