from django.contrib import admin

# Register your models here.
from .models import Demo

class DemoAdmin(admin.ModelAdmin):
    list_display = ('title','author','published_date')
    # các cột hiển thị
    search_fields = ['title']
    # không được để search là khóa ngoại phải để textfileds
    # các cột hiển thị
    list_filter = ['published_date']
    # bộ lọc bên phải
admin.site.register(Demo,DemoAdmin)