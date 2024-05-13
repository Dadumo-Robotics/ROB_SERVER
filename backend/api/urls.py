from django.urls import path
from . import views

urlpatterns = [
    path("robots/", views.RobotListCreate.as_view(), name="robot-list"),
    path("robots/delete/<int:pk>", views.RobotDelete.as_view(), name="delete-robot"),
]