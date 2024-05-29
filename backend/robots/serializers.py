# robots/serializers.py
from rest_framework import serializers
from .models import Robot

class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = ["id", "name", "state", "owner", "device_ip"]
        #extra_kwargs = {"state": {"read_only": True}}