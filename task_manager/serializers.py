from rest_framework import serializers

# TODO https://www.django-rest-framework.org/tutorial/1-serialization/#using-modelserializers
# class SnippetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Snippet
#         fields = ['id', 'title', 'code', 'linenos', 'language', 'style']

from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'assigned_to', 'assigned_by', 'created_by', 'status', 'created_at', 'deadline', 'description']
        depth = 1