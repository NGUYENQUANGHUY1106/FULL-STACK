from django.shortcuts import render,redirect,get_object_or_404
from .models import Product
from django.urls import reverse
from .forms import RegisterFormProduct


def add_product(request):
    if request.method == 'POST':
        # nếu có truyền request vào thì tạo form theo request và validate
        form = RegisterFormProduct(request.POST)
        if form.is_valid():
            username = request.POST['username']
            email = request.POST['email']
            ...
            Product.objects.create(
                username = username ,
                email = email
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