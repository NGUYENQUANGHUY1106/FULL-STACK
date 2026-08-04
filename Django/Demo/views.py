from django.shortcuts import render

from Demo.models import Demo

# Create your views here.
def detail(request):
    demos = Demo.objects.all()

    return render(request,
                  "Demo/detail.html",
                  {"demos": demos})