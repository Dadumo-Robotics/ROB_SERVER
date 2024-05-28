# api/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Custom code to update last_login
        self.user.last_login = timezone.now()
        self.user.save()

        return data
