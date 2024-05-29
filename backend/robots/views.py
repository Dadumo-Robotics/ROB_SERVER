#robot/views.py
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Robot
from .serializers import RobotSerializer, RobotFullSerializer
from rest_framework.response import Response

# Create your views here.

class RobotListCreate(generics.ListCreateAPIView):
    serializer_class = RobotFullSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class RobotDelete(generics.DestroyAPIView):
    serializer_class = RobotFullSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)

class RobotRetrieveUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = RobotFullSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
    
class RobotRetrieve(generics.RetrieveAPIView):
    serializer_class = RobotFullSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Robot.objects.filter(owner=user)
    
class SyncUserRobot(generics.RetrieveUpdateAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Robot.objects.all()

    def get_object(self):
        # Obtener el robot específico que se actualizará
        return self.get_queryset().get(pk=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        # Obtiene el objeto del robot
        instance = self.get_object()
        # Asigna el usuario de la solicitud al propietario del robot
        instance.owner = request.user

        # Guarda los cambios
        instance.save()
        # Serializa y devuelve la instancia actualizada
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
class DesyncUserRobot(generics.RetrieveUpdateAPIView):
    serializer_class = RobotSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Robot.objects.all()

    def get_object(self):
        # Obtener el robot específico que se actualizará
        return self.get_queryset().get(pk=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        # Obtiene el objeto del robot
        instance = self.get_object()
        # Asigna None por que el user ya no lo quiere
        instance.owner = None
        instance.device_ip = None
        instance.name = None
        # Guarda los cambios
        instance.save()
        # Serializa y devuelve la instancia actualizada
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class UpdateRobotCoordinates(generics.UpdateAPIView):
    serializer_class = RobotFullSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Robot.objects.all()

    def get_object(self):
        # Obtener el robot específico que se actualizará
        return self.get_queryset().get(pk=self.kwargs['pk'])

    def update(self, request, *args, **kwargs):
        # Obtiene el objeto del robot
        instance = self.get_object()
        # Actualiza las coordenadas
        instance.last_coordinates = request.data.get('last_coordinates', instance.last_coordinates)

        # Guarda los cambios
        instance.save()
        # Serializa y devuelve la instancia actualizada
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


