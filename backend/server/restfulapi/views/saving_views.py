from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser, Saving
from django.contrib.auth.models import User
from ..serializers import SavingSerializer
from django.http import Http404




### ----------- SAVINGS -----------




# 8000/restapi/savings/
# Post 1 && Get All
class SavingListCreate(generics.ListCreateAPIView): # --WORKS
    queryset = Saving.objects.all()
    serializer_class = SavingSerializer

    def post(self, request, format=None):
        #User with userID MUST be present in the DB before posting
        if User.objects.filter(pk=request.data['userID']):
            serializer = SavingSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": f"User with (userID:{request.data['userID']}) doesn't exist."})


# 8000/restapi/savings/<str:user>/
class SavingUserDetail(APIView): # --WORKS
    def get(self, request, user, format=None):
        savings = Saving.objects.filter(userID=int(''.join(filter(str.isdigit, user))))
        serializer = SavingSerializer(savings, many=True)
        return Response(serializer.data)


# 8000/restapi/savings/<int:pk>/
class SavingDetail(APIView):
    def get_object(self, pk):
        try:
            return Saving.objects.get(pk=pk)
        except Saving.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None): # --WORKS
        loan = self.get_object(pk)
        serializer = SavingSerializer(loan)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): # --WORKS
        saving = self.get_object(pk)
        serializer = SavingSerializer(saving, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # --WORKS & Cascade (w USER default model)
        saving = self.get_object(pk)
        saving.delete()
        return Response({"message": f"Saving {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)



