# users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

# Create your models here.

class CustomUserManager(BaseUserManager):
    """
    Defines how the User(or the model to which attached)
    will create users and superusers.
    """
    def create_user(
        self,
        email, 
        password,
        **extra_fields
        ):
        """
        Create and save a user with the given email, password,
        and date_of_birth.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email) # lowercase the domain
        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password) # hash raw password and set
        user.save()
        return user
    def create_superuser(
        self,
        email, 
        password,
        **extra_fields
        ):
        """
        Create and save a superuser with the given email, 
        password, and date_of_birth. Extra fields are added
        to indicate that the user is staff, active, and indeed
        a superuser.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError(
                _("Superuser must have is_staff=True.")
            )
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(
                _("Superuser must have is_superuser=True.")
            )
        return self.create_user(
            email, 
            password, 
            **extra_fields
        )


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

    objects = CustomUserManager()

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

    def __str__(self):
     return f"{self.first_name} {self.last_name} ({self.email}) (ID: {self.id})"

