# api/serializers.py
from rest_framework import serializers
from .models import *

class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = ["id", "name", "state", "owner"]
        #extra_kwargs = {"state": {"read_only": True}}
