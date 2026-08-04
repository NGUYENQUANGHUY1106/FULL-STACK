from django.db import models


from django.utils import timezone
from django.contrib.auth.models import User

class Demo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()
    published_date = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='demo_images/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
