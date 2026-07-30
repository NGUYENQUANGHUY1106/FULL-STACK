from django.db import models

# Create your models here.
class Product(models.Model):
    email = models.EmailField(max_length=100)
    username = models.CharField(max_length=100 ,unique=True)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to="avatars/")
    # lưu ảnh vào dự án trong folder avatars
    phone = models.CharField(max_length=10)

    class Meta:
        db_table = 'register'
