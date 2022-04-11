from django.urls import path

from . import views

app_name = 'swagger'
urlpatterns = [
    path('', views.index, name='index'),
]