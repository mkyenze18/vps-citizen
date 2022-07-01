from django.contrib import admin

from .models import (Gender, Country, IPRS_Person, Rank, PoliceStation, PoliceOfficer,
EvidenceCategory, EvidenceItemCategory, Evidence, EvidenceItemImage
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

admin.site.register(EvidenceCategory)
admin.site.register(EvidenceItemCategory)
admin.site.register(Evidence)
admin.site.register(EvidenceItemImage)