
# TODO https://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis/#making-sure-our-url-patterns-are-named
from unicodedata import name
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# from snippets import views

# # API endpoints
# urlpatterns = format_suffix_patterns([
#     path('', views.api_root),
#     path('snippets/',
#         views.SnippetList.as_view(),
#         name='snippet-list'),
#     path('snippets/<int:pk>/',
#         views.SnippetDetail.as_view(),
#         name='snippet-detail'),
#     path('snippets/<int:pk>/highlight/',
#         views.SnippetHighlight.as_view(),
#         name='snippet-highlight'),
#     path('users/',
#         views.UserList.as_view(),
#         name='user-list'),
#     path('users/<int:pk>/',
#         views.UserDetail.as_view(),
#         name='user-detail')
# ])

from . import name_prefix as pre
from . import views

urlpatterns = [
    path('', views.api_root, name=pre),

    path('swagger',
        views.swagger,
        name=f'{pre}-swagger'),

    path('genders',
        views.gender_list,
        name=f'{pre}-gender-list'),
    path('genders/<int:pk>',
        views.gender_detail,
        name=f'{pre}-gender-detail'),
    
    path('countries',
        views.country_list,
        name=f'{pre}-country-list'),
    path('countries/<int:pk>',
        views.country_detail,
        name=f'{pre}-country-detail'),

    path('iprs-persons',
        views.iprsPerson_list,
        name=f'{pre}-iprs-person-list'),
    path('iprs-persons/<int:pk>',
        views.iprsPerson_detail,
        name=f'{pre}-iprs-person-detail'),
    path('iprs-persons/<int:pk>/reset-mug',
        views.iprsPerson_restMug,
        name=f'{pre}-iprs-person-reset-mug'),

    path('ranks',
        views.rank_list,
        name=f'{pre}-rank-list'),
    path('ranks/<int:pk>',
        views.rank_detail,
        name=f'{pre}-rank-detail'),

    path('police-stations',
        views.policeStation_list,
        name=f'{pre}-police-station-list'),
    path('police-stations/<int:pk>',
        views.policeStation_detail,
        name=f'{pre}-police-station-detail'),

    path('police-officers',
        views.policeOfficer_list,
        name=f'{pre}-police-officer-list'),
    path('police-officers/<int:pk>',
        views.policeOfficer_detail,
        name=f'{pre}-police-officer-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)