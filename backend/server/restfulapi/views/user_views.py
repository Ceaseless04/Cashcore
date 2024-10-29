from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from ..serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
from django.http import Http404


# Include cors --> so that frontend can make requests (possibly will have to do)

# Issues:
# 1) pk in url is negative --> crashes


### ----------- USERS -----------



# 8000/users/
# Handles Get All
class UserList(generics.ListAPIView): # --WORKS
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated] 
    
    queryset = User.objects.all() # DB query
    serializer_class = UserSerializer # Specify a Serializer used to send JSON reponse


# 8000/users/<int:pk>/
# This allows for customizable logic --> in case you want to append Budget, Loan, Saving, Stocks ids to the Response Object.
class UserDetail(APIView):
    # Only authenticated Users can access this view (Needs to be Logged In)
    # Should addd when deploying
    # permission_classes = [IsAuthenticated] 
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound("User not found")

    def get(self, request, pk): # --WORKS
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, pk): # --WORKS
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk): # --WORKS
        user = self.get_object(pk)
        user.delete()
        return Response({"message": f"User {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk): #Probably not needed
        return Response({"message": "Patch not implemented yet"})
    




# TERMS

# Generics --> super easy to create api endpoints but doesn't provide much customization