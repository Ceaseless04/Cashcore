from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

# Create your views here.

# Create 1 and then return all the Users in the User_Table
class UserListCreate(generics.ListCreateAPIView): # Docs --> Provides get and post method handlers
    queryset = User.objects.all() #DB query
    serializer_class = UserSerializer #specify a Seriliazer to send JSON reponse







# Search what other generics exist.