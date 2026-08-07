from django import forms
from django.core.exceptions import ValidationError
from .models import CustomUser
from django.core.validators import FileExtensionValidator


class UserRegisterForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput,max_length=100)
    confirm_password = forms.CharField(widget=forms.PasswordInput,max_length=100)


    class Meta:
        # cung cấp cho Django về cách tạo form,
        model = CustomUser
        fields = ['username','email','password','confirm_password','avatar','first_name','last_name','id_country']

        def clean_username(self):
            username = self.cleaned_data.get('username')
            if CustomUser.objects.filter(username = username).exists():
            # kiểm tra username đã tồn tại chưa
                raise ValidationError("Username đã tồn tại")
            return username
        def clean_email(self):
            email = self.cleaned_data.get('email')
            if CustomUser.objects.filter(email = email).exists():
                raise ValidationError("Email đã tồn tại")
            return email
        def clean_avatar(self):
            avatar = self.cleaned_data.get('avatar')
            if avatar:
                if avatar.size > 1024 * 1024:
                    raise ValidationError("Email không được lớn hơn 1MB")
                if not avatar.name.lower().endswith(('.png','.jpg','.jpeg')):
                    raise ValidationError("Ảnh phải có định dạng ảnh")
            return avatar
        def clean(self):
            cleaned_data = super().clean()
            password = cleaned_data.get('password')
            confirm_password = cleaned_data.get('confirm_password')
            if password and confirm_password and password != confirm_password:
                raise  ValidationError("Mật khẩu xác nhận không trùng khớp")
            return cleaned_data