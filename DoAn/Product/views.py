from django.shortcuts import render

# Create your views here.
def list_product(request):
    user_id = request.session.get('user_id')

    return render(request,'list_product.html',{'user_id' : user_id})