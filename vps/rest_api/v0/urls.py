
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

    path("users", 
        views.UserListView.as_view(), 
        name=f'{pre}-user-list'),

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

    path('police-stations',
        views.policeStation_list,
        name=f'{pre}-police-station-list'),
    path('police-stations/<int:pk>',
        views.policeStation_detail,
        name=f'{pre}-police-station-detail'),

    path('ranks',
        views.rank_list,
        name=f'{pre}-rank-list'),
    path('ranks/<int:pk>',
        views.rank_detail,
        name=f'{pre}-rank-detail'),
        
    path('police-officers',
        views.policeOfficer_list,
        name=f'{pre}-police-officer-list'),
    path('police-officers/<int:pk>',
        views.policeOfficer_detail,
        name=f'{pre}-police-officer-detail'),
    path('police-officers/<int:pk>/reset-mug',
        views.policeOfficer_restMug,
        name=f'{pre}-police-officers-reset-mug'),

    # ! Focus on OB (report) module
    path("occurrence-categories", 
        views.OccurrenceCategoryListView.as_view(), 
        name=f'{pre}-occurrence-category-list'), 
    path("occurrence-categories/<int:pk>", 
        views.OccurrenceCategoryDetailView.as_view(), 
        name=f'{pre}-occurrence-category-details'),

    path("occurrence-category-inputs", 
        views.OccurrenceCategoryInputListView.as_view(), 
        name=f'{pre}-occurrence-category-input-list'), 
    path("occurrence-category-inputs/<int:pk>", 
        views.OccurrenceCategoryInputDetailView.as_view(), 
        name=f'{pre}-occurrence-category-input-details'),

    path("occurrences", 
        views.OccurrenceListView.as_view(), 
        name=f'{pre}-occurrence-list'), 
    path("occurrences/<int:pk>", 
        views.OccurrenceDetailView.as_view(), 
        name=f'{pre}-occurrence-details'),
    path('occurrences/<int:pk>/email-abstract',
        views.occurrence_emailAbstract,
        name=f'{pre}-occurrence-email-abstract'),

    path("occurrence-details", 
        views.OccurrenceDetailListView.as_view(), 
        name=f'{pre}-occurrence-detail-list'), 
    path("occurrence-details/<int:pk>", 
        views.OccurrenceDetailDetailView.as_view(), 
        name=f'{pre}-occurrence-detail-details'),

    path("reporters", 
        views.ReporterListView.as_view(), 
        name=f'{pre}-reporter-list'),
    path("reporters/<int:pk>", 
        views.ReporterDetailView.as_view(), 
        name=f'{pre}-reporter-detail'),

    # ! Focus on arrest module
    path("police-cells", 
        views.PoliceCellListView.as_view(), 
        name=f'{pre}-police-cell-list'), 
    path("police-cells/<int:pk>", 
        views.PoliceCellDetailView.as_view(), 
        name=f'{pre}-police-cell-details'),

    path("warrants-of-arrest", 
        views.WarrantofarrestListView.as_view(), 
        name=f'{pre}-warrant-of-arrest-list'), 
    path("warrants-of-arrest/<int:pk>", 
        views.WarrantofarrestDetailView.as_view(), 
        name=f'{pre}-warrant-of-arrest-details'),

    path("arrestees", 
        views.ArresteeListView.as_view(), 
        name=f'{pre}-arrestee-list'), 
    path("arrestees/<int:pk>", 
        views.ArresteeDetailView.as_view(), 
        name=f'{pre}-arrestee-details'), 

    path("next-of-keen", 
        views.NextofkeenListView.as_view(), 
        name=f'{pre}-next-of-keen-list'), 
    path("next-of-keen/<int:pk>", 
        views.NextofkeenDetailView.as_view(), 
        name=f'{pre}-next-of-keen-details'),

    path("mugshots", 
        views.MugShotsListView.as_view(), 
        name=f'{pre}-mugshot-list'), 
    path("mugshots/<int:pk>", 
        views.MugShotsDetailView.as_view(), 
        name=f'{pre}-mugshot-details'),

    path("fingerprints", 
        views.FingerPrintsListView.as_view(), 
        name=f'{pre}-fingerprint-list'), 
    path("fingerprints/<int:pk>", 
        views.FingerPrintsDetailView.as_view(), 
        name=f'{pre}-fingerprint-details'),
      
    # ! Focus on charge sheet module
    path("offences", 
        views.OffenseListView.as_view(), 
        name=f'{pre}-offence-list'), 
    path("offences/<int:pk>", 
        views.OffenseDetailView.as_view(), 
        name=f'{pre}-offence-details'),

    path("charge-sheet-persons", 
        views.ChargeSheetPersonListView.as_view(), 
        name=f'{pre}-charge-sheet-person-list'), 
    path("charge-sheet-persons/<int:pk>", 
        views.ChargeSheetPersonDetailView.as_view(), 
        name=f'{pre}-charge-sheet-person-details'),

    path("charge-sheets", 
        views.ChargeSheetListView.as_view(), 
        name=f'{pre}-charge-sheet-list'), 
    path("charge-sheets/<int:pk>", 
        views.ChargeSheetDetailView.as_view(), 
        name=f'{pre}-charge-sheet-details'),

    path("courtfiles", 
        views.CourtFileListView.as_view(), 
        name=f'{pre}-court-file-list'), 
    path("courtfiles/<int:pk>", 
        views.CourtFileDetailView.as_view(), 
        name=f'{pre}-court-file-details'),
    
    # ! Focus on evidence module
    path("evidence-categories", 
        views.EvidenceCategoryListView.as_view(), 
        name=f'{pre}-evidence-category-list'), 
    path("evidence-categories/<int:pk>", 
        views.EvidenceCategoryDetailView.as_view(), 
        name=f'{pre}-evidence-category-details'),

    path("evidences", 
        views.EvidenceListView.as_view(), 
        name=f'{pre}-evidence-list'), 
    path("evidences/<int:pk>", 
        views.EvidenceDetailView.as_view(), 
        name=f'{pre}-evidence-details'),

    path("evidence-item-categories", 
        views.EvidenceItemCategoryListView.as_view(), 
        name=f'{pre}-evidence-item-category-list'), 
    path("evidence-item-categories/<int:pk>", 
        views.EvidenceItemCategoryDetailView.as_view(), 
        name=f'{pre}-item-category-details'),

    path("evidence-item-images", 
        views.EvidenceImageListView.as_view(), 
        name=f'{pre}-evidence-item-image-list'), 
    path("evidence-item-images/<int:pk>", 
        views.EvidenceImageDetailView.as_view(), 
        name=f'{pre}-evidence-item-image-details'),
]

urlpatterns = format_suffix_patterns(urlpatterns)