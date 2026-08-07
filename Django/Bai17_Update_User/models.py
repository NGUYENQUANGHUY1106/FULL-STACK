from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import AbstractUser
# dùng để kế thừa và sử dụng user mặc định từ đó thay đổi và tạo ra một bản mới

from django.db import models

from django.conf import settings

class Country(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class CustomUser(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/',null=True)
    id_country = models.ForeignKey(Country,on_delete=models.SET_NULL, null= True ,blank=True)
    # id_country một user thuộc một contry 
    # một country có thể có nhiều user
