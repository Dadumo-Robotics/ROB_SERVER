# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("user/register/", views.CreateUserView.as_view(), name="register"),
    path("user/delete/<int:pk>", views.DeleteUserView.as_view(), name="delete"),  
]
