from django.utils import timezone
from django.db import models
from Users.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Blog(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to='DoAn/',null=True,blank=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meat:
        db_table = 'Blog'

class Rate(models.Model):
    id_blog =  models.ForeignKey(Blog,
                                 on_delete= models.CASCADE)
    id_user = models.ForeignKey(User,on_delete=models.CASCADE)

    rate = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    time = models.DateTimeField(auto_now_add=True)

    class Meta :
        constraints = [
            models.UniqueConstraint(
                fields=['id_blog','id_user'],
                name='unique_blog_user_rate'
            )
        ]
        # khong cho phép 1 user đánh giá nhiều lần trên cùng 1 blog