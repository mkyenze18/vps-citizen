from django.contrib import admin

from .models import (Gender, Country, IPRS_Person, Rank, PoliceStation, PoliceOfficer,
OccurrenceCategory, OccurrenceCategoryInput, Occurrence, OccurrenceDetail, Reporter, UnregisteredReporter,
PoliceCell, Warrant_of_arrest, Arrestee, Accomplice, Gang, Next_of_kin, MugShots, FingerPrints,
EvidenceCategory, EvidenceItemCategory, Evidence, EvidenceItemImage,
Vehicle, Inspection, TrafficSubject, UnregisteredTrafficSubject,
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

class PoliceOfficerAdmin(admin.ModelAdmin):
    list_display = ('id', 'iprs_person', 'service_number', 'rank')
admin.site.register(PoliceOfficer, PoliceOfficerAdmin)

# ! Focus on OB (report) module
admin.site.register(OccurrenceCategory)

class OccurrenceCategoryInputAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'type', 'dependency', 'dependency_value')
    list_filter = ['dependency']
admin.site.register(OccurrenceCategoryInput, OccurrenceCategoryInputAdmin)

class OccurrenceAdmin(admin.ModelAdmin):
    list_display = ('id', 'ob_no')
admin.site.register(Occurrence, OccurrenceAdmin)

admin.site.register(OccurrenceDetail)
admin.site.register(Reporter)
admin.site.register(UnregisteredReporter)

# ! Focus on arrest module
admin.site.register(PoliceCell)
admin.site.register(Warrant_of_arrest)
admin.site.register(Arrestee)
admin.site.register(Accomplice)
admin.site.register(Gang)
admin.site.register(Next_of_kin)
admin.site.register(MugShots)
admin.site.register(FingerPrints)

# ! Focus on evidence module
admin.site.register(EvidenceCategory)
admin.site.register(EvidenceItemCategory)
admin.site.register(Evidence)
admin.site.register(EvidenceItemImage)

# ! Focus on traffic module
admin.site.register(Vehicle)
admin.site.register(Inspection)
admin.site.register(TrafficSubject)
admin.site.register(UnregisteredTrafficSubject)

# ! Focus on permission module
class PermissionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('module', 'name', 'value')
admin.site.register(PermissionModule)
admin.site.register(Permission, PermissionAdmin)