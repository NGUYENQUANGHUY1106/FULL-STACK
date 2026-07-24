from django import forms
from django.core.validators import validate_email
from .models import Product
class RegisterFormProduct(forms.Form):
    email = forms.EmailField(
        max_length=100,
        widget=forms.EmailInput(attrs={'class': 'form-control'}),
        error_messages= {'required' : 'Email không dược bỏ trống'}
    )
    username = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={'class':'form-control'}),
        error_messages={'required': 'Tên không được bỏ trống'}
    )

    # hàm clean email

    def clean_email(self):
        email = self.cleaned_data['email']
        if Product.objects.filter(email = email).exists():
            raise forms.ValidationError("Email đã tồn tại")
        return email
