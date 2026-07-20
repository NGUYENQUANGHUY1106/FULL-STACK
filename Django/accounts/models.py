from django.db import models

# Create your models here.
class Demo(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    class Meta:
        db_table = 'test_django'