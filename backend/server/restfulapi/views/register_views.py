from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from ..serializers import UserSerializer

# 8000/register/
# Handles --> POST 1 USER
class RegisterView(generics.CreateAPIView): # --WORKS
    permission_classes = [AllowAny]  # Allow any user to register
    queryset = User.objects.all()
    serializer_class = UserSerializer
    