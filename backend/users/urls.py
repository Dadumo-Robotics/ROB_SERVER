# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("user/register/", views.CreateUserView.as_view(), name="register"),
    path("user/delete/<int:pk>", views.DeleteUserView.as_view(), name="delete"),  
    path("user/update/<int:pk>", views.UpdateUserView.as_view(), name="update"),
    path("user/<int:pk>", views.RetrieveUserView.as_view(), name="retrieve"),
    path('user/current-user/', views.CurrentUserView.as_view(), name='current-user'),
    path("users/", views.ListUsersView.as_view(), name="list"),
    path("user/change-password/", views.ChangePasswordView.as_view(), name="change-password"),

]
