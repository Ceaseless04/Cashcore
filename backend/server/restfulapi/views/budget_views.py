from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser, Budget, Saving
from django.contrib.auth.models import User
from ..serializers import BudgetSerializer
from django.http import Http404
from django.db.models import Sum

# 8000/restapi/budgets/
class BudgetListCreate(generics.ListCreateAPIView): # --WORKS
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

    def post(self, request, format=None): # Overriding Generic View here for validation.
        user_id = request.data.get('userID')
        savings_balance = Saving.objects.filter(userID=user_id).aggregate(Sum('currentAmount'))['currentAmount__sum'] or 0
        current_amount = request.data.get('current_amount', 0)
        
        if current_amount > savings_balance:
            return Response({'error': 'Current amount cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_current_amounts = Budget.objects.filter(userID=user_id).aggregate(Sum('current_amount'))['current_amount__sum'] or 0
        if total_current_amounts + current_amount > savings_balance:
            return Response({'error': 'Sum of all current amounts cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 8000/restapi/budgets/<str:user>/
class BudgetUserDetail(APIView): # --WORKS
    def get(self, request, user, format=None):
        budgets = Budget.objects.filter(userID=int(''.join(filter(str.isdigit, user)))) # Clean up this method later (extract digits from user030398309)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)

    def post(self, request, user, format=None):
        user_id = int(''.join(filter(str.isdigit, user)))
        savings_balance = Saving.objects.filter(userID=user_id).aggregate(Sum('currentAmount'))['currentAmount__sum'] or 0
        current_amount = request.data.get('current_amount', 0)
        
        if current_amount > savings_balance:
            return Response({'error': 'Current amount cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_current_amounts = Budget.objects.filter(userID=user_id).aggregate(Sum('current_amount'))['current_amount__sum'] or 0
        if total_current_amounts + current_amount > savings_balance:
            return Response({'error': 'Sum of all current amounts cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        user_id = budget.userID.id
        savings_balance = Saving.objects.filter(userID=user_id).aggregate(Sum('currentAmount'))['currentAmount__sum'] or 0
        current_amount = request.data.get('current_amount', 0)
        
        if current_amount > savings_balance:
            return Response({'error': 'Current amount cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_current_amounts = Budget.objects.filter(userID=user_id).exclude(pk=pk).aggregate(Sum('current_amount'))['current_amount__sum'] or 0
        if total_current_amounts + current_amount > savings_balance:
            return Response({'error': 'Sum of all current amounts cannot be more than savings balance'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = BudgetSerializer(budget, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # --WORKS & Cascade (w USER default model)
        budget = self.get_object(pk)
        budget.delete()
        return Response({"message": f"Budget {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)
    