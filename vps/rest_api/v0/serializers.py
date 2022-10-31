
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

from django.contrib.auth.models import User
from vps.models import (
    Driver, Gender, Country, IPRS_Person, PoliceStation, Rank, PoliceOfficer,
    OccurrenceCategory, OccurrenceCategoryInput, Occurrence, OccurrenceDetail, Reporter, UnregisteredReporter,
    PoliceCell, TrafficOffender, Vehicle, Warrant_of_arrest, Arrestee, Accomplice, Gang, Next_of_kin,
    MugShots, FingerPrints,
    Offense, ChargeSheet_Person, ChargeSheet, CourtFile,
    EvidenceCategory, Evidence, EvidenceItemCategory, EvidenceItemImage
)
from vps.rest_api.v0.common.serializers import BaseModelSerializer

class UserSerializer(serializers.ModelSerializer):
    # TODO https://www.django-rest-framework.org/api-guide/relations/#primarykeyrelatedfield
    # questions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username']
        read_only_fields = ['username']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'nationality']

class GenderSerializer(serializers.ModelSerializer):
    # TODO https://www.django-rest-framework.org/api-guide/relations/#primarykeyrelatedfield
    # questions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Gender
        fields = ['id', 'name']
        
class IPRS_PersonSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = IPRS_Person
        fields = ['id', 'id_no', 'passport_no',
                'first_name', 'middle_name', 'last_name', 'nationality', 'gender',
                'county_of_birth', 'district_of_birth', 'division_of_birth',
                'location_of_birth', 'date_of_birth', 'mug_shot']
        depth = 1

class IPRS_PersonSerializerWrite(serializers.ModelSerializer):
    class Meta:
        model = IPRS_Person
        fields = ['id', 'id_no', 'passport_no',
                'first_name', 'middle_name', 'last_name', 'nationality', 'gender',
                'county_of_birth', 'district_of_birth', 'division_of_birth',
                'location_of_birth', 'date_of_birth', 'mug_shot']

class RankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rank
        fields = ['id', 'name']

class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation
        fields = ['id', 'name', 'country', 'location']

class PoliceOfficerReadSerializer(serializers.ModelSerializer):
    # exclude user details when reading police officer object
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    user = UserSerializer()
    
    class Meta:
        model = PoliceOfficer
        fields = ['id', 'user', 'iprs_person', 'service_number', 'email_address',
        'mobile_phone', 'rank', 'police_station', 'mug_shot']
        depth = 1

class PoliceOfficerWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceOfficer
        fields = ['id', 'user', 'iprs_person', 'service_number', 'email_address',
        'mobile_phone', 'rank', 'police_station', 'mug_shot']

# ! Focus on OB (report) module
class OccurrenceCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = OccurrenceCategory

class OccurrenceCategoryInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = OccurrenceCategoryInput
        fields = ['id', 'occurrence_category', 'label', 'type', 'name', 'order', 'choices', 'required' ]

class OccurrenceReadSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Occurrence
        fields  = ["id", "ob_no", "narrative", "location", "police_station", "police_officer", "module", "is_closed",
                    "reporters", "unregistered_reporters", "details", 'is_complete',
                    "posted_date"] # TODO https://www.django-rest-framework.org/api-guide/relations/#reverse-relations
        depth = 2

class OccurrenceWriteSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Occurrence

class OccurrenceDetailSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = OccurrenceDetail

class ReporterSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Reporter
        fields = ['id', 'occurrence', 'iprs_person', 'phone_number', 'email_address',
        'county_of_residence', 'sub_county_of_residence']

class UnregisteredReporterSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = UnregisteredReporter
        fields = ['id',
        'id_no', 'passport_no', 'first_name', 'middle_name', 'last_name',
        'gender', 'nationality', 'county_of_birth', 'district_of_birth',
        'division_of_birth', 'location_of_birth', 'date_of_birth',
        'occurrence', 'phone_number', 'email_address',
        'county_of_residence', 'sub_county_of_residence', 'constituency_of_residence',
        'ward_of_residence', 'comments']

# ! Focus on arrest module
class PoliceCellSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = PoliceCell

class WarrantofarrestSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Warrant_of_arrest

class ArresteeReadSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Arrestee
        depth = 2

class ArresteeWriteSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Arrestee

class AccompliceSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Accomplice

class GangSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Gang

class NextofkinSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Next_of_kin

class MugShotsSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = MugShots

class FingerPrintsSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = FingerPrints

# ! Focus on charge sheet module
class OffenseSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Offense

class ChargeSheetSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = ChargeSheet

class ChargeSheetPersonSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = ChargeSheet_Person

class CourtFileSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = CourtFile

# ! Focus on evidence module
class EvidenceCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = EvidenceCategory

class EvidenceReadSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Evidence
        depth=2

class EvidenceWriteSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Evidence

class EvidenceItemCategorySerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = EvidenceItemCategory

class EvidenceItemImageSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = EvidenceItemImage

# ! Focus on traffic module
class TrafficOffenderDetailsSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = TrafficOffender


class DriverSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Driver


class VehicleSerializer(BaseModelSerializer):
    """
    """

    class Meta(BaseModelSerializer.Meta):
        model = Vehicle


