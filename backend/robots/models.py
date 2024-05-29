#robots/models.py
from django.db import models
from users.models import CustomUser

# Create your models here.

class Robot(models.Model):
    name = models.CharField(max_length=100)
    state = models.BooleanField(default=False, null=True)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user")
    last_coordinates = models.CharField(max_length=255, blank=True, null=True)
    last_update_time = models.DateTimeField(auto_now=True)
    device_ip = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
     return f"{self.name} (ID: {self.id})"