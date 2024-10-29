from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser, Budget
from django.contrib.auth.models import User
from ..serializers import BudgetSerializer
from django.http import Http404




### ----------- BUDGETS -----------




# 8000/restapi/budgets/
# Post 1 && Get All
class BudgetListCreate(generics.ListCreateAPIView): # --WORKS
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def post(self, request, format=None): #Overriding Generic View here for validation.
        #User with userID MUST be present in the DB before posting
        if User.objects.filter(pk=request.data['userID']):
            serializer = BudgetSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": f"User with (user_id: {request.data['userID']}) doesn't exist."})


# 8000/restapi/budgets/<str:user>/
class BudgetUserDetail(APIView): # --WORKS
    # Response({"userID": f"{int(''.join(filter(str.isdigit, user)))}   {type(int(''.join(filter(str.isdigit, user))))}"})
    def get(self, request, user, format=None):
        budgets = Budget.objects.filter(userID=int(''.join(filter(str.isdigit, user)))) # Clean up this method later (extract digits from user030398309)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)


# 8000/restapi/budgets/<int:pk>/
class BudgetDetail(APIView):
    def get_object(self, pk):
        try:
            return Budget.objects.get(pk=pk)
        except Budget.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None): # --WORKS
        budget = self.get_object(pk)
        serializer = BudgetSerializer(budget)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): # --WORKS
        budget = self.get_object(pk)
        serializer = BudgetSerializer(budget, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # --WORKS & Cascade (w USER default model)
        budget = self.get_object(pk)
        budget.delete()
        return Response({"message": f"Budget {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)
    

