from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = "country"
    def  __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    id_country = models.ForeignKey(
        Country,on_delete=models.CASCADE,
        related_name="users"
    )
    class Meta:
        db_table = "user"
    def __str__(self):
        return self.name