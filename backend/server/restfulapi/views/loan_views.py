from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import User, Loan
from ..serializers import LoanSerializer
from django.http import Http404




### ----------- LOANS -----------




# 8000/restapi/loans/
# Post 1 && Get All
class LoanListCreate(generics.ListCreateAPIView): #WORKS
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def post(self, request, format=None):
        #User with userID MUST be present in the DB before posting
        if User.objects.filter(pk=request.data['userID']):
            serializer = LoanSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": f"User with (userID:{request.data['userID']}) doesn't exist."})


# 8000/restapi/loans/<str:user>/
class LoanUserDetail(APIView): # WORKS
    def get(self, request, user, format=None):
        loans = Loan.objects.filter(userID=int(''.join(filter(str.isdigit, user))))
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)


# 8000/restapi/loans/<int:pk>/
class LoanDetail(APIView):
    def get_object(self, pk):
        try:
            return Loan.objects.get(pk=pk)
        except Loan.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None): #WORKS
        loan = self.get_object(pk)
        serializer = LoanSerializer(loan)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): #WORKS
        loan = self.get_object(pk)
        serializer = LoanSerializer(loan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): #WORKS --> Delete 1 (cascade is working)
        loan = self.get_object(pk)
        loan.delete()
        return Response({"message": f"Loan {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)
    


