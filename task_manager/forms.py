from django.db import models
from django.forms import ModelForm, Select

from django.contrib.auth.models import User
from .models import Task

class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ['id', 'title', 'assigned_to', 'assigned_by', 'created_by', 'status', 'deadline']
        widgets = {
            'assigned_to': Select(attrs={'class': 'form-control'}),
            'status': Select(attrs={'class': 'form-control'}),
        }