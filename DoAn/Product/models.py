from django.db import models
from Users.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        db_table = "Category"

class Brand(models.Model):
    name = models.CharField(max_length=100)
    class Meta:
        db_table = "brand"

class Product(models.Model):
    id_user = models.ForeignKey(User,on_delete=models.CASCADE,db_column='id_user')
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12,decimal_places=2)
    id_category = models.ForeignKey(Category,on_delete=models.CASCADE,db_column='id_category')
    id_brand = models.ForeignKey(Brand,on_delete=models.CASCADE,db_column='id_brand')
    status = models.IntegerField(
        choices = [
            (0,'New'),
            (1,'Sale')
        ],
        default = 0
        
    )
    sale = models.IntegerField(default=0)
    image = models.CharField(max_length=2000,null=True,blank=True)
    detail = models.TextField(null=True,blank=True)
    company = models.CharField(max_length=255)
    create_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Product'
