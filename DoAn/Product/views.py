import ast
import json
from multiprocessing import context

from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.shortcuts import render,redirect,get_object_or_404
from django.conf import settings
from django.template.loader import render_to_string
from .models import User
from django.views.decorators.http import require_POST
from Users.models import User,Country
from django.contrib.auth.hashers import make_password
from decimal import Decimal
from django.shortcuts import render, redirect
from .models import Cart, history

from Product.models import Cart, Product,Brand,Category,history
# add product
ALLOWED_FILE = {'png', 'jpg', 'jpeg', 'gif'}
MAX_SIZE_FILE = 1 * 1024 * 1024  # 1MB
def allowed_file(filename):

    return (
        '.' in filename
        and filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE
    )
def add_product(request):


    errors = {}

    brands = Brand.objects.all()
    categories = Category.objects.all()
    user_id = request.session.get('user_id')
    if not user_id:
         return redirect('login')
    user = get_object_or_404(User,id = user_id)

    if request.method == 'POST':

        name = request.POST.get('name')
        price = request.POST.get('price')
        category_id = request.POST.get('category')
        brand_id = request.POST.get('brand')
        status = request.POST.get('status')
        sale = request.POST.get('sale')
        company = request.POST.get('company')
        detail = request.POST.get('detail')

        files = request.FILES.getlist('image')


        if not files:

            errors['file'] = 'Vui lòng chọn ít nhất một file'

        elif len(files) > 3:

            errors['file'] = 'Chỉ được chọn tối đa 3 ảnh'

        else:

            for file in files:

                # Kiểm tra định dạng
                if not allowed_file(file.name):

                    errors['file'] = (
                        f'{file.name} không phải là file hình ảnh hợp lệ'
                    )

                    break

                if file.size > MAX_SIZE_FILE:

                    errors['file'] = (
                        f'{file.name} vượt quá kích thước 1MB'
                    )

                    break

        if not errors:

            print("File hợp lệ")

            images_name = []

            for file in files:

                file_path = default_storage.save(
                    file.name,
                    file
                )

                images_name.append(file_path)

            
            # chuyển thành json
            image_json = json.dumps(images_name)

            Product.objects.create(

                id_user=user ,

                name=name,

                price=price,

                id_category_id=category_id,

                id_brand_id=brand_id,

                status=status,

                sale=sale,

                company=company,

                image=image_json,

                detail=detail
            )

            return redirect('my_product')

    return render(
        request,
        'Product/add_product.html',
        {
            'errors': errors,
            'brand': brands,
            'category': categories
                            }
    )

def delete_product(request, id):

    user_id = request.session.get('user_id')

    product = get_object_or_404(
        Product,
        id=id,
        id_user_id=user_id
    )

    product.delete()

    return redirect('my_product')
@require_POST
def add_to_cart(request):

    try:
        user_id = request.session.get('user_id')
        if not user_id:

            return JsonResponse({
                'success': False,
                'message': 'Bạn cần đăng nhập'
            })



        data = json.loads(request.body)

        product_id = data.get('product_id')


        if not product_id:

            return JsonResponse({
                'success': False,
                'message': 'Không có product_id'
            })

        product = get_object_or_404(
            Product,
            id=product_id
        )


        user = get_object_or_404(
        User,
        id=user_id
        )


        cart_item = Cart.objects.filter(
            id_user=user,
            id_product=product
        ).first()


        if cart_item:

            cart_item.quantity += 1

            cart_item.save()


        else:

            cart_item = Cart.objects.create(

                id_user=user,

                id_product=product,

                quantity=1

            )


        cart_count = 0

        cart_items = Cart.objects.filter(
            id_user=user
        )

        for item in cart_items:

            cart_count += item.quantity


        return JsonResponse({

            'success': True,

            'message':
                'Đã thêm sản phẩm vào giỏ hàng',

            'product_id':
                product.id,

            'quantity':
                cart_item.quantity,

            'cart_count':
                cart_count

        })


    except json.JSONDecodeError:

        return JsonResponse({

            'success': False,

            'message':
                'Dữ liệu JSON không hợp lệ'

        })


    except Exception as e:

        print(
            "LỖI ADD TO CART:",
            e
        )

        return JsonResponse({

            'success': False,

            'message':
                str(e)

        })

    # cart
def cart(request):
    user_id = request.session.get('user_id')
    if not user_id:
        if request.method == 'POST':
            return JsonResponse({'success': False, 'message': 'Chưa đăng nhập'}, status=401)
        return render(request, 'product/cart.html', {'cart_items': [], 'total': 0})

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_id = data.get('cart_id')
            action = data.get('action')

            if not cart_id:
                return JsonResponse({'success': False, 'message': 'Không có cart_id'})

            cart_item = get_object_or_404(
                Cart.objects.select_related('id_product'),
                id=cart_id,
                id_user_id=user_id
            )

            is_deleted = False

            if action == 'increase':
                cart_item.quantity += 1
                cart_item.save()
            elif action == 'decrease':
                cart_item.quantity -= 1
                if cart_item.quantity <= 0:
                    cart_item.delete()
                    is_deleted = True
                else:
                    cart_item.save()
            elif action == 'delete':
                    cart_item.delete()
                    is_deleted = True
            else:
                return JsonResponse({'success': False, 'message': 'Action không hợp lệ'})

            # lấy lại toàn bộ giỏ hàng sau khi đã chỉnh
            user_cart = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
            #  tổng tiền
            total = sum(item.id_product.price * item.quantity for item in user_cart)
            # tỏng số lượng snar phẩm 
            cart_count = sum(item.quantity for item in user_cart)

            if is_deleted:
                return JsonResponse({
                    'success': True,
                    'deleted': True,
                    'cart_id': cart_id,
                    'cart_count': cart_count,
                    'total': float(total)
                })

            item_total = cart_item.id_product.price * cart_item.quantity
            return JsonResponse({
                'success': True,
                'deleted': False,
                'cart_id': cart_item.id,
                'quantity': cart_item.quantity,
                'item_total': float(item_total),
                'total': float(total),
                'cart_count': cart_count
            })

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'JSON không hợp lệ'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    # lúc vừa vào trang cart
    cart_items = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
    total = 0
    # tính tổng tiền lúc vừa mới vào trang
    for item in cart_items:
        try:
            item.id_product.images = ast.literal_eval(item.id_product.image) if item.id_product.image else []
        except (ValueError, SyntaxError):
            item.id_product.images = []
        total += item.id_product.price * item.quantity

    return render(
        request,
        'product/cart.html',
        {
            'cart_items': cart_items,
            'total': total
        }
    )
# product_details
def product_details(request,id):
    products = Product.objects.filter(id=id)

    for product  in products :
        try:
            if  isinstance(product.image,str):
                product.images = ast.literal_eval(product.image)
            else:
                product.images = product.image or []
        except Exception:
            product.images = []
    return render(request, 'Product/product_details.html', {'products': products,
                                                            
                                                            })
# my product
def my_product(request):
    user_id = request.session.get('user_id')

    my_product = Product.objects.filter(id_user = user_id)


    for product in my_product:
        try:
            image_filename =  json.loads(product.image)
            # chuổi thành Json
            if image_filename:
                product.first_image = image_filename[0]
            else:
                product.first_image = None

        except(json.JSONDecodeError,TypeError):
            product.first_image = None




    return render(request,'Product/my_product.html',{'my_product' : my_product})
# edit product
def edit_product(request, id):

    product = get_object_or_404(Product, id=id)

    try:
        image_filenames = json.loads(product.image)

        if image_filenames:
            product.images = image_filenames
        else:
            product.images = []

    except (json.JSONDecodeError, TypeError):
        product.images = []

    categories = Category.objects.all()
    brands = Brand.objects.all()

    if request.method == 'POST':

        name = request.POST.get('name')
        price = request.POST.get('price')
        category_id = request.POST.get('category')
        brand_id = request.POST.get('brand')
        status = request.POST.get('status')
        sale = request.POST.get('sale')
        company = request.POST.get('company')
        detail = request.POST.get('detail')

        delete_images = request.POST.getlist('delete_images')

        new_images = request.FILES.getlist('image')

        try:
            old_images = json.loads(product.image)

            if not old_images:
                old_images = []

        except (json.JSONDecodeError, TypeError):
            old_images = []

        remaining_images = []

        for image in old_images:
            if image not in delete_images:
                remaining_images.append(image)

        total_images = len(remaining_images) + len(new_images)

        if total_images > 3:

            product.images = old_images

            return render(
                request,
                'Product/edit_product.html',
                {
                    'product': product,
                    'categories': categories,
                    'brands': brands,
                    'error': 'Tổng số ảnh không được vượt quá 3!'
                }
            )

        for image in new_images:

            image_name = default_storage.save(
                image.name,
                image
            )

            remaining_images.append(image_name)

        product.image = json.dumps(remaining_images)

        product.name = name
        product.price = price
        product.status = status
        product.company = company
        product.detail = detail

        if sale:
            product.sale = sale

        if category_id:
            product.id_category_id = category_id

        if brand_id:
            product.id_brand_id = brand_id

        product.save()

        return redirect('my_product')

    return render(
        request,
        'Product/edit_product.html',
        {
            'product': product,
            'categories': categories,
            'brands': brands
        }
    )
# checkout
def checkout(request):
    user_id = request.session.get('user_id')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_id = data.get('cart_id')
            action = data.get('action')

            if not cart_id:
                return JsonResponse({'success': False, 'message': 'Không có cart_id'})

            cart_item = get_object_or_404(
                Cart.objects.select_related('id_product'),
                id=cart_id,
                id_user_id=user_id
            )

            is_deleted = False

            if action == 'increase':
                cart_item.quantity += 1
                cart_item.save()
            elif action == 'decrease':
                cart_item.quantity -= 1
                if cart_item.quantity <= 0:
                    cart_item.delete()
                    is_deleted = True
                else:
                    cart_item.save()
            elif action == 'delete':
                    cart_item.delete()
                    is_deleted = True
            else:
                return JsonResponse({'success': False, 'message': 'Action không hợp lệ'})

            # lấy lại toàn bộ giỏ hàng sau khi đã chỉnh
            user_cart = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
            #  tổng tiền
            total = sum(item.id_product.price * item.quantity for item in user_cart)
            # tỏng số lượng snar phẩm 
            cart_count = sum(item.quantity for item in user_cart)

            if is_deleted:
                return JsonResponse({
                    'success': True,
                    'deleted': True,
                    'cart_id': cart_id,
                    'cart_count': cart_count,
                    'total': float(total)
                })

            item_total = cart_item.id_product.price * cart_item.quantity
            return JsonResponse({
                'success': True,
                'deleted': False,
                'cart_id': cart_item.id,
                'quantity': cart_item.quantity,
                'item_total': float(item_total),
                'total': float(total),
                'cart_count': cart_count
            })

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'JSON không hợp lệ'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    # lúc vừa vào trang cart
    cart_items = Cart.objects.filter(id_user_id=user_id).select_related('id_product')
    total = 0
    # tính tổng tiền lúc vừa mới vào trang
    for item in cart_items:
        try:
            item.id_product.images = ast.literal_eval(item.id_product.image) if item.id_product.image else []
        except (ValueError, SyntaxError):
            item.id_product.images = []
        total += item.id_product.price * item.quantity

    return render(
        request,
        'product/checkout.html',
        {
            'cart_items': cart_items,
            'total': total,
            'user_id' : user_id
        }
    )

def checkout_register(request):
    if request.method != 'POST':
        return redirect ('checkout')
    username  = request.POST.get('register_username','').strip()
    email  = request.POST.get('register_email','').strip()
    phone  = request.POST.get('register_phone','').strip()
    first_name  = request.POST.get('register_first_name','').strip()
    last_name  = request.POST.get('register_last_name','').strip()
    password  = request.POST.get('register_password','').strip()
    confirm_password  = request.POST.get('register_confirm_password','').strip()
    if password != confirm_password:
        return render(request,'Product/checkout.html',{'register_error' :'Mật khẩu không khớp'})
    if User.objects.filter(email = email):
        return render(request,'Product/checkout.html',{'register_error' :'Email đã tồn tại '})

    # tạo user 
    user = User()
    user.username = username
    user.email = email
    user.phone = phone
    user.first_name = first_name
    user.last_name = last_name
    user.password = make_password(password)
    user.is_superuser = False
    user.is_staff = False

    country = Country.objects.first()
    if country :
        user.id_country = country
    user.save()
    request.session['user_id'] = user.id

    try:
        send_welcome_email(user)
    except Exception as e:
        print('Lỗi gủi email', e)
    return redirect('login')

def send_welcome_email(user):
    
    subject  = 'Chào mừng bạn đén với website'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [user.email]

    text_content = f"Chào {user.username},cảm ơn bạn đã đăng kí"

    # render HTML

    html_content = render_to_string('emails/welcome_email.html',{'user' : user})

    #  gửi email

    msg = EmailMultiAlternatives(subject,text_content,from_email,to)
    msg.attach_alternative(html_content,"text/html")
    msg.send()

def send_order(request):

    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('login')

    if request.method == 'POST':
        username = request.POST.get('username', '')
        email = request.POST.get('email', '')
        phone = request.POST.get('phone', '')

        company_name = request.POST.get('company_name', '')
        bill_email = request.POST.get('bill_email', '')
        title = request.POST.get('title', '')
        first_name = request.POST.get('first_name', '')
        middle_name = request.POST.get('middle_name', '')
        last_name = request.POST.get('last_name', '')
        address_1 = request.POST.get('address_1', '')
        address_2 = request.POST.get('address_2', '')

        order_note = request.POST.get('order_note', '')
        shipping_bill = request.POST.get('shipping_bill', '')

        cart_items = Cart.objects.filter(
            id_user_id=user_id
        ).select_related('id_product')

        order_items = []
        tax = Decimal('2.00')
        total_price = Decimal('0')

        for item in cart_items:
            price = item.id_product.price
            image = item.id_product.image
            try :
                images = json.loads(image)
                first_image = images[0] if images else ''
            except :
                first_image = image
            quantity = item.quantity
            item_total = price * quantity

            total_price += item_total

            order_items.append({
                'name': item.id_product.name,
                'image' : first_image,
                'price': price,
                'quantity': quantity,
                'total': item_total,

            })


            history.objects.create(
                email=email,
                phone=phone,
                name=item.id_product.name,
                price=item_total,
                id_user_id=user_id
            )
        grand_total = total_price + tax
        context = {
            'username': username,
            'email': email,
            'phone': phone,
            'company_name': company_name,
            'bill_email': bill_email,
            'title': title,
            'first_name': first_name,
            'middle_name': middle_name,
            'last_name': last_name,
            'address_1': address_1,
            'address_2': address_2,
            'order_note': order_note,
            'shipping_bill': shipping_bill,

            'order_items': order_items,

            'price': total_price,
            'total_price': total_price,
            'grand_total' :  grand_total
        }
        user = get_object_or_404(User,
                                 id = user_id)
        try :
            send_order_user(user,context)
        except Exception as e :
            print("Lỗi gửi email",e)
        return render(
            request,
            'emails/send_order.html',
            context
        )

    return redirect('cart')

def send_order_user(user, context):
    subject = 'QH Shopper - Cảm ơn bạn đã đặt hàng'
    from_email = settings.DEFAULT_FROM_EMAIL
    to = [user.email]

    text_content = (
        f"Chào {user.username},\n\n"
        f"Cảm ơn bạn đã tin tưởng QH Shopper và đặt hàng."
    )

    html_content = render_to_string(
        'emails/send_order.html',
        context
    )

    msg = EmailMultiAlternatives(
        subject,
        text_content,
        from_email,
        to
    )

    msg.attach_alternative(html_content, "text/html")

    msg.send()

def search_product(request):

    name_product = request.GET.get('name_product', '').strip()

    products_search = Product.objects.none()

    if name_product:
        products_search = Product.objects.filter(
            name__icontains=name_product
        )
        for image_search in products_search :
            try: 
                list_image = json.loads(image_search.image)
                if list_image :
                    image_search.images = list_image
                    image_search.first_image = list_image[0]
                else:
                    image_search.images = []
                    image_search.first_image = None
            except(json.JSONDecodeError,TypeError) :
                image_search = None
                
    return render(  
        request,
        'product/search_product.html',
        {
            'name_product': name_product,
            'products_search': products_search
        }
    )

def search_suggest(request):

    keyword = request.GET.get('name_product', '').strip()

    if not keyword:
        return JsonResponse({
            'products': []
        })

    products = Product.objects.filter(
        name__icontains=keyword
        # lấy ra 10 sản phẩm đầu tiên 
    )[:10]

    data = []

    for product in products:

        data.append({
            'id': product.id,
            'name': product.name,
            'price': str(product.price)
        })

    return JsonResponse({
        'products': data
    })