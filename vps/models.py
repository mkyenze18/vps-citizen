from django.db import models
from django.contrib.auth.models import User

# TODO https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.FileField.upload_to
from helpers.upload_file_name import (IPRS_person_mugshot_directory_path,
arrestee_mugshot_directory_path, policeOfficer_mugshot_directory_path,
arrestee_fingerprint_directory_path, evidence_image_directory_path)

# Create your models here.

class Gender(models.Model):
    name = models.CharField(max_length=30, unique=True)

class Country(models.Model):
    name = models.CharField(max_length=30, unique=True)
    nationality = models.CharField(max_length=30)
    
class IPRS_Person(models.Model):
    id_no = models.CharField(max_length=100, null=True, blank=True) # ! should be unique?
    passport_no = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100)
    gender = models.ForeignKey(Gender, on_delete=models.PROTECT)
    nationality = models.ForeignKey(Country, on_delete=models.PROTECT)
    county_of_birth = models.CharField(max_length=30, null=True, blank=True)
    district_of_birth = models.CharField(max_length=30, null=True, blank=True)
    division_of_birth = models.CharField(max_length=30, null=True, blank=True)
    location_of_birth = models.CharField(max_length=30, null=True, blank=True)
    date_of_birth = models.DateTimeField()
    mug_shot = models.ImageField(upload_to=IPRS_person_mugshot_directory_path, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.middle_name} {self.last_name}"

class PoliceStation(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

class Rank(models.Model):
    name = models.CharField(max_length=30, unique=True)
    
class PoliceOfficer(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, null=True, blank=True) # The assumption here is that not all police office profiles are login accounts?
    iprs_person = models.OneToOneField(IPRS_Person, on_delete=models.PROTECT)
    service_number = models.CharField(max_length=100)
    email_address = models.EmailField()
    mobile_phone = models.CharField(max_length=30)
    rank = models.ForeignKey(Rank, on_delete=models.PROTECT)
    # date_of_retirement = models.DateTimeField()
    # date_of_death = models.DateTimeField()
    police_station = models.OneToOneField(PoliceStation, on_delete=models.PROTECT, null=True, blank=True)
    mug_shot = models.ImageField(upload_to=policeOfficer_mugshot_directory_path, null=True, blank=True)

# ! Focus on OB (report) module
class OccurrenceCategory(models.Model):
    name = models.CharField(max_length=100)

class OccurrenceCategoryInput(models.Model):
    occurrence_category = models.ForeignKey(OccurrenceCategory, on_delete=models.PROTECT)
    label = models.CharField(max_length=100)
    type = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    choices = models.TextField(null=True, blank=True)
    order = models.IntegerField(default=0)

class Occurrence(models.Model):
    ob_no = models.CharField(max_length=30, null=True, blank=True)
    location = models.CharField(max_length=100)
    police_station = models.ForeignKey(PoliceStation, on_delete=models.PROTECT)
    police_officer = models.ForeignKey(PoliceOfficer, on_delete=models.PROTECT)
    module = models.CharField(max_length=30)
    is_closed = models.BooleanField(default=False)
    posted_date = models.DateTimeField(auto_now_add=True)

class OccurrenceDetail(models.Model):
    occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT, related_name='details')
    category = models.ForeignKey(OccurrenceCategory, on_delete=models.PROTECT)
    details = models.JSONField()

class Reporter(models.Model):
    occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT, related_name='reporters')
    iprs_person = models.ForeignKey(IPRS_Person, on_delete=models.PROTECT)
    phone_number = models.CharField(max_length=30)
    email_address = models.EmailField()
    county_of_residence = models.CharField(max_length=100)
    sub_county_of_residence = models.CharField(max_length=100)

# SUSPENDED
# class BuglaryOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)
#     description = models.TextField()
#     location = models.TextField()

# class StolenItemOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)
#     items = models.ManyToManyField(Item)

# class Missing_or_lost_persons_Occurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class Inquest_or_death_Occurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class StolenVehicleOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class Sexual_and_GBV_Occurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class AssaultOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class ArsonOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class MurderOccurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# class Robery_or_Theft_Occurrence(models.Model):
#     occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)

# ! Focus on arrest module
# ? Focus on cell module
class PoliceCell(models.Model):
    reference_no = models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    police_station = models.ForeignKey(PoliceStation, on_delete=models.PROTECT)

# ? Focus on warrant module
class Warrant_of_arrest(models.Model):
    reference_no = models.CharField(max_length=30)

class Arrestee(models.Model):
    iprs_person = models.ForeignKey(IPRS_Person, on_delete=models.PROTECT)
    phone_number = models.CharField(max_length=100)
    county_of_residence = models.CharField(max_length=100)
    constituency_of_residence = models.CharField(max_length=100)
    remarks = models.TextField()
    occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)
    age = models.IntegerField()
    warrant = models.ForeignKey(Warrant_of_arrest, on_delete=models.PROTECT)
    cell = models.ForeignKey(PoliceCell, on_delete=models.PROTECT)
    posted_date = models.DateTimeField()

class Next_of_keen(models.Model):
    arrestee = models.ForeignKey(Arrestee, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=30)
    relationship = models.CharField(max_length=30)

class MugShots(models.Model):
    arrestee = models.ForeignKey(Arrestee, on_delete=models.PROTECT)
    left_view = models.ImageField(upload_to=arrestee_mugshot_directory_path)
    front_view = models.ImageField(upload_to=arrestee_mugshot_directory_path)
    right_view = models.ImageField(upload_to=arrestee_mugshot_directory_path)

class FingerPrints(models.Model):
    arrestee = models.ForeignKey(Arrestee, on_delete=models.PROTECT)
    thumb = models.ImageField(upload_to=arrestee_fingerprint_directory_path)
    left_hand = models.ImageField(upload_to=arrestee_fingerprint_directory_path)
    right_hand = models.ImageField(upload_to=arrestee_fingerprint_directory_path)

# ! Focus on charge sheet module
class Offense(models.Model):
    code = models.CharField(max_length=100)
    description = models.TextField()

class ChargeSheet_Person(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField()

class ChargeSheet(models.Model):
    occurrence = models.ForeignKey(Occurrence, on_delete=models.PROTECT)
    complainant = models.ManyToManyField(ChargeSheet_Person, related_name='complainant')
    witness = models.ManyToManyField(ChargeSheet_Person, related_name='witness')
    offense = models.ForeignKey(Offense, on_delete=models.PROTECT) # manytomany?

class CourtFile(models.Model):
    charge_sheet = models.ForeignKey(ChargeSheet, on_delete=models.PROTECT)
    court_file_no = models.CharField(max_length=100)
    sentence_court = models.CharField(max_length=100)
    date_of_mentioning = models.DateTimeField()
    date_of_sentencing = models.DateTimeField()

# ! Focus on evidence module
class EvidenceCategory(models.Model):
    name = models.CharField(max_length=100)

class EvidenceItemCategory(models.Model):
    name = models.CharField(max_length=100)
    makes = models.TextField(null=True, blank=True)
    item_models = models.JSONField(null=True, blank=True)
    units = models.TextField(null=True, blank=True)

class Evidence(models.Model):
    evidence_no = models.CharField(max_length=30, null=True, blank=True)
    evidence_category = models.ForeignKey(EvidenceCategory, on_delete=models.PROTECT)
    # count = models.FloatField() # Quantity
    officer_incharge = models.ForeignKey(PoliceOfficer, related_name='officer_incharge', on_delete=models.PROTECT)
    officers_involved = models.ManyToManyField(PoliceOfficer, related_name='officers_involved')
    location = models.CharField(max_length=100)
    item_category = models.ForeignKey(EvidenceItemCategory, on_delete=models.PROTECT)
    make = models.CharField(max_length=30, null=True, blank=True)
    model = models.CharField(max_length=100, null=True, blank=True) # Item type
    unit = models.CharField(max_length=30, null=True, blank=True)
    quantity = models.FloatField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    serial_no = models.CharField(max_length=100, null=True, blank=True)
    posted_date = models.DateTimeField(auto_now_add=True)
    
class EvidenceItemImage(models.Model):
    evidence = models.ForeignKey(Evidence, on_delete=models.PROTECT)
    image = models.ImageField(upload_to=evidence_image_directory_path, null=True, blank=True)




class TrafficOffender(models.Model):
    id_no = models.CharField(max_length=8)
    dl_number = models.CharField(max_length= 20)
    full_name = models.CharField(max_length= 200)
    gender = models.ForeignKey(Gender, on_delete=models.PROTECT)
    phone = models.CharField(max_length= 20)
    nationality = models.ForeignKey(Country, on_delete=models.PROTECT)
    county = models.CharField(max_length=30)
    constituency = models.CharField(max_length= 40)
    expiry_date = models.DateTimeField()
    email = models.EmailField()
    age = models.CharField(max_length=8)
    image = models.ImageField(upload_to=evidence_image_directory_path)
    vehicle_reg_no = models.CharField(max_length= 50)
    vehicle_identification_no = models.CharField(max_length=50)
    make = models.CharField(max_length= 50)
    model = models.CharField(max_length=50)
    color = models.CharField(max_length= 50)
    organization_attached_to = models.CharField(max_length=50)