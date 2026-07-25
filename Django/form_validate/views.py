from django.shortcuts import render,redirect,get_object_or_404
from .models import Product
from django.urls import reverse
from .forms import RegisterFormProduct


def add_product(request):
    if request.method == 'POST':
        print(request.FILES)
        # nếu có truyền request vào thì tạo form theo request và validate
        form = RegisterFormProduct(request.POST ,request.FILES)
        print(form.is_valid())
        print(form.errors)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            phone = form.cleaned_data['phone']
            avatar = request.FILES['avatar']
            password = form.cleaned_data['password']
            ...
            Product.objects.create(
                username = username ,
                email = email,
                phone  = phone,
                avatar = avatar,
                password = password,
            )
            return redirect('list_product')
    else:
        # không truyền vào gì cả thì tạo form trống
        form = RegisterFormProduct()
    return render(request,'add_product.html',{'form': form})
# Create your views here.
def list_product(request):
    product = Product.objects.all()
    return render(request,'list_product.html',{'product' : product})