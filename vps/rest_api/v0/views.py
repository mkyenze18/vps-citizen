from http.client import responses
from pickle import FALSE
from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import IsAuthenticated
from reportlab.pdfgen import canvas


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

from rest_framework.views import APIView
from rest_framework import generics

# TODO https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#adding-optional-format-suffixes-to-our-urls
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.core.mail import send_mass_mail
from django.core.mail import EmailMessage
from django.conf import settings


from vps.models import (
    Driver, Gender, Country, IPRS_Person, PoliceStation, Rank, PoliceOfficer,
    OccurrenceCategory, OccurrenceCategoryInput, Occurrence, OccurrenceDetail, Reporter,
    PoliceCell, TrafficOffender, Vehicle, Warrant_of_arrest, Arrestee, Next_of_keen, MugShots, FingerPrints,
    Offense, ChargeSheet_Person, ChargeSheet, CourtFile,
    EvidenceCategory, Evidence, EvidenceItemCategory, EvidenceItemImage,
    OccurrenceCounter
)
from helpers.file_system_manipulation import delete_file_in_media, delete_folder_in_media
from vps.rest_api.v0.common.views import BaseDetailView, BaseListView, ImageBaseDetailView, ImageBaseListView
from .serializers import ( DriverSerializer, TrafficOffenderDetailsSerializer, UserSerializer,
    CountrySerializer, GenderSerializer, IPRS_PersonSerializerRead, IPRS_PersonSerializerWrite, RankSerializer,
    PoliceStationSerializer, PoliceOfficerReadSerializer, PoliceOfficerWriteSerializer,
    OccurrenceCategorySerializer, OccurrenceCategoryInputSerializer, OccurrenceReadSerializer, OccurrenceWriteSerializer,
    OccurrenceDetailSerializer, ReporterSerializer,
    PoliceCellSerializer, VehicleSerializer, WarrantofarrestSerializer, ArresteeSerializer, NextofkeenSerializer, MugShotsSerializer, FingerPrintsSerializer,
    OffenseSerializer, ChargeSheetSerializer, ChargeSheetPersonSerializer, CourtFileSerializer,
    EvidenceCategorySerializer, EvidenceItemCategorySerializer, EvidenceReadSerializer, EvidenceWriteSerializer, EvidenceItemImageSerializer
)

import yaml
import json

import glob
import os
from . import name_prefix

from rest_framework import filters

from .smile_identity import enhanced_kyc
import requests
from smile_id_core import ServerError

from .pagination import VariableResultsSetPagination, CustomPagination

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
        return super().post(request)

#GENDER
class GenderListView(BaseListView):
    """
    list all genders or create a new gender
    """
    
    model = Gender
    serializer_class = GenderSerializer
    read_serializer_class = GenderSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class GenderDetailView(BaseDetailView):
    """
    Retrieve , updates and delete a gender
    """
    model = Gender
    serializer_class = GenderSerializer
    read_serializer_class = GenderSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

#COUNTRY
class CountryListView(BaseListView):
    """
    list all countries or create a new country
    """

    model = Country
    serializer_class = CountrySerializer
    read_serializer_class = CountrySerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class CountryDetailView(BaseDetailView):
    """
    Retrieve , updates and delete a country
    """

    model = Country
    serializer_class = CountrySerializer
    read_serializer_class = CountrySerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

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
            if resources.count() < 1:
                try:
                    success = save_iprs_person_from_smile_identity(request, id_no, "NATIONAL_ID")
                    if success:
                        resources = IPRS_Person.objects.filter(id_no__icontains=id_no)
                except ValueError:
                    return Response('Error getting IPRS Person', status=status.HTTP_400_BAD_REQUEST)
                except ServerError:
                    return Response('Error getting IPRS Person', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                # + https://docs.python.org/3/tutorial/errors.html#handling-exceptions
                # except BaseException as err:
                #     print(err)
                #     raise
                
        passport_no = request.query_params.get('passport_no', None)
        if passport_no:
            resources = resources.filter(passport_no__icontains=passport_no)
            if resources.count() < 1:
                try:
                    success = save_iprs_person_from_smile_identity(request, passport_no, "PASSPORT")
                    if success:
                        resources = IPRS_Person.objects.filter(passport_no__icontains=passport_no)
                except ValueError:
                    return Response('Error getting IPRS Person', status=status.HTTP_400_BAD_REQUEST)
                except ServerError:
                    return Response('Error getting IPRS Person', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                # + https://docs.python.org/3/tutorial/errors.html#handling-exceptions
                # except BaseException as err:
                #     print(err)
                #     raise

        serializer = IPRS_PersonSerializerRead(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = IPRS_PersonSerializerWrite(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class IPRS_PersonList(APIView):
#     """
#     List all IPRS Persons, or create a new IPRS Person.
#     """
#     def get(self, request, format=None):
#         items = IPRS_Person.objects.all()
#         serializer = IPRS_PersonSerializerRead(items, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = IPRS_PersonSerializerWrite(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class IPRS_PersonList(generics.GenericAPIView):
#     """
#     List all IPRS Persons, or create a new IPRS Person.
#     """

#     queryset = IPRS_Person.objects.all()
#     pagination_class = CustomPagination

#     def get_serializer_class(self):
#         if self.request.method == 'POST':
#             return IPRS_PersonSerializerWrite
#         return IPRS_PersonSerializerRead

#     def get(self, request, format=None):
#         items = self.get_queryset()
#         serializer = self.get_serializer_class()(items, many=True)
#         return Response(serializer.data)

#     def post(self, request, format=None):
#         serializer = self.get_serializer_class()(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IPRS_PersonList(generics.ListCreateAPIView):
    """
    List all IPRS Persons, or create a new IPRS Person.
    """

    # queryset = IPRS_Person.objects.all()
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return IPRS_PersonSerializerWrite
        return IPRS_PersonSerializerRead

    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = IPRS_Person.objects.all()

        id_no = self.request.query_params.get('id_no', None)
        if id_no:
            # queryset = queryset.filter(id_no__icontains=id_no)
            queryset = queryset.filter(id_no=id_no)
            if queryset.count() < 1:
                try:
                    success = save_iprs_person_from_smile_identity(self.request, id_no, "NATIONAL_ID")
                    if success:
                        queryset = IPRS_Person.objects.filter(id_no__icontains=id_no)
                except ValueError:
                    return Response('Error getting IPRS Person', status=status.HTTP_400_BAD_REQUEST)
                except ServerError:
                    return Response('Error getting IPRS Person', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                # + https://docs.python.org/3/tutorial/errors.html#handling-exceptions
                # except BaseException as err:
                #     print(err)
                #     raise
                
        passport_no = self.request.query_params.get('passport_no', None)
        if passport_no:
            # queryset = queryset.filter(passport_no__icontains=passport_no)
            queryset = queryset.filter(passport_no=passport_no)
            if queryset.count() < 1:
                try:
                    success = save_iprs_person_from_smile_identity(self.request, passport_no, "PASSPORT")
                    if success:
                        queryset = IPRS_Person.objects.filter(passport_no__icontains=passport_no)
                except ValueError:
                    return Response('Error getting IPRS Person', status=status.HTTP_400_BAD_REQUEST)
                except ServerError:
                    return Response('Error getting IPRS Person', status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                # + https://docs.python.org/3/tutorial/errors.html#handling-exceptions
                # except BaseException as err:
                #     print(err)
                #     raise

        return queryset

class IprsPersonDetailView(BaseDetailView):
    """
    """
    model = IPRS_Person
    serializer_class = IPRS_PersonSerializerWrite
    read_serializer_class = IPRS_PersonSerializerRead
    permission_class = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

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
        

#RANK 
class RankListView(BaseListView):
    """
    list all ranks or create a n
    """
    model = Rank
    serializer_class = RankSerializer
    read_serializer_class = RankSerializer
    Permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class RankDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an item
    """
    model = Rank
    serializer_class = RankSerializer
    read_serializer_class = RankSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

#POLICE STATION
class PoliceStationListView(BaseListView):
    """
    List all police stations or create new one
    """

    model = PoliceStation
    serializer_class = PoliceStationSerializer
    read_serializer_class = PoliceStationSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class PoliceStationDetailView(BaseDetailView):
    """
    Retrieve , updates and delete a police station
    """

    model = PoliceStation
    serializer_class = PoliceStationSerializer
    read_serializer_class = PoliceStationSerializer
    permission_classes = ()


    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

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

class PoliceOfficerList(generics.ListCreateAPIView):
    """
    List all Police Officers, or create a new Police Officer.
    """

    queryset = PoliceOfficer.objects.all()
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PoliceOfficerWriteSerializer
        return PoliceOfficerReadSerializer

    # TODO https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = PoliceOfficer.objects.all()

        user = self.request.query_params.get('user', None)
        if user:
            queryset = queryset.filter(user=user)

        return queryset

class PoliceOfficerDetailView(BaseDetailView):
    """
    """
    model = PoliceOfficer
    serializer_class = PoliceOfficerWriteSerializer
    read_serializer_class = PoliceOfficerReadSerializer
    permission_class = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)

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

# ! Focus on OB (report) module
class OccurrenceCategoryListView(BaseListView):
    """
    List all Occurrencecategory, or create a new Occurrencecategory.
    """
    model = OccurrenceCategory
    serializer_class = OccurrenceCategorySerializer
    read_serializer_class = OccurrenceCategorySerializer
    permission_classes = ()

    pagination_class = VariableResultsSetPagination # TODO https://www.django-rest-framework.org/api-guide/pagination/#configuration

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
# ================================================
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
# ================================================
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

        ob_no = self.request.query_params.get('ob_no')
        if ob_no is not None:
            queryset = queryset.filter(ob_no=ob_no)

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
            try:
                counter = OccurrenceCounter.objects.get(date=date.today())
            except:
                counter = OccurrenceCounter.objects.create()
            # instance.ob_no = f'OB/{instance.id}/{instance.posted_date.strftime("%m/%d/%Y")}'
            instance.ob_no = f'OB/{counter.ob_no + 1}/{instance.posted_date.strftime("%m/%d/%Y")}'
            instance.save()

            counter.ob_no = counter.ob_no + 1
            counter.save()
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
# ================================================
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
# ================================================
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

# TODO https://docs.djangoproject.com/en/4.0/howto/outputting-pdf/#write-your-view
import io
# from django.http import FileResponse
from reportlab.pdfgen import canvas

@api_view(['PUT'])
def occurrence_emailAbstract(request, pk, format=None):
    """
    Retrieve, update or delete a IPRS person.
    """
    try:
        resource = Occurrence.objects.get(pk=pk)
        # police_officer = PoliceOfficer.objects.get(iprs_person=resource.pollice_officer.iprs_person_id).user
        police_officer = resource.police_officer
    except Occurrence.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        from .OBReport.report import generate_report

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
        
        # ! Peter & Mutuku using ReportLab
        file_name = f'{media_folder}/Abstract_{resource.id}.pdf'
        generate_report(file_name, resource, police_officer)

        # TODO https://docs.djangoproject.com/en/4.0/topics/email/#send-mass-mail
        # message1 = ('Subject here', 'Here is the message', 'from@example.com', ['first@example.com', 'other@example.com'])
        # message2 = ('Another Subject', 'Here is another message', 'from@example.com', ['second@test.com'])
        # send_mass_mail((message1, message2), fail_silently=False)

        instance = resource

        # subject = f'Police Absract #{resource.id}'
        subject = f'Police Absract No. {resource.ob_no}'

        message = f"see attachment for the abstract"

        reporters = instance.reporters.all()
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
            'no-reply@virtualpolicestation.com',
            recipient_list_email,
            [],
            # reply_to=['another@example.com'],
            # headers={'Message-ID': 'foo'},
        )
        email.attach_file(file_name)
        email.send(fail_silently=False)

        return Response({'status': 'successful'})
        
# ! Focus on arrest module
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
# ================================================
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
# ================================================
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
# ================================================
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
# ================================================
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
# ================================================
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

# ! Focus on charge sheet module
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
# ================================================
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
# ================================================
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
# ================================================
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

# ! Focus on evidence module
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
    model = EvidenceCategory
    serializer_class = EvidenceCategorySerializer
    read_serializer_class = EvidenceCategorySerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)
# ================================================
class EvidenceListView(BaseListView):
    """
    List all evidence, or create a new evidence.
    """
    model = Evidence
    serializer_class = EvidenceWriteSerializer
    read_serializer_class = EvidenceReadSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        # return super().post(request)
        # Excerpt from "BaseListView.post"
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.evidence_no = f'EV/{instance.id}/{instance.posted_date.strftime("%m/%d/%Y")}'
            instance.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvidenceDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an evidence.
    """
    model = Evidence
    serializer_class = EvidenceWriteSerializer
    read_serializer_class = EvidenceReadSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)
# ================================================
class EvidenceItemCategoryListView(BaseListView):
    """
    List all evidencecategory, or create a new evidence item category.
    """
    model = EvidenceItemCategory
    serializer_class = EvidenceItemCategorySerializer
    read_serializer_class = EvidenceItemCategorySerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class EvidenceItemCategoryDetailView(BaseDetailView):
    """
    Retrieve , updates and delete an evidence item category.
    """
    model = EvidenceItemCategory
    serializer_class = EvidenceItemCategorySerializer
    read_serializer_class = EvidenceItemCategorySerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)
# ================================================
class EvidenceImageListView(ImageBaseListView):
    """
    List all evidenceimage, or create a new evidenceimage.
    """
    model = EvidenceItemImage
    serializer_class = EvidenceItemImageSerializer
    read_serializer_class = EvidenceItemImageSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        # return super().post(request)
        # Excerpt from "BaseListView.post"
        serializer = self.get_serializer_class()(data={"evidence": request.data['evidence']})
        if serializer.is_valid():
            evidence_item_image = serializer.save()
            evidence_item_image.image = request.data['image']
            evidence_item_image.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EvidenceImageDetailView(ImageBaseDetailView):
    """
    Retrieve , updates and delete an evidenceimage.
    """
    model = EvidenceItemImage
    serializer_class = EvidenceItemImageSerializer
    read_serializer_class = EvidenceItemImageSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        # return super().delete(request, pk)
        # Excerpt from "BaseDetailView.delete"
        item = self.get_object(request, pk)
        if hasattr(item, "is_deleted"):
            item.is_deleted = True
            item.deleted_at = datetime.datetime.now(tz=timezone.utc)
            item.modified_by = request.user
            item.save()
        else:
            try:
                # delete_file_in_media(item.image.name)
                item.image.delete() # TODO https://docs.djangoproject.com/en/4.0/ref/models/fields/#django.db.models.fields.files.FieldFile.delete
            except OSError:
                return Response({"message": "Evidence files not found"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                pass
            
            item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def save_iprs_person_from_smile_identity(request, id_number, id_type):
    iprs_person = enhanced_kyc(id_number, id_type) # TODO https://docs.smileidentity.com/supported-id-types/for-individuals-kyc/backed-by-id-authority#know-your-customer-kyc
    iprs_person = iprs_person.json() # TODO https://requests.readthedocs.io/en/latest/user/quickstart/#json-response-content
    # print(iprs_person)
    if iprs_person['ResultCode'] != "1012":
        return
    
    nationality = get_object_or_404(Country, nationality__iexact=iprs_person["FullData"]['Citizenship'])

    GENDER_CHOICES = {
        "M": "male",
        "F": "female"
    }
    gender = get_object_or_404(Gender, name__iexact=GENDER_CHOICES[iprs_person['FullData']['Gender']])

    id_no = None
    passport_no = None
    if id_type == 'NATIONAL_ID':
        id_no = id_number
    
    if id_type == 'PASSPORT':
        passport_no = id_number
        
    county_of_birth = None
    district_of_birth = None
    division_of_birth = None
    location_of_birth = None
    
    place_of_birth = iprs_person['FullData']['Place_of_Birth'] # KISUMU EAST\nDISTRICT - KISUMU EAST
    place_of_birth = place_of_birth.split("\n")
    for place_entry in place_of_birth:
        place = place_entry.split('-')
        print(place)
        if len(place) > 1:
            # ['DISTRICT ', ' NOT INDICATED']
            if place[1].strip().lower() == 'not indicated':
                continue

            if place[0].strip().lower() == 'county':
                county_of_birth = place[1].strip().title()
            elif place[0].strip().lower() == 'district':
                district_of_birth = place[1].strip().title()
            elif place[0].strip().lower() == 'division':
                division_of_birth = place[1].strip().title()
            elif place[0].strip().lower() == 'location':
                location_of_birth = place[1].strip().title()

    # TODO https://www.programiz.com/python-programming/examples/string-to-datetime
    my_date_string = iprs_person['FullData']['Date_of_Birth'] # 6/1/1998 12:00:00 AM
    datetime_object = datetime.strptime(my_date_string, '%m/%d/%Y %I:%M:%S %p')


    # + https://requests.readthedocs.io/en/latest/user/quickstart/#more-complicated-post-requests
    payload = {
        # 'id_no': iprs_person['FullData']['ID_Number'],
        # 'passport_no': iprs_person['FullData']['value2'],
        'id_no': id_no,
        'passport_no': passport_no,
        'first_name': iprs_person['FullData']['First_Name'].capitalize(),
        'middle_name': iprs_person['FullData']['Other_Name'].title(),
        'last_name': iprs_person['FullData']['Surname'].capitalize(),
        'nationality': nationality.id,
        'gender': gender.id,
        'county_of_birth': county_of_birth,
        'district_of_birth': district_of_birth,
        'division_of_birth': division_of_birth,
        'location_of_birth': location_of_birth,
        'date_of_birth': datetime_object.isoformat(),
    }

    r = requests.post(f"{request.scheme}://{request.get_host()}/vps/api/v0/iprs-persons", data=payload)
    # print(r.text)
    # + https://requests.readthedocs.io/en/latest/user/quickstart/#response-status-codes
    r.raise_for_status()
    return True


class TrafficOffenderListView(BaseListView):
    """
    List all TrafficOffenderDetails, or create a new trafficOffenderDetails.
    """
    model = TrafficOffender
    serializer_class = TrafficOffenderDetailsSerializer
    read_serializer_class = TrafficOffenderDetailsSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class TrafficOffenderDetailsView(BaseDetailView):

    """
    Retrieve , updates and delete an TrafficOffenderDetails.
    """
    model = TrafficOffender
    serializer_class = TrafficOffenderDetailsSerializer
    read_serializer_class = TrafficOffenderDetailsSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)


class DriverListView(BaseListView):
    """
    List all DriverDetails, or create a new DriverDetails.
    """
    model = Driver
    serializer_class = DriverSerializer
    read_serializer_class = DriverSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class DriverDetailsView(BaseDetailView):

    """
    Retrieve DriverDetails.
    """
    model = Driver
    serializer_class = DriverSerializer
    read_serializer_class = DriverSerializer
    permission_classes = ()

    def get(self, request, pk=None):
        return super().get(request, pk)

    def put(self, request, pk=None):
        return super().put(request, pk)

    def delete(self, request, pk=None):
        return super().delete(request, pk)


class VehicleListView(BaseListView):
    """
    List all VehicleDetails, or create a new VehicleDetails.
    """
    model = Vehicle
    serializer_class = VehicleSerializer
    read_serializer_class = VehicleSerializer
    permission_classes = ()

    def get(self, request):
        return super().get(request)

    def post(self, request):
        return super().post(request)

class VehicleDetailsView(BaseDetailView):

    """
    Retrieve vehicleDetails.
    """
    model = Vehicle
    serializer_class = VehicleSerializer
    read_serializer_class = VehicleSerializer
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
        'police stations': reverse(f'{app_name}:{pre}-police-station-list', request=request, format=format),
        'ranks': reverse(f'{app_name}:{pre}-rank-list', request=request, format=format),
        'police officers': reverse(f'{app_name}:{pre}-police-officer-list', request=request, format=format),

        # ! Focus on OB (report) module
        'OB' : '================',
        'occurrence categories': reverse(f'{app_name}:{pre}-occurrence-category-list', request=request, format=format),
        'occurrence categories inputs': reverse(f'{app_name}:{pre}-occurrence-category-input-list', request=request, format=format),
        'occurrences': reverse(f'{app_name}:{pre}-occurrence-list', request=request, format=format),
        'occurrences details': reverse(f'{app_name}:{pre}-occurrence-detail-list', request=request, format=format),
        'reporters': reverse(f'{app_name}:{pre}-reporter-list', request=request, format=format),

        # ! Focus on arrest module
        'ARREST' : '================',
        'police cells': reverse(f'{app_name}:{pre}-police-cell-list', request=request, format=format),
        'warrants of arrest': reverse(f'{app_name}:{pre}-warrant-of-arrest-list', request=request, format=format),
        'arrestees': reverse(f'{app_name}:{pre}-arrestee-list', request=request, format=format),
        'next of keen': reverse(f'{app_name}:{pre}-next-of-keen-list', request=request, format=format),
        'mugshots': reverse(f'{app_name}:{pre}-mugshot-list', request=request, format=format),
        'fingerprints': reverse(f'{app_name}:{pre}-fingerprint-list', request=request, format=format),

        # ! Focus on charge sheet module
        'CHARGE SHEET' : '================',
        'offenses': reverse(f'{app_name}:{pre}-offence-list', request=request, format=format),
        'chargesheet persons': reverse(f'{app_name}:{pre}-charge-sheet-person-list', request=request, format=format),
        'chargesheets': reverse(f'{app_name}:{pre}-charge-sheet-list', request=request, format=format),
        'court files': reverse(f'{app_name}:{pre}-court-file-list', request=request, format=format),

        # ! Focus on evidence module
        'EVIDENCE' : '================',
        'evidence categories': reverse(f'{app_name}:{pre}-evidence-category-list', request=request, format=format),
        'evidences': reverse(f'{app_name}:{pre}-evidence-list', request=request, format=format),
        'evidence item categories': reverse(f'{app_name}:{pre}-evidence-item-category-list', request=request, format=format),
        'evidence images': reverse(f'{app_name}:{pre}-evidence-item-image-list', request=request, format=format),


        # !Focus on traffic module
        'TRAFFIC' : '================',
        'traffic offenders': reverse(f'{app_name}:{pre}-trafficoffenders', request=request, format=format),
        'drivers': reverse(f'{app_name}:{pre}-driver', request=request, format=format),
        'vehicle': reverse(f'{app_name}:{pre}-vehicle', request=request, format=format)

      

    })
