from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    TASK_STATUS = (
        ('OP', 'open'),
        ('CL', 'closed'),
        ('IP', 'in-progress'),
        ('PE', 'pending'),
    )
    title = models.CharField(max_length=255)
    assigned_to = models.ManyToManyField(User, related_name='assigned_to', blank=True)
    assigned_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='assigned_by', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='created_by', null=True, blank=True)
    status = models.CharField(max_length=2, choices=TASK_STATUS, default='PE') # TODO https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.Field.choices
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    supervised_by = models.ManyToManyField(User, related_name='supervised_by')