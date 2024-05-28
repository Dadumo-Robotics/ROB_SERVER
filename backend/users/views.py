from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import *

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class DeleteUserView(generics.DestroyAPIView):
    serializer_class = EmailSerializer
    permission_classes = [AllowAny]

    
    def get_queryset(self):
        email = self.request
        return CustomUser.objects.filter(email=email)