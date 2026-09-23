from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BlogSerializer
from .models import Blog_Api



@api_view(['GET'])

def blog_api_list(request):
    if request.method == 'GET' :
        blogs = Blog_Api.objects.all().order_by('-id')
        serializer = BlogSerializer(blogs,many = True)
        return Response(serializer.data)
       
@api_view(['POST'])
def blog_api_create(request):
    if request.method == 'POST' :
        serializer = BlogSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def blog_api_detail(request,id):
    try :
        blog = Blog_Api.objects.get(id = id)
    except Blog_Api.DoesNotExist:
        return Response({"error" : "Blog not found"},status=404)
    if request.method == 'GET':
        serializer = BlogSerializer(blog)
        return Response(serializer.data)

@api_view(['PUT'])
def blog_api_update(request,id):
    try:
        blog = Blog_Api.objects.get(id = id)
    except Blog_Api.DoesNotExist:
        return Response ({"error" : "Lỗi"},status=404)
    if request.method == 'PUT' :
        serializer = BlogSerializer(blog,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=400)

@api_view(['DELETE'])
def blog_api_delete(request,id):
    try:
        blog = Blog_Api.objects.get(id = id)
    except Blog_Api.DoesNotExist:
        return Response({"error" : "Lỗi"},status=404)
    if request.method == 'DELETE' :
        blog.delete()
        return Response({"message": "Xóa ok"},status=204)


from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from  rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from Product.models import Product

# đăng kí tạo token
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password :
        return Response({"error" : "Vui lòng nhập username hoặc password "})
    # kiểm tra xem username có tồn tại hay k 
    if User.objects.filter(username = username).exists() :
        return Response({"error": "username đã tồn tại"})
    user = User.objects.create_user(username=username,password=password)
    # tạo token tương ứng với user
    token ,created = Token.objects.get_or_create(user = user)
    return Response({"token" :  token.key},status=status.HTTP_201_CREATED)


# đqưng nhập lấy token

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user =  authenticate(username = username ,password =  password)
    if not user : 
        return Response({"error" : "không thể đăng nhập"},status=status.HTTP_400_BAD_REQUEST)

    # lấy token hoặc tạo nếu chưa có 
    token , created = Token.objects.get_or_create(user = user)
    return Response({"token" : token.key},status=status.HTTP_200_OK)


# api phải có token hợp lệ 
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def blog_list (request):
    blog = Blog_Api.objects.all()
    serializer = BlogSerializer(blog,many = True)
    return Response(serializer.data)