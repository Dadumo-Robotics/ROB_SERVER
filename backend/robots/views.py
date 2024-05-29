#robot/views.py
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Robot
from .serializers import RobotSerializer

# Create your views here.

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

class RobotRetrieveUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
    
class RobotRetrieve(generics.RetrieveAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
