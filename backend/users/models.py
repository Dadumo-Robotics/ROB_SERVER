# users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

# Create your models here.




class CustomUser(AbstractUser):
    role = models.CharField(max_length=30)
    username = None # We set it to None to prevent Django from using it
    email = models.EmailField(_("email address"), unique=True) # We add the email to UNIQUE

    USERNAME_FIELD = "email" # And then make it a requirement replacing the username value 
    REQUIRED_FIELDS = [
       "id", 
       "first_name", 
       "last_name",
       "password",
    ]

    """
    With the following, we change the table fields to adapt them to Django 
    and how it organizes user permissions, since our user model is custom
    """

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # We change this retlated_name for preventing errors
        blank=True,
        help_text='Los grupos a los que pertenece este usuario.',
        related_query_name='customuser',
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions_set',  # We change this retlated_name for preventing errors
        blank=True,
        help_text='Permisos específicos para este usuario.',
        related_query_name='customuser',
    )