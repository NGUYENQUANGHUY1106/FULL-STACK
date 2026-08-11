from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "country"
    def  __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to="DoAn_image/",null=True,blank=True)
    first_name = models.CharField(max_length=50,blank=True)
    last_name = models.CharField(max_length=50,blank=True)
    id_country = models.ForeignKey(
        Country,on_delete=models.CASCADE,
        related_name="users"
    )

    class Meta:
        db_table = "user"
    def __str__(self):
        return self.username