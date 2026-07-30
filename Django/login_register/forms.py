from django  import forms

from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm

from login_register.models import Login_Register

class RegisterForm(forms.ModelForm):
    # tạo form 
    email = forms.EmailField(max_length=100,
                             widget=forms.EmailInput(attrs={'class' : 'form-control'}),
                             error_messages={'required' : 'Email không được bỏ trống '})
    name = forms.CharField(max_length=100,
                           widget=forms.TextInput(attrs={'class':'form-control'}),
                           error_messages={'required':'Tên không được bỏ trống',
                                           'min_length' : 'Tên không ít hơn  6 ký tự',
                                           'max_length':'tên không được quá 50 ký tự'})
    avatar = forms.ImageField(error_messages={'required' : 'vui lòng chọn hình ảnh '})
    password = forms.CharField(widget=forms.PasswordInput,
                               error_messages={'required':'Mật khẩu không được để trống '})
    confirm_password = forms.CharField(widget=forms.PasswordInput,
                                       error_messages={'required' : 'Mật khẩu xác nhận không được bỏ trống'})

    class Meta :
        model = Login_Register
        fields = ['email','name','password','avatar']

    def clean_email (self):
        email = self.cleaned_data['email']
        if Login_Register.objects.filter(email = email).exists():
        # kiểm tra email đã tồn tại chưa
            raise forms.ValidationError('email đã tồn tại')
        return email
    def clean_name(self):
        name = self.cleaned_data['name']
        if Login_Register.objects.filter(name = name).exists():
            raise forms.ValidationError('tên đã tồn tại')
        return name
    def clean_avatar(self):
        avatar = self.cleaned_data.get('avatar')
        if avatar:
            if not avatar.content_type.startswith('image'):
                raise forms.ValidationError('File phải là hình ảnh ')
            if avatar.size > 1* 10424 *1024:
                raise forms.ValidationError('file không được quá 1 MB')
        return avatar
    def clean(self):
        cleaned_data = super().clean()
        # lấy các dữ liệu nhập vào 
        pw = cleaned_data.get('password')
        confirm_pw = cleaned_data.get('confirm_password')
        if pw and confirm_pw and pw != confirm_pw:
            raise forms.ValidationError('Mật khẩu không trùng khớp')
        return cleaned_data

    # cleaned_data['eamil'] và cleaned_data.get('avatar') nó đều là lấy dữ liệu nhưng cái 1 nếu không có dữ liệu sẽ báo lỗi còn cái 2 nếu không có dữ liệu thì trả về NOne không báo lỗi 

class LoginForm(forms.Form):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'class': 'form-control'}),
        error_messages={
            'required': 'Email không được để trống'
        }
    )

    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        error_messages={
            'required': 'Mật khẩu không được để trống'
        }
    )