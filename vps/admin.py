from django.contrib import admin

from .models import (Country, IPRS_Person, Rank, PoliceStation, PoliceOfficer,
ItemCategory, Item
)
# Register your models here.

# admin.site.register(Questionnaire)
# class QuestionnairesAdmin(admin.ModelAdmin):
#     # ...
#     list_display = ('label', 'is_live')

# admin.site.register(Questionnaire, QuestionnairesAdmin)
admin.site.register(Country)
admin.site.register(IPRS_Person)
admin.site.register(Rank)
admin.site.register(PoliceStation)
admin.site.register(PoliceOfficer)