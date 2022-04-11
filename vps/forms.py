from django import forms
from django.utils.translation import gettext_lazy as _
from django.forms import Textarea , DateTimeField 

from.models import Country

class Country_Form(forms.ModelForm):
    class Meta:
        model = Country
        fields = ['name', 'nationality']
