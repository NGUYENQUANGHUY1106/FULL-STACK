from django.urls import path
from .import views
from .router.update import update

urlpatterns = [
    path('register/',views.register, name="register"),
    path('login/',views.login,name='login'),
    path('home/',views.home, name='home'),
    path('logout/',views.custom_logout, name='custom_logout'),
    path('account',views.account,name='account'),
    path('account/update',update,name='account_update')

]