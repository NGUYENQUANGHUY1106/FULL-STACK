from django import forms
from .models import Blog

class add_Blog(forms.ModelForm):

    class Meta :
        model = Blog

        fields = [
            "title",
            "description",
            "content",
            "image",
            "author"
        ]

        widgets = {
            "title" : forms.TextInput(),
            "description" : forms.TextInput(),
            "content" : forms.TextInput(),
            "image" : forms.FileInput(),
            "author" : forms.Select(),

        }