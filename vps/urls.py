from django.urls import path, include, re_path

from . import views

app_name = 'vps'
urlpatterns = [
    # TODO ? Njogu probably changed something
    # # rest_api
    # path('<int:parking_sessions_id>/', views.detail, name='detail'),
    # # ex: /parking/5/results/
    # path('<int:parking_sessions_id>/results/', views.results, name='results'),
    # # ex: /parking/5/vote/
    # path('<int:parking_sessions_id>/vote/', views.vote, name='vote'),

    path('', views.index, name='index'),
    path('abstract/<int:pk>/view', views.occurrence_viewAbstract, name=f'view-abstract'),

    # country
    path('countries', views.countries, name='countries'), #c[R]ud
    path('create_country', views.create_country, name='create_country'),  
    path('country_update/<item_id>', views.country_update, name='country_update'), #Cr[U]d
    path('country_delete/<item_id>', views.country_delete, name='country_delete'), #cru[D]

    path('api', views.api_root),
    path('api/v0/', include('vps.rest_api.v0.urls')),

    # SUSPENDED
    # ! For now don't be too nice. Wrong URL should be treated as an illegal move
    # TODO https://stackoverflow.com/questions/51084909/how-can-i-use-a-catch-all-route-using-path-or-re-path-so-that-django-passes
    # path('<path:resource>', views.index, name='remaining_urls'),
    # TODO https://stackoverflow.com/a/6259570/10401826
    # for non-api calls take them to react app to avoid 404 errors when you reload the browser
    re_path(r'^((?!api).)*$', views.index, name='remaining_urls'),
]