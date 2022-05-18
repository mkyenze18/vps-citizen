from django.shortcuts import render , redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# Create your views here.

from django.http import HttpResponse

from django.template import loader

from django.http import Http404

from django.shortcuts import get_object_or_404

from .models import (Country, IPRS_Person, Rank, PoliceStation, PoliceOfficer,
ItemCategory, Item
)

from .forms import Country_Form

# def index(request):
#     latest_question_list = Question.objects.order_by('-pub_date')[:5]
#     output = ', '.join([q.question_text for q in latest_question_list])
#     return HttpResponse(output)

# def index(request):
#     latest_question_list = Question.objects.order_by('-pub_date')[:5]
#     template = loader.get_template('parking/index.html')
#     context = {
#         'latest_question_list': latest_question_list,
#     }
#     return HttpResponse(template.render(context, request))

# TODO
# def index(request):
#     latest_parking_session_list = ParkingSession.objects.order_by('-premise_session__time_in')[:5]
#     context = {'latest_parking_session_list': latest_parking_session_list}
#     return render(request, 'parking/index.html', context)

# Leave the rest of the views (detail, results, vote) unchanged

# def detail(request, question_id):
#     return HttpResponse("You're looking at question %s." % question_id)

# def detail(request, question_id):
#     try:
#         question = Question.objects.get(pk=question_id)
#     except Question.DoesNotExist:
#         raise Http404("Question does not exist")
#     return render(request, 'polls/detail.html', {'question': question})

# TODO ? Njogu probably changed something

# def detail(request, parking_sessions_id):
#     parking_session = get_object_or_404(ParkingSession, pk=parking_sessions_id)
#     return render(request, 'parking/detail.html', {'parking_session': parking_session})

# def results(request, question_id):
#     response = "You're looking at the results of question %s."
#     return HttpResponse(response % question_id)

# def vote(request, question_id):
#     return HttpResponse("You're voting on question %s." % question_id)

@login_required # TODO https://docs.djangoproject.com/en/4.0/topics/auth/default/#the-login-required-decorator
def index(request, resource=None):
    police_officer = PoliceOfficer.objects.filter(user=request.user.id)
    context = {}
    if police_officer.count():
        context = {
            "police_officer" : police_officer.id,
            "police_station" : police_officer.police_station.id,
        }
        
    return render(request, 'build/index.html', context)

# Country
@login_required
def countries(request):
    return render( request, 'core/index.html')

@login_required
def create_country(request):
     if request.method == 'POST':
          f = Country_Form(request.POST)
          if f.is_valid():
               f.save()
               return redirect('core:index')
     else: 
          f = Country_Form()
     return render ( request, 'core/index.html', {'f' : f})

@login_required
def country_update(request, item_id=None):
    instance = get_object_or_404(Country, pk=item_id)

    if request.method == 'POST':
        f = Country_Form(request.POST, instance=instance)
        if f.is_valid():
            f.save()
    else:
        f = Country_Form(instance=instance)

    return render( request, 'core/index.html', {'item': instance, 'f' : f})

@login_required
def country_delete(request, item_id):
    instance = get_object_or_404(Country, pk=item_id)
    if request.method == 'POST':
        instance.delete()
        return redirect('questionnaire:questionnaires')

    return render( request, 'core/index.html')


# TODO https://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis/#creating-an-endpoint-for-the-root-of-our-api
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from .rest_api import v0

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        f'{v0.path_name}': reverse(f'vps:{v0.name_prefix}', request=request, format=format),
    })
