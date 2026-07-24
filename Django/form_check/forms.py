from django import forms
from .models import Blog
class BlogForm(forms.ModelForm):
    # tạo form dựa trên Model Blog
    # tự lấy thông tin từ Model
    class Meta:
        # cấu hính cho ModelForm
        # hiển thị những cột nào 
        model = Blog 
        # liên kết với model Blog
        fields = ['title','content']
        # chỉ hiển thị 2 trường title content 