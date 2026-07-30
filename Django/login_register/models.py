from django.db import models

class Login_Register(models.Model):
    email = models.EmailField(max_length=100)
    name = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to="image/")

    class Meta :
       db_table = 'register_login'