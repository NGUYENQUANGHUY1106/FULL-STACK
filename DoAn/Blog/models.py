from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to='DoAn/',null=True,blank=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meat:
        db_table = 'Blog'