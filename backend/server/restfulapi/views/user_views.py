from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from ..serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import NotFound
from django.http import Http404


# added for Account Delete Access token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from plaid.api import plaid_api
from plaid.model.item_remove_request import ItemRemoveRequest

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
    

    # This method does the following:

# Checks if there is a PlaidItem associated with the user.
# If there is, it gets the access_token.
# Calls Plaid to delete the access_token from their server.
# Deletes the user associated with the PlaidItem.
@api_view(['DELETE'])
def delete_plaid_item(request, user_id):
    try:
        # Check if there is a PlaidItem associated with the user
        try:
            plaid_item = PlaidItem.objects.get(userID=user_id)
            access_token = plaid_item.accessToken
        except PlaidItem.DoesNotExist:
            return Response({'error': 'No PlaidItem found for the given userID'}, status=status.HTTP_404_NOT_FOUND)

        # Call Plaid and delete access_token from their server
        item_remove_request = ItemRemoveRequest(access_token=access_token)
        client.item_remove(item_remove_request)

        # Delete the user
        plaid_item.userID.delete()

        return Response({'message': 'PlaidItem and user deleted successfully!'}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error deleting PlaidItem: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# TERMS

# Generics --> super easy to create api endpoints but doesn't provide much customization