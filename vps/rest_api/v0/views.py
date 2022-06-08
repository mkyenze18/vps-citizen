from pickle import FALSE
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# TODO https://www.django-rest-framework.org/tutorial/1-serialization/#writing-regular-django-views-using-our-serializer
# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser
# from snippets.models import Snippet
# from .serializers import SnippetSerializer

# @csrf_exempt
# def snippet_list(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         snippets = Snippet.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = SnippetSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

# @csrf_exempt
# def snippet_detail(request, pk):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         snippet = Snippet.objects.get(pk=pk)
#     except Snippet.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = SnippetSerializer(snippet)
#         return JsonResponse(serializer.data)

#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         serializer = SnippetSerializer(snippet, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)

#     elif request.method == 'DELETE':
#         snippet.delete()
#         return HttpResponse(status=204)

# TODO https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#pulling-it-all-together
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timezone, date
# from snippets.models import Snippet
# from snippets.serializers import SnippetSerializer


# @api_view(['GET', 'POST'])
# def snippet_list(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         snippets = Snippet.objects.all()
#         serializer = SnippetSerializer(snippets, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = SnippetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def snippet_detail(request, pk):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         snippet = Snippet.objects.get(pk=pk)
#     except Snippet.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = SnippetSerializer(snippet)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = SnippetSerializer(snippet, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         snippet.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# TODO https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#adding-optional-format-suffixes-to-our-urls
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.mail import send_mass_mail
from django.core.mail import EmailMessage
from django.conf import settings


from vps.models import (
    Arrestee, ChargeSheet, ChargeSheet_Person, Country, CourtFile,
    Evidence, EvidenceCategory, EvidenceImage, FingerPrints, Gender, IPRS_Person, MugShots,
    Reporter, Next_of_keen, Occurrence, OccurrenceCategory, OccurrenceCategoryInput, OccurrenceDetail, 
    Offense, PoliceCell, Rank,
    PoliceStation, PoliceOfficer, ItemCategory, Item, Warrant_of_arrest
)
from helpers.file_system_manipulation import delete_folder_in_media
from vps.rest_api.v0.common.views import BaseDetailView, BaseListView, ImageBaseDetailView, ImageBaseListView
from .serializers import ( UserSerializer,
    ArresteeSerializer, ChargeSheetPersonSerializer, ChargeSheetSerializer,
    CountrySerializer, CourtFileSerializer, EvidenceCategorySerializer, EvidenceImageSerializer,
    EvidenceSerializer, FingerPrintsSerializer, GenderSerializer, IPRS_PersonSerializerRead, IPRS_PersonSerializerWrite,
    ItemCategorySerializer, ItemSerializer, MugShotsSerializer, ReporterSerializer, 
    NextofkeenSerializer,
    OccurrenceCategorySerializer, OccurrenceCategoryInputSerializer, OccurrenceWriteSerializer, OccurrenceReadSerializer,
    OccurrenceDetailSerializer, OffenseSerializer, PoliceCellSerializer, 
    RankSerializer, PoliceStationSerializer, PoliceOfficerReadSerializer, PoliceOfficerWriteSerializer,
    WarrantofarrestSerializer
)

import yaml
import json

import glob
import os
from . import name_prefix

from rest_framework import filters

# SWAGGER
def swagger(request):
    # TODO https://adamtheautomator.com/yaml-to-json/
    ## Import the modules to handle JSON & YAML
    # import yaml
    # import json
    
    ## Create a variable to hold the data to import
    swagger = {}

    # TODO https://stackoverflow.com/questions/28218174/current-directory-os-getcwd-from-within-django-determined-how
    root_dir = os.path.abspath(os.path.dirname(__file__))
    # TODO https://linuxize.com/post/python-get-change-current-working-directory/#:~:text=To%20find%20the%20current%20working,chdir(path)%20.
    os.chdir(root_dir)

    yaml_path = [os.path.normpath(i) for i in glob.glob("swagger.yaml")]

    if len(yaml_path):
        ## Read the YAML file
        # with open("c:\temp\operating-systems.yml") as infile:
        with open(yaml_path[0]) as infile:
            # Marshall the YAML into the variable defined above
            swagger = yaml.load(infile, Loader=yaml.FullLoader)

    swagger_json = json.dumps(swagger)

    context = {
        'name_prefix': name_prefix,
        "swagger_json": swagger_json
    }
    return render(request, 'vps/swagger.html', context)

# USER
class UserListView(BaseListView):
    """
    List all items, or create a new item.
    """
    model = User
    serializer_class = UserSerializer
    read_serializer_class = UserSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().get(request)

# GENDER
@api_view(['GET', 'POST'])
def gender_list(request, format=None):
    """
    List all genders, or create a gender.
    """
    if request.method == 'GET':
        resources = Gender.objects.all()
        serializer = GenderSerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = GenderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def gender_detail(request, pk, format=None):
    """
    Retrieve, update or delete a gender.
    """
    try:
        resource = Gender.objects.get(pk=pk)
    except Gender.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GenderSerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = GenderSerializer(resource, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

# COUNTRY
@api_view(['GET', 'POST'])
def country_list(request, format=None):
    """
    List all countries, or create a new country.
    """
    if request.method == 'GET':
        resources = Country.objects.all()
        serializer = CountrySerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def country_detail(request, pk, format=None):
    """
    Retrieve, update or delete a country.
    """
    try:
        resource = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CountrySerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CountrySerializer(resource, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

# IPRS PERSON
@api_view(['GET', 'POST'])
def iprsPerson_list(request, format=None):
    """
    List all IPRS persons, or create a new IPRS person.
    """
    if request.method == 'GET':
        resources = IPRS_Person.objects.all()

        id_no = request.query_params.get('id_no', None)
        if id_no:
            resources = resources.filter(id_no__icontains=id_no)

        passport_no = request.query_params.get('passport_no', None)
        if passport_no:
            resources = resources.filter(passport_no__icontains=passport_no)

        serializer = IPRS_PersonSerializerRead(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = IPRS_PersonSerializerWrite(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def iprsPerson_detail(request, pk, format=None):
    """
    Retrieve, update or delete a IPRS person.
    """
    try:
        resource = IPRS_Person.objects.get(pk=pk)
    except IPRS_Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = IPRS_PersonSerializerRead(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = IPRS_PersonSerializerWrite(resource, data=request.data, partial=True)
        if serializer.is_valid():

            if serializer.validated_data.get("mug_shot", None):
                resource.mug_shot.delete() # delete the existing mug shot first

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            delete_folder_in_media(f'iprs_person_{resource.id}', False)
        except OSError:
            return Response({"message": "User files not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            pass

        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def iprsPerson_restMug(request, pk, format=None):
    """
    Retrieve, update or delete a IPRS person.
    """
    try:
        resource = IPRS_Person.objects.get(pk=pk)
    except IPRS_Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = IPRS_PersonSerializerWrite(resource)
        resource.mug_shot.delete()
        return Response(serializer.data)
        
# RANK
@api_view(['GET', 'POST'])
def rank_list(request, format=None):
    """
    List all ranks, or create a new rank.
    """
    if request.method == 'GET':
        resources = Rank.objects.all()
        serializer = RankSerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = RankSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def rank_detail(request, pk, format=None):
    """
    Retrieve, update or delete a rank.
    """
    try:
        resource = Rank.objects.get(pk=pk)
    except Rank.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RankSerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = RankSerializer(resource, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

# POLICE STATION
@api_view(['GET', 'POST'])
def policeStation_list(request, format=None):
    """
    List all police stations, or create a new police station.
    """
    if request.method == 'GET':
        resources = PoliceStation.objects.all()       
        serializer = PoliceStationSerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PoliceStationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def policeStation_detail(request, pk, format=None):
    """
    Retrieve, update or delete a police station.
    """
    try:
        resource = PoliceStation.objects.get(pk=pk)
    except PoliceStation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PoliceStationSerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PoliceStationSerializer(resource, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

# POLICE OFFICER
@api_view(['GET', 'POST'])
def policeOfficer_list(request, format=None):
    """
    List all police officers, or create a new police officer.
    """
    if request.method == 'GET':
        resources = PoliceOfficer.objects.all()

        user = request.query_params.get('user', None)
        if user:
            resources = resources.filter(user=user)

        serializer = PoliceOfficerReadSerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PoliceOfficerWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def policeOfficer_detail(request, pk, format=None):
    """
    Retrieve, update or delete a police officer.
    """
    try:
        resource = PoliceOfficer.objects.get(pk=pk)
    except PoliceOfficer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PoliceOfficerReadSerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PoliceOfficerWriteSerializer(resource, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            resource.delete()
        except IntegrityError:
            return Response({"message": "Deleting action not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def policeOfficer_restMug(request, pk, format=None):
    """
    Retrieve, update or delete a IPRS person.
    """
    try:
        resource = PoliceOfficer.objects.get(pk=pk)
    except PoliceOfficer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = PoliceOfficerReadSerializer(resource)
        resource.mug_shot.delete()
        return Response(serializer.data)

class ReporterListView(BaseListView):
    """
    List all items, or create a new item.
    """
    model = Reporter
    serializer_class = ReporterSerializer
    read_serializer_class = ReporterSerializer
    permission_classes = ()

    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Reporter.objects.all()
        occurrence = self.request.query_params.get('occurrence')
        if occurrence is not None:
            queryset = queryset.filter(occurrence=occurrence)

        return queryset

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ReporterDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an item
    """
    model = Reporter
    serializer_class = ReporterSerializer
    read_serializer_class = ReporterSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class ItemListView(BaseListView):
    """
    List all items, or create a new item.
    """
    model = Item
    serializer_class = ItemSerializer
    read_serializer_class = ItemSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ItemDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an item
    """
    model = Item
    serializer_class = ItemSerializer
    read_serializer_class = ItemSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class ItemCategoryListView(BaseListView):
    """
    List all Itemcategory, or create a new Itemcategory.
    """
    model = ItemCategory
    serializer_class = ItemCategorySerializer
    read_serializer_class = ItemCategorySerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ItemCategoryDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an Itemcategory.
    """
    model = ItemCategory
    serializer_class = ItemCategorySerializer
    read_serializer_class = ItemCategorySerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class EvidenceListView(BaseListView):
    """
    List all evidence, or create a new evidence.
    """
    model = Evidence
    serializer_class = EvidenceSerializer
    read_serializer_class = EvidenceSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class EvidenceDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an evidence.
    """
    model = Evidence
    serializer_class = EvidenceSerializer
    read_serializer_class = EvidenceSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class EvidenceCategoryListView(BaseListView):
    """
    List all evidencecategory, or create a new evidencecategory.
    """
    model = EvidenceCategory
    serializer_class = EvidenceCategorySerializer
    read_serializer_class = EvidenceCategorySerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class EvidenceCategoryDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an evidencecategory.
    """
    model = Evidence
    serializer_class = EvidenceSerializer
    read_serializer_class = EvidenceSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class EvidenceImageListView(ImageBaseListView):
    """
    List all evidenceimage, or create a new evidenceimage.
    """
    model = EvidenceImage
    serializer_class = EvidenceImageSerializer
    read_serializer_class = EvidenceImageSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request) 

class EvidenceImageDetailView(ImageBaseDetailView):
    """
    Retrieve , updates and delete an evidenceimage.
    """
    model = EvidenceImage
    serializer_class = EvidenceImageSerializer
    read_serializer_class = EvidenceImageSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk) 

class OccurrenceListView(BaseListView):
    """
    List all Occurrence, or create a new Occurrence.
    """
    model = Occurrence
    serializer_class = OccurrenceWriteSerializer
    read_serializer_class = OccurrenceReadSerializer
    permission_classes = ()
    # TODO https://www.django-rest-framework.org/api-guide/filtering/#specifying-a-default-ordering
    # "...Typically you'd instead control this by setting order_by on the initial queryset,"
    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Occurrence.objects.all()
        police_station = self.request.query_params.get('police_station')
        if police_station is not None:
            queryset = queryset.filter(police_station=police_station)

        police_officer = self.request.query_params.get('police_officer')
        if police_officer is not None:
            queryset = queryset.filter(police_officer=police_officer)

        queryset = queryset.order_by('-id')
        return queryset

    def get(self, request):
        return super().get(request)

    def post(self, request):
        # return super().post(request)
        # Excerpt from "BaseListView.post"
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.ob_no = f'OB/{instance.id}/{instance.posted_date.strftime("%m/%d/%Y")}'
            instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OccurrenceDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an Occurrence.
    """
    model = Occurrence
    serializer_class = OccurrenceWriteSerializer
    read_serializer_class = OccurrenceReadSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class OccurrenceCategoryListView(BaseListView):
    """
    List all Occurrencecategory, or create a new Occurrencecategory.
    """
    model = OccurrenceCategory
    serializer_class = OccurrenceCategorySerializer
    read_serializer_class = OccurrenceCategorySerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class OccurrenceCategoryDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an Occurrencecategory.
    """
    model = OccurrenceCategory
    serializer_class = OccurrenceCategorySerializer
    read_serializer_class = OccurrenceCategorySerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class OccurrenceCategoryInputListView(BaseListView):
    """
    List all occurrence category inputs, or create a new occurrence category input.
    """
    model = OccurrenceCategoryInput
    serializer_class = OccurrenceCategoryInputSerializer
    read_serializer_class = OccurrenceCategoryInputSerializer
    permission_classes = ()
    # SUSPENDED
    # # TODO https://www.django-rest-framework.org/api-guide/filtering/#searchfilter
    # # TODO https://www.django-rest-framework.org/api-guide/filtering/#specifying-which-fields-may-be-ordered-against
    # filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # search_fields = ['occurrence_category']
    # ordering_fields = ['order']
    # ordering = ['order'] # https://www.django-rest-framework.org/api-guide/filtering/#specifying-a-default-ordering

    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = OccurrenceCategoryInput.objects.all()
        occurrence_category = self.request.query_params.get('occurrence_category')
        if occurrence_category is not None:
            queryset = queryset.filter(occurrence_category=occurrence_category)

        queryset = queryset.order_by('order')
        return queryset

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class OccurrenceCategoryInputDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an occurrence category input.
    """
    model = OccurrenceCategoryInput
    serializer_class = OccurrenceCategoryInputSerializer
    read_serializer_class = OccurrenceCategoryInputSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class OccurrenceDetailListView(BaseListView):
    """
    List all occurrence category inputs, or create a new occurrence category input.
    """
    model = OccurrenceDetail
    serializer_class = OccurrenceDetailSerializer
    read_serializer_class = OccurrenceDetailSerializer
    permission_classes = ()

    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = OccurrenceDetail.objects.all()
        occurrence = self.request.query_params.get('occurrence')
        if occurrence is not None:
            queryset = queryset.filter(occurrence=occurrence)

        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category=category)

        return queryset

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class OccurrenceDetailDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an occurrence category input.
    """
    model = OccurrenceDetail
    serializer_class = OccurrenceDetailSerializer
    read_serializer_class = OccurrenceDetailSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

# TODO https://docs.djangoproject.com/en/4.0/howto/outputting-pdf/#write-your-view
import io
# from django.http import FileResponse
from reportlab.pdfgen import canvas

@api_view(['GET', 'PUT', 'DELETE'])
def occurrence_emailAbstract(request, pk, format=None):
    """
    Retrieve, update or delete a IPRS person.
    """
    try:
        resource = Occurrence.objects.get(pk=pk)
    except Occurrence.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        media_folder = f'{settings.MEDIA_ROOT}/abstract'
        os.makedirs(media_folder, exist_ok=True)

        # TODO https://docs.djangoproject.com/en/4.0/howto/outputting-pdf/#write-your-view
        # Create a file-like buffer to receive PDF data.
        # buffer = io.BytesIO()
        # + https://docs.python.org/3/library/io.html#binary-i-o
        # f = open("myfile.jpg", "rb")
        buffer = open(f'{media_folder}/Abstract_{resource.id}.pdf', "w+b")

        # Create the PDF object, using the buffer as its "file."
        p = canvas.Canvas(buffer)

        # Draw things on the PDF. Here's where the PDF generation happens.
        # See the ReportLab documentation for the full list of functionality.
        # p.drawString(100, 100, "Hello world.")
        p.drawString(100, 100, f'Abstract {resource.id}')

        # Close the PDF object cleanly, and we're done.
        p.showPage()
        p.save()

        # FileResponse sets the Content-Disposition header so that browsers
        # present the option to save the file.
        buffer.seek(0)
        # return FileResponse(buffer, as_attachment=True, filename='hello.pdf')

        # TODO https://docs.djangoproject.com/en/4.0/topics/email/#send-mass-mail
        # message1 = ('Subject here', 'Here is the message', 'from@example.com', ['first@example.com', 'other@example.com'])
        # message2 = ('Another Subject', 'Here is another message', 'from@example.com', ['second@test.com'])
        # send_mass_mail((message1, message2), fail_silently=False)

        instance = resource

        subject = f'Police Absract #{resource.id}'

        message = f"""
see attachment for the abstract
"""

        reporters = instance.reporter_set.all()
        reporters_email_array = list(map(lambda recipient: recipient.email_address, reporters))
        recipient_list_email = reporters_email_array
        
#         message1 = (subject, message, 'not-reply@task_manager.vps', recipient_list_email)
#         send_mass_mail((message1,), fail_silently=False)

        # TODO https://docs.djangoproject.com/en/4.0/topics/email/#the-emailmessage-class
        # email = EmailMessage(
        #     'Hello',
        #     'Body goes here',
        #     'from@example.com',
        #     ['to1@example.com', 'to2@example.com'],
        #     ['bcc@example.com'],
        #     reply_to=['another@example.com'],
        #     headers={'Message-ID': 'foo'},
        # )
        # message.attach_file('/images/weather_map.png')
        email = EmailMessage(
            subject,
            message,
            'not-reply@task_manager.vps',
            recipient_list_email,
            [],
            # reply_to=['another@example.com'],
            # headers={'Message-ID': 'foo'},
        )
        email.attach_file(f'{media_folder}/Abstract_{resource.id}.pdf')
        email.send(fail_silently=False)

        return Response({'status': 'successful'})
        
class ArresteeListView(BaseListView):
    """
    List all arrestee, or create a new arrestee.
    """
    model = Arrestee
    serializer_class = ArresteeSerializer
    read_serializer_class = ArresteeSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ArresteeDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an arrestee.
    """
    model = Arrestee
    serializer_class = ArresteeSerializer
    read_serializer_class = ArresteeSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class NextofkeenListView(BaseListView):
    """
    List all Nextofkeen, or create a new Nextofkeen.
    """
    model = Arrestee
    serializer_class = ArresteeSerializer
    read_serializer_class = ArresteeSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class NextofkeenDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an Nextofkeen.
    """
    model = Next_of_keen
    serializer_class = NextofkeenSerializer
    read_serializer_class = NextofkeenSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class MugShotsListView(ImageBaseListView):
    """
    List all mugshots, or create a new mugshots.
    """
    model = MugShots
    serializer_class = MugShotsSerializer
    read_serializer_class = MugShotsSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class MugShotsDetailView(ImageBaseDetailView):

    """
    Retrieve , updates and delete an mugshots.
    """
    model = MugShots
    serializer_class = MugShotsSerializer
    read_serializer_class = MugShotsSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class OffenseListView(BaseListView):
    """
    List all Offense, or create a new Offense.
    """
    model = Offense
    serializer_class = OffenseSerializer
    read_serializer_class = OffenseSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class OffenseDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an Offense.
    """
    model = Offense
    serializer_class = OffenseSerializer
    read_serializer_class = OffenseSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class ChargeSheetListView(BaseListView):
    """
    List all ChargeSheet, or create a new ChargeSheet
    """
    model = ChargeSheet
    serializer_class = ChargeSheetSerializer
    read_serializer_class = ChargeSheetSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ChargeSheetDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an ChargeSheet.
    """
    model = ChargeSheet
    serializer_class = ChargeSheetSerializer
    read_serializer_class = ChargeSheetSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class ChargeSheetPersonListView(BaseListView):
    """
    List all ChargeSheetPerson, or create a new ChargeSheetPerson
    """
    model = ChargeSheet_Person
    serializer_class = ChargeSheetPersonSerializer
    read_serializer_class = ChargeSheetPersonSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class ChargeSheetPersonDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an ChargeSheetPerson
    """
    model = ChargeSheet_Person
    serializer_class = ChargeSheetPersonSerializer
    read_serializer_class = ChargeSheetPersonSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class CourtFileListView(BaseListView):
    """
    List all CourtFile, or create a new CourtFile.
    """
    model = CourtFile
    serializer_class = CourtFileSerializer
    read_serializer_class = CourtFileSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class CourtFileDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an CourtFile.
    """
    model = CourtFile
    serializer_class = CourtFileSerializer
    read_serializer_class = CourtFileSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class FingerPrintsListView(ImageBaseListView):
    """
    List all FingerPrints, or create a new FingerPrints.
    """
    model = FingerPrints
    serializer_class = FingerPrintsSerializer
    read_serializer_class = FingerPrintsSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class FingerPrintsDetailView(ImageBaseDetailView):

    """
    Retrieve , updates and delete an FingerPrints.
    """
    model = FingerPrints
    serializer_class = FingerPrintsSerializer
    read_serializer_class = FingerPrintsSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class PoliceCellListView(BaseListView):
    """
    List all PoliceCell, or create a new PoliceCell.
    """
    model = PoliceCell
    serializer_class = PoliceCellSerializer
    read_serializer_class = PoliceCellSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class PoliceCellDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an PoliceCell.
    """
    model = PoliceCell
    serializer_class = PoliceCellSerializer
    read_serializer_class = PoliceCellSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

class WarrantofarrestListView(BaseListView):
    """
    List all Warrantofarrest, or create a new Warrantofarrest.
    """
    model = Warrant_of_arrest
    serializer_class = WarrantofarrestSerializer
    read_serializer_class = WarrantofarrestSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class WarrantofarrestDetailView(BaseDetailView):

    """
    Retrieve , updates and delete an Warrantofarrest.
    """
    model = Warrant_of_arrest
    serializer_class = WarrantofarrestSerializer
    read_serializer_class = WarrantofarrestSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)


# TODO https://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis/#creating-an-endpoint-for-the-root-of-our-api
# from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from vps.urls import app_name
from . import name_prefix as pre

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'swagger': reverse(f'{app_name}:{pre}-swagger', request=request, format=format),

        'users': reverse(f'{app_name}:{pre}-user-list', request=request, format=format),

        'genders': reverse(f'{app_name}:{pre}-gender-list', request=request, format=format),
        'countries': reverse(f'{app_name}:{pre}-country-list', request=request, format=format),
        'IPRS persons': reverse(f'{app_name}:{pre}-iprs-person-list', request=request, format=format),
        'mugshots': reverse(f'{app_name}:{pre}-mugshots', request=request, format=format),

        'ranks': reverse(f'{app_name}:{pre}-rank-list', request=request, format=format),
        'police stations': reverse(f'{app_name}:{pre}-police-station-list', request=request, format=format),
        'police offices': reverse(f'{app_name}:{pre}-police-officer-list', request=request, format=format),

        'reporters': reverse(f'{app_name}:{pre}-reporter-list', request=request, format=format),
        'occurrence categories': reverse(f'{app_name}:{pre}-occurrence-categories', request=request, format=format),
        'occurrence categories inputs': reverse(f'{app_name}:{pre}-occurrence-category-inputs', request=request, format=format),
        'occurrences': reverse(f'{app_name}:{pre}-occurrences', request=request, format=format),
        'occurrences details': reverse(f'{app_name}:{pre}-occurrence-details', request=request, format=format),

        'arrestees': reverse(f'{app_name}:{pre}-arrestees', request=request, format=format),
        'next of keen': reverse(f'{app_name}:{pre}-Next_of_keen_list', request=request, format=format),
        'fingerprints': reverse(f'{app_name}:{pre}-fingerprints', request=request, format=format),
        'police cells': reverse(f'{app_name}:{pre}-policecells', request=request, format=format),
        'warrant of arrests': reverse(f'{app_name}:{pre}-warrantofarrests', request=request, format=format),
        
        'items': reverse(f'{app_name}:{pre}-item-list', request=request, format=format),
        'item categories': reverse(f'{app_name}:{pre}-item-categories', request=request, format=format),

        'evidences': reverse(f'{app_name}:{pre}-evidence', request=request, format=format),
        'evidence images': reverse(f'{app_name}:{pre}-evidenceimage', request=request, format=format),

        'offenses': reverse(f'{app_name}:{pre}-offences', request=request, format=format),

        'chargesheets': reverse(f'{app_name}:{pre}-chargesheets', request=request, format=format),
        'chargesheet persons': reverse(f'{app_name}:{pre}-chargesheetpersons', request=request, format=format),
        'courtfiles': reverse(f'{app_name}:{pre}-courtfiles', request=request, format=format),
    })
