from django.shortcuts import render, redirect, get_object_or_404
from django.core.mail import send_mass_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .forms import TaskForm
# Create your views here.

# TAKSK

def tasks(request):
    return render( request, 'task_manager/tasks/restapi.html')

def tasks_create(request):
    if request.method == 'POST':
        # https://docs.djangoproject.com/en/4.0/topics/forms/modelforms/#the-save-method
        # Create a form to edit an existing Article, but use
        # POST data to populate the form.
        f = TaskForm(request.POST)
        if f.is_valid():
            instance = f.save()

            instance.created_by = request.user
            if f.cleaned_data.get('assigned_to', None):
                instance.assigned_by = request.user
            instance.save()
            
            return redirect('task_manager:tasks')
        else:
            return render( request, 'task_manager/tasks/create.html', {'form':f})

    f = TaskForm(request.POST)
    return render( request, 'task_manager/tasks/create.html', {'form':f})

def tasks_update(request, item_id=None):
    instance = get_object_or_404(Task, pk=item_id)

    if request.method == 'POST':
        # https://docs.djangoproject.com/en/4.0/topics/forms/modelforms/#the-save-method
        # Create a form to edit an existing Article, but use
        # POST data to populate the form.
        f = TaskForm(request.POST, instance=instance)
        if f.is_valid():
            f.save( commit=False )

            # if f.cleaned_data.get('assigned_to', None):
            #     if instance.assigned_to.id != f.cleaned_data.get('assigned_to', None):
            #         instance.assigned_by = request.user
            #         instance.save()
            #         f = TaskForm(request.POST, instance=instance)
            #         if f.is_valid():
            #             f.save()
                        
            f.save()

            return redirect('task_manager:tasks_update', instance.id)
    else:
        f = TaskForm(instance=instance)

    return render( request, 'task_manager/tasks/update.html', {'item': instance, 'form':f})

def tasks_delete(request, item_id):
    instance = get_object_or_404(Task, pk=item_id)
    if request.method == 'POST':
        instance.delete()
        return redirect('task_manager:tasks')

    return render( request, 'task_manager/tasks/confirm.html')

TASK_STATUS = {
    'OP': 'Open',
    'CL': 'Closed',
    'IP': 'In-progress',
    'PE': 'Pending',
}

@api_view(['POST'])
def tasks_notify(request, item_id=None):
    if request.method == 'POST':
        instance = get_object_or_404(Task, pk=item_id)

        # TODO https://docs.djangoproject.com/en/4.0/topics/email/#send-mass-mail
        # message1 = ('Subject here', 'Here is the message', 'from@example.com', ['first@example.com', 'other@example.com'])
        # message2 = ('Another Subject', 'Here is another message', 'from@example.com', ['second@test.com'])
        # send_mass_mail((message1, message2), fail_silently=False)

        subject = f'Task Update: {instance.title}'

        assigned_to_array = instance.assigned_to.all()
        recipient_list_username = map(lambda assigned_to: assigned_to.username, assigned_to_array)
        message = f"""
            Title: {instance.title},
            Assigned to: {', '.join(recipient_list_username)},
            Status: {TASK_STATUS[instance.status]},
            Created: {instance.created_at},
            Deadline: { instance.deadline if instance.deadline else 'Not set'},
            
            Description
            {instance.description if instance.description else '-'}
        """

        supervised_by_array = instance.supervised_by.all()
        assigned_to_email_array = list(map(lambda assigned_to: assigned_to.email, assigned_to_array))
        supervised_by_email_array = list(map(lambda supervised_by: supervised_by.email, supervised_by_array))
        recipient_list_email = assigned_to_email_array + supervised_by_email_array
        
        message1 = (subject, message, 'not-reply@task_manager.vps', recipient_list_email)
        send_mass_mail((message1,), fail_silently=False)
        return Response('notification sent successfully')
    


# TODO https://www.django-rest-framework.org/tutorial/2-requests-and-responses/#pulling-it-all-together
from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
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
from .models import Task
from .serializers import ( TaskSerializer )
from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
def task_list(request, format=None):
    """
    List all tasks, or create a new task.
    """
    if request.method == 'GET':
        resources = Task.objects.all()

        listed = request.query_params.get('listed', None)
        if listed:
            resources = resources.filter(listed=listed)

        serializer = TaskSerializer(resources, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk, format=None):
    """
    Retrieve, update or delete a task.
    """
    try:
        resource = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(resource)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(resource, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TODO https://www.django-rest-framework.org/tutorial/5-relationships-and-hyperlinked-apis/#creating-an-endpoint-for-the-root-of-our-api
# from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'tasks': reverse('task_manager:task-list', request=request, format=format),
    })