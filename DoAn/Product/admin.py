from django.contrib import admin

# Register your models here.
from .models import Category,Brand,Cart,Product,history
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Cart)
admin.site.register(history)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # cấu hình giao diện cho Product
    search_fields = ['id_user__username']
    # tìm trang bảng user có name lấy id ra  tương ứng sau đó tìm ở Product có id_user = id  lúc lấy vừa này 



