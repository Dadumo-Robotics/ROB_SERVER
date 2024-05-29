#robot/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("robots/", views.RobotListCreate.as_view(), name="robot-list"),
    path("robot/<int:pk>", views.RobotRetrieve.as_view(), name="retrieve-robot"),
    path("robot/update/<int:pk>", views.RobotRetrieveUpdate.as_view(), name="update-robot"),
    path("robot/delete/<int:pk>", views.RobotDelete.as_view(), name="delete-robot"),
]