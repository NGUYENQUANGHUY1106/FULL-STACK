from django.contrib import admin

# Register your models here.
from .models import User,Country


admin.site.register(Country)
admin.site.register(User)