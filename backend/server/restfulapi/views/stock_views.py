from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser, Stock
from django.contrib.auth.models import User
from ..serializers import StockSerializer
from django.http import Http404




### ----------- STOCKS -----------




# 8000/restapi/stocks/
# Post 1 && Get All
class StockListCreate(generics.ListCreateAPIView): # --WORKS
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def post(self, request, format=None):
        #User with userID MUST be present in the DB before posting
        if User.objects.filter(pk=request.data['userID']):
            serializer = StockSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": f"User with (user_id:{request.data['userID']}) doesn't exist."})


# 8000/restapi/stocks/<str:user>/
class StockUserDetail(APIView): # --WORKS
    def get(self, request, user, format=None):
        stocks = Stock.objects.filter(userID=int(''.join(filter(str.isdigit, user))))
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data)


# 8000/restapi/stocks/<int:pk>/
class StockDetail(APIView):
    def get_object(self, pk):
        try:
            return Stock.objects.get(pk=pk)
        except Stock.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None): # --WORKS
        stock = self.get_object(pk)
        serializer = StockSerializer(stock)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None): # --WORKS
        stock = self.get_object(pk)
        serializer = StockSerializer(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None): # --WORKS & Cascade (w USER default model)
        stock = self.get_object(pk)
        stock.delete()
        return Response({"message": f"Stock {pk} Successfully Deleted."}, status=status.HTTP_204_NO_CONTENT)