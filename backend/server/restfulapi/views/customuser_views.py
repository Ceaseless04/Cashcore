from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser
from ..serializers import CustomUserSerializer
from django.http import Http404


# Include cors --> so that frontend can make requests (possibly will have to do)


### ----------- USERS -----------



# 8000/users/
# Handles Post 1 && Get All
class CustomUserListCreate(generics.ListCreateAPIView): # Docs --> Provides get and post method handlers
    #Generic --> super easy to create api endpoints but don't provide much customization
    queryset = CustomUser.objects.all() #DB query
    serializer_class = CustomUserSerializer #specify a Seriliazer used to send JSON reponse


# 8000/users/<int:pk>/
# This allows for customizable logic --> in case you want to append Budget, Loan, Saving, Stocks ids to the Response Object.
class CustomUserDetail(APIView):
    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None): #WORKS --> Get 1
        user = self.get_object(pk)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): #WORKS --> Update 1
        user = self.get_object(pk)
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): #WORKS --> Delete 1 (cascade is working)
        user = self.get_object(pk)
        user.delete()
        return Response({"message": f"User {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)
    
    def patch(self, request, pk, format=None): #Probably not needed
        return Response({"message": "Patch not implemented yet"})