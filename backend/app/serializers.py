from rest_framework import serializers
from app.models import Record


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Record
