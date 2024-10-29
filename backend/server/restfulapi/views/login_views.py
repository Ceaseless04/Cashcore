from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User
from ..serializers import LoginSerializer


class LoginView(APIView): # --WORKS

    def post(self, request):
        serializer = LoginSerializer(data=request.data) #Validate incoming data

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)

            if user is not None: # Successful authentication
                # login(request, user)  # Create a session (Keep track of state in browser)
                # logout(request) # Eventually call this to log the user out after a certain amount of time
                return Response({"message": "Login successful!"}, status=status.HTTP_200_OK)
            else:
                if not User.objects.filter(username=username).exists():
                    return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response({"error": "Invalid password."}, status=status.HTTP_401_UNAUTHORIZED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)