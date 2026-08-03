from django.contrib import admin

from Django.settings import ADMIN_SITE_HEADER

# Register your models here.
from .models import Product
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name',)
admin.site.register(Product,ProductAdmin)

admin.site.site_header = ADMIN_SITE_HEADER