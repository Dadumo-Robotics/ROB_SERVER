# robots/serializers.py
from rest_framework import serializers
from .models import Robot

class RobotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = ["id", "name", "state", "owner", "device_ip"]
        #extra_kwargs = {"state": {"read_only": True}}

class RobotFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Robot
        fields = "__all__"
        #extra_kwargs = {"state": {"read_only": True}}