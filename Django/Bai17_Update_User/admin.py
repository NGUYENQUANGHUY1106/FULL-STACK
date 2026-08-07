from django.contrib import admin

# Register your models here.
from .models import CustomUser
from .models import Country

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','price','created_at')
    search_fields =  ('name')
    list_filter = ('created_at')

admin.site.register(CustomUser)
admin.site.register(Country)