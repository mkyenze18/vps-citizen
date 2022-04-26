from rest_framework import serializers


class BaseModelSerializer(serializers.ModelSerializer):
    """
   Base Serializer class that implements shared functionality
   across all ModelSerializers
    """
    
    class Meta:
        exclude = ("")
