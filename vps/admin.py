from django.contrib import admin

from .models import (Gender, Country, IPRS_Person, Rank, PoliceStation, PoliceOfficer,
OccurrenceCategory, OccurrenceCategoryInput, Occurrence, OccurrenceDetail, Reporter, UnregisteredReporter,
EvidenceCategory, EvidenceItemCategory, Evidence, EvidenceItemImage,
PermissionModule, Permission
)
# Register your models here.

# admin.site.register(Questionnaire)
# class QuestionnairesAdmin(admin.ModelAdmin):
#     # ...
#     list_display = ('label', 'is_live')

# admin.site.register(Questionnaire, QuestionnairesAdmin)
admin.site.register(Gender)
admin.site.register(Country)
admin.site.register(IPRS_Person)
admin.site.register(PoliceStation)
admin.site.register(Rank)
admin.site.register(PoliceOfficer)

admin.site.register(OccurrenceCategory)
admin.site.register(OccurrenceCategoryInput)
admin.site.register(Occurrence)
admin.site.register(OccurrenceDetail)
admin.site.register(Reporter)
admin.site.register(UnregisteredReporter)

admin.site.register(EvidenceCategory)
admin.site.register(EvidenceItemCategory)
admin.site.register(Evidence)
admin.site.register(EvidenceItemImage)

class PermissionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('module', 'name', 'value')
admin.site.register(PermissionModule)
admin.site.register(Permission, PermissionAdmin)