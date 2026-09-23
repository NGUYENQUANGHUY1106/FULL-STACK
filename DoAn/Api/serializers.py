from rest_framework import serializers
from .models import Blog_Api

class BlogSerializer(serializers.ModelSerializer):
    # serializersdùng để chuyển đổi dữ liệu qua liệu giữa
    # từ Django -> JSON
    # JSON -> Django
    # chuyển từ JSON -> object để lưu vào db 
    class Meta :
        model = Blog_Api
        fields = '__all__'