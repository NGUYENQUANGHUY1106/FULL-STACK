from django import forms
from .models import User


class RegisterForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput)
    class Meta :
        model = User

        fields = [
            "username",
             "email",
             "password",
             "confirm_password",
             "avatar",
             "first_name",
             "last_name",
             "id_country",
        ]

        widgets = {
            "username" : forms.TextInput(),
            "email" : forms.EmailInput(),
            "password" : forms.PasswordInput(),
            "avatar" : forms.FileInput(),
            "first_name" :  forms.TextInput(),
            "last_name" :  forms.TextInput(),
            "id_country" : forms.Select(),
        }
    def clean_email(self):
        email = self.cleaned_data.get("email")
        if User.objects.filter(email = email).exists():
            raise forms.ValidationError("Email đã tồn tại ")
        return email
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password and confirm_password:
            if password != confirm_password:
                raise forms.ValidationError("Mật khẩu không khớp")
        else:
            raise forms.ValidationError("Mật khẩu hoặc mật khẩu xác nhận không được bỏ trống")
        return cleaned_data
