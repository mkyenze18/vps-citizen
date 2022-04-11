from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = 'user'
urlpatterns =[
    path('register', views.register, name='register'),

    path('', views.users, name='users'), #c[R]ud
    # path('users_form', views.users_form, name='users_form'), #[C]r[U]d
    # path('users_form/<user_id>', views.users_form, name='users_form'), #[C]r[U]d
    path('create', views.users_create, name='users_create'), #[C]rUd
    path('update/<user_id>', views.users_update, name='users_update'), #Cr[U]d
    path('delete/<user_id>', views.users_delete, name='users_delete'), #cru[D]

    path('api/users',
        views.user_list,
        name='user-list'),
    path('api/users/<int:pk>',
        views.user_detail,
        name='user-detail'),

    path(
        'password_reset/',
        auth_views.PasswordResetView.as_view(success_url='/user/password_reset/done'),
        name="password_reset"
    ),
    path('', include('django.contrib.auth.urls')), #https://docs.djangoproject.com/en/4.0/topics/auth/default/#using-the-views-1
]


from rest_framework.urlpatterns import format_suffix_patterns
# from snippets import views

urlpatterns += [
    
    path('api/users',
        views.user_list,
        name='user-list'),
    path('api/users/<int:pk>',
        views.user_detail,
        name='user-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

# https://www.django-rest-framework.org/api-guide/authentication/#generating-tokens
from rest_framework.authtoken import views
urlpatterns += [
    path('api-token-auth/', views.obtain_auth_token)
]