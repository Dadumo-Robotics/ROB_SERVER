from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Robot(models.Model):
    name = models.CharField(max_length=100)
    state = models.BooleanField(default=False, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    
    def __str__(self):
        return f"{self.name} (ID: {self.robot_id})"

