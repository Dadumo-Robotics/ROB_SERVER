# users/serializers.py
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "email", "password", "role", "last_login"]
        extra_kwargs = {"password": {"write_only": True}, "last_login": {"read_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create(**validated_data)

        user.set_password(validated_data["password"]) #Sets the hash password
        user.save()

        return user

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email"]

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])