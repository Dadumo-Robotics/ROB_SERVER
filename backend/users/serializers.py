# users/serializers.py
from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "email", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

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

