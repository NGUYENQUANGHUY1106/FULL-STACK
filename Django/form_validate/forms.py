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
        error_messages={'required': 'Tên không được bỏ trống',
                        'min_length': 'tên phải có ít nhất 6 ký tự',
                        'max_length' : 'tên không được quá 50 ký tự'}
    )
    avatar = forms.ImageField(
        error_messages={'required' : 'Bạn cần chọn file hình ảnh'}
    )
    phone = forms.CharField(
        error_messages={'required' : 'số điện thoại không được bỏ trống'}
    )
    password = forms.CharField(widget=forms.PasswordInput,
                               error_messages={
                                   'required' : "Mật khẩu không được bỏ trống"
                               })
    confirm_password = forms.CharField(widget=forms.PasswordInput,
                                       error_messages={
                                           'required' : 'Mật khẩu xác nhận không được bỏ trống'
                                       })

    # hàm clean 

    def clean_email(self):
        email = self.cleaned_data['email']
        if Product.objects.filter(email = email).exists():
            raise forms.ValidationError("Email đã tồn tại")
        return email
    
    def clean_username(self):
        username = self.cleaned_data['username']
        if Product.objects.filter(username = username).exists():
            # lọc từ database ra xem tên đã tồn tại chưa bằng filter
            raise forms.ValidationError("Tên đã tồn tại")
        return username

    def clean_avatar(self):
        avatar = self.cleaned_data.get('avatar')
        if avatar:
            if not avatar.content_type.startswith('image'):
                # kiểu tra xem file đó có phải dạng hình ảnh k 
                raise forms.ValidationError("File phải là hình ảnh")
            if avatar.size  > 1 * 1024 *1024 :
                raise forms.ValidationError('file phải nhỏ hơn 1 MB')
        return avatar
    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if not phone.isdigit():
            # isdigt : kiểm tra xem số điện thoại có chưa chữ k \
            raise forms.ValidationError("số điện thoại chỉ được chứa số")
        return phone
    # kiểm tra mật khẩu có khớp k 
    def clean(self):
        cleaned_data = super().clean() 
        #  lấy các dữ liệu nhập vào lưu vào cleaned_data
        pw = cleaned_data.get('password')
        confirm_pw = cleaned_data.get('confirm_password')
        if pw and confirm_pw and pw!= confirm_pw:
            raise forms.ValidationError("mật khẩu không trùng khớp")
        return cleaned_data