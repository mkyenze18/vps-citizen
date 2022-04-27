
# TODO https://www.django-rest-framework.org/tutorial/1-serialization/#creating-a-serializer-class

from rest_framework import serializers
# from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES


# class SnippetSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(required=False, allow_blank=True, max_length=100)
#     code = serializers.CharField(style={'base_template': 'textarea.html'})
#     linenos = serializers.BooleanField(required=False)
#     language = serializers.ChoiceField(choices=LANGUAGE_CHOICES, default='python')
#     style = serializers.ChoiceField(choices=STYLE_CHOICES, default='friendly')

#     def create(self, validated_data):
#         """
#         Create and return a new `Snippet` instance, given the validated data.
#         """
#         return Snippet.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         """
#         Update and return an existing `Snippet` instance, given the validated data.
#         """
#         instance.title = validated_data.get('title', instance.title)
#         instance.code = validated_data.get('code', instance.code)
#         instance.linenos = validated_data.get('linenos', instance.linenos)
#         instance.language = validated_data.get('language', instance.language)
#         instance.style = validated_data.get('style', instance.style)
#         instance.save()
#         return instance

# TODO https://www.django-rest-framework.org/tutorial/1-serialization/#using-modelserializers
# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ['id', 'title', 'code', 'linenos', 'language', 'style']

from vps.models import (Arrestee, Country, Evidence, EvidenceCategory, EvidenceImage, Gender, IPRS_Person, MugShots, Next_of_keen, Occurrence, OccurrenceCategory, Rank, PoliceStation, PoliceOfficer,
ItemCategory, Item
)
from vps.rest_api.v0.common.serializers import BaseModelSerializer

class GenderSerializer(serializers.ModelSerializer):
    # TODO https://www.django-rest-framework.org/api-guide/relations/#primarykeyrelatedfield
    # questions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Gender
        fields = ['id', 'name']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'nationality']

class IPRS_PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPRS_Person
        fields = ['id', 'id_no', 'passport_no',
                'first_name', 'middle_name', 'last_name', 'nationality', 'gender',
                'nationality', 'county_of_birth', 'district_of_birth', 'division_of_birth',
                'location_of_birth', 'date_of_birth', 'mug_shot']

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = ['id', 'name']

class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation
        fields = ['id', 'name', 'country', 'location']

class PoliceOfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceOfficer
        fields = ['id', 'user', 'iprs_person', 'service_number', 'email_address',
        'mobile_phone', 'rank', 'mug_shot']


class ItemCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = ItemCategory

class ItemSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Item

class EvidenceSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Evidence

class EvidenceCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = EvidenceCategory

class EvidenceImageSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = EvidenceImage
class OccurrenceSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Occurrence

class OccurrenceCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = OccurrenceCategory

class ArresteeSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Arrestee

class NextofkeenSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Next_of_keen

class MugShotsSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = MugShots


