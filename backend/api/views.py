from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.core.mail import send_mail
from .models import *

# Create your views here.

#################################################
#                  USER VIEWS                   #
#################################################

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class DeleteUserView(generics.DestroyAPIView):
    serializer_class = EmailSerializer
    permission_classes = [AllowAny]

    
    def get_queryset(self):
        email = self.request
        return User.objects.filter(email=email)
    


#################################################
#                 ROBOT VIEWS                   #
#################################################

class RobotListCreate(generics.ListCreateAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class RobotDelete(generics.DestroyAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)