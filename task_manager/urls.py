from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'task_manager'
urlpatterns =[
    path('tasks', views.tasks, name='tasks'), #c[R]ud
    path('tasks_create', views.tasks_create, name='tasks_create'), #[C]rUd
    path('tasks_update/<item_id>', views.tasks_update, name='tasks_update'), #Cr[U]d
    path('tasks_delete/<item_id>', views.tasks_delete, name='tasks_delete'), #cru[D]
]

urlpatterns += [
    path('api/', views.api_root),
    
    path('api/tasks',
        views.task_list,
        name='task-list'),
    path('api/tasks/<int:pk>',
        views.task_detail,
        name='task-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)