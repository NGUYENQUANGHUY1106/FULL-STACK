import ast
import json

from django.core.files.storage import default_storage
from django.core.mail import EmailMultiAlternatives
from django.http import JsonResponse
from django.shortcuts import render,redirect,get_object_or_404
from .models import User,Country
from django.conf import  settings
from django.template.loader import render_to_string

from .forms import RegisterForm ,LoginForm
from django.contrib.auth import  login,logout
from django.views.decorators.http import require_POST

from Product.models import Cart, Product,Brand,Category
from django.contrib.auth.hashers import make_password ,check_password
from Users.models import User
from Product.models import Product,Category,Brand
from django.http import JsonResponse
from django.db.models import Q
import json

# Create your views here.
def home(request):
    products = Product.objects.all().order_by('-create_at')[:6]
    categories = Category.objects.all()
    brands = Brand.objects.all()
    # lấy ra 6 sản phẩm mới nhất 
    for product in products:
        try:

            if isinstance(product.image, str):
                # isinstance kiểm tra kiểu dữ liệu 

                product.images = ast.literal_eval(product.image)

            else:

                product.images = product.image or []

        except Exception:

            product.images = []


    return render(request , 'index.html' ,{'products' : products,
                                           'categories' : categories,
                                           'brands' : brands
                            })
def search_product_home(request):
        # lấy từ js 
        name_product =  request.GET.get('name_product', '').strip()
        price = request.GET.get('price', '').strip()
        category = request.GET.get('category', '').strip()
        brand = request.GET.get('brand', '').strip()
        status =  request.GET.get('status', '').strip()
        products = Product.objects.all()
        if name_product : 
            products = products.filter(
                name__icontains = name_product
            )
        if price :
            price_min,price_max  = price.split('-')

            products = products.extra (
                where=["price BETWEEN %s AND %s"],
                params=[price_min,price_max]
            )
                
        if category :
            # lấy ra sp có category = category chọn
            products = products.filter(
                id_category_id =  category
            )

        if brand:
            products = products.filter(
                id_brand_id = brand
            )
        if status:
            products = products.filter(
                    status = status
            )
        data = []

        for item in products :
            image = ''
            if item.image:
                try:
                    images = json.loads(item.image)
                    if images : 
                        image = images[0]
                except :
                    image = item.image
            data.append(
               {
                    'id' : item.id,
                    'name' : item.name,
                    'price' : float(item.price),
                    'image' : image,
                    'status' : item.status
               }
            )
        return JsonResponse({
                'success' : True,
                'products' : data
        })
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST,request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.password = make_password(
                form.cleaned_data['password']
            )
            user.is_superuser = False
            user.is_staff = False
            user.save()
            
            print("Đăng kí thành công")
            return redirect('login')
            
    else:
        form = RegisterForm()
    return render(request,'register.html',{'form' : form})
def login(request): 
    if request.method == 'POST': 
        form = LoginForm(request.POST)

        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            try:
                user = User.objects.get(
                    email = email
                )
                if check_password(password ,user.password):


                    request.session['user_id'] = user.id
                    request.session['username'] = user.username

                    print("đăng nhập thành công")
                    return redirect('home')

            except User.DoesNotExist:
                form.add_error(None,'Email hoặc mật khẩu không đúng')

    else:
        form = LoginForm()
    return render (request,'login.html',{'form' : form})
def custom_logout(request):
    request.session.flush()
    return redirect('login')
def account(request):
    user_id = request.session.get('user_id')
    user = User.objects.get(
        id = user_id
    )
    
    country = Country.objects.all()
    if request.method == 'POST':
        user.username = request.POST.get('username')
        user.email =  request.POST.get('email')
        avatar = request.FILES.get('avatar')
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        password = request.POST.get('password')

        if avatar:
            user.avatar = avatar
        country_id = request.POST.get('id_country')
        if country_id:
            user.id_country_id = country_id
        
        if password : 
            user.password = make_password(password)
        user.save()
        return redirect('account')
    return render(request,'account.html',{'user' : user,
                                          'country' :country
                                          })



