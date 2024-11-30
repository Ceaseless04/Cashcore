from django.http import JsonResponse, Http404
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import date, timedelta
import os

import plaid
from plaid.api import plaid_api
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.configuration import Configuration
from plaid.api_client import ApiClient
from plaid.model.country_code import CountryCode
from plaid.model.products import Products

from plaid.model.transactions_sync_request import TransactionsSyncRequest
from plaid.model.transactions_get_request import TransactionsGetRequest
from plaid.model.auth_get_request import AuthGetRequest

from ..models import PlaidItem, Transaction
from django.contrib.auth.models import User
from ..serializers import PlaidItemSerializer, TransactionSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view



 
clientID = os.getenv('PLAID_CLIENT_ID')
plaidSecret = os.getenv('PLAID_SECRET')
plaidEnv = os.getenv('PLAID_ENV') # 'development' or 'production' or 'sandbox'
plaidProducts = os.getenv('PLAID_PRODUCTS').split(',')



configuration = Configuration(
    host=plaid.Environment.Sandbox,  # Use sandbox or production depending on your environment
    # api_key={"clientId": os.getenv("PLAID_CLIENT_ID"), "secret": os.getenv("PLAID_SECRET")}
    api_key={"clientId": clientID, "secret": plaidSecret}
)
api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)






### ----------- Link Token -----------




# 8000/restapi/create_link_token/
@csrf_exempt  # To bypass CSRF for this example, but remember to handle CSRF securely in production
@require_POST  # Ensure that this is a POST request
def create_link_token(request):
    print("\n\n\ncreate_link_token -- REACHED\n")
    try:
        print(f"\nRequest Headers: {request.headers}")
        print(f"\nRequest Body: {request.body.decode('utf-8')}")
        # Generate a unique user ID for the link token, for example, using the authenticated user's ID
        # user_id = request.user.id if request.user.is_authenticated else "guest_user"
        user_id = 18762
        print(f"\nuser_id: {user_id}")

        plaid_products = []
        for product in plaidProducts: # Convert to Product objects
            plaid_products.append(Products(product))

        # Create the link token request
        link_token_request = LinkTokenCreateRequest(
            products=plaid_products, 
            client_name="Cashcore",
            country_codes=list(map(lambda x: CountryCode(x), ["US"])), 
            language="en",
            user=LinkTokenCreateRequestUser(
                client_user_id=str(user_id)
            )
        )

        print(f"\nLink Token Request: {link_token_request}")
        
        # Request the link token from Plaid
        response = client.link_token_create(link_token_request)
        print(f"\nPlaid Response: {response}")

        # Return the link token in the response
        return JsonResponse({"link_token": response["link_token"]})
    
    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        return JsonResponse({"error": str(e)}, status=400)
    





### ----------- Exchange Public Token --> Access Token -----------




# 8000/restapi/set_access_token/
# View --> public_token_exchange
@api_view(['POST'])
def set_access_token(request):
    print("\n\n\n\n\n\n\nset_access_token -- REACHED")
    # print(f"Request Headers: {request.headers}")
    # print(f"Request Body: {request.body.decode('utf-8')}")
    data = json.loads(request.body)
    public_token = data.get("public_token")
    user_id = data.get("user_id")
    metadata = data.get("metadata")

    print(f"\n\n{json.dumps(metadata, indent=4)}")


    if not User.objects.filter(pk=user_id).exists():
        # print("\n\nUser Does Not Exist Reached!\n\n")
        return Response({"message": f"User with userID:{user_id} doesn't exist."}, status=status.HTTP_404_NOT_FOUND)


    try:
        exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
        exchange_response = client.item_public_token_exchange(exchange_request)
        access_token = exchange_response['access_token']
        item_id = exchange_response['item_id']
        print(f"\n\n\n{exchange_response}")


        # print(f"\n\n\nSet_Access_Token: --- REACHED\n\naccess_token: {access_token}\n\nitem_id:{item_id}\n\nuser_id:{user_id}\n\n\n")

        # Save PlaidItem to the DB --> allows us to reuse access_token to make requests on User<id>'s behalf
        plaid_item = {
            "userID": user_id,
            "accessToken": access_token,
            "itemID": item_id,
            "institutionName": metadata['institution']['name']
        }

        print(f"\n\n\nplaid item: {plaid_item}\n\n\n\n\n\n")

        serializer = PlaidItemSerializer(data=plaid_item)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except plaid.ApiException as e:
        print(f"Plaid API error: {str(e)}")
        return Response({"error": "Plaid API error"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return Response({"error": str(e)}, status=400)






### ----------- Get PlaidItems in DB -----------




# 8000/restapi/plaiditems/
# Post 1 && Get All --> Swap to just Get All
class PlaidItemListCreate(generics.ListCreateAPIView): # --WORKS
    queryset = PlaidItem.objects.all()
    serializer_class = PlaidItemSerializer

    def post(self, request, format=None):
        #User with userID MUST be present in the DB before posting
        if User.objects.filter(pk=request.data['userID']):
            serializer = PlaidItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": f"User with (userID:{request.data['userID']}) doesn't exist."})






### ----------- Get Auth Associated with UserID -----------        




# 8000/restapi/plaidauth/
@api_view(['POST'])
def fetch_auth(request):

    try:

        user_id = request.data.get('userID')
        if not user_id:
            return Response({'error': 'userID is required'}, status=status.HTTP_400_BAD_REQUEST)
    
        # Fetch access_token associated with userID from DB
        try:
            plaid_item = PlaidItem.objects.get(userID=user_id)
            access_token = plaid_item.accessToken
        except PlaidItem.DoesNotExist:
            return Response({'error': 'No access token found for the given userID'}, status=status.HTTP_404_NOT_FOUND)
    

        request = AuthGetRequest(
            access_token=access_token
        )

        # PlaidAPI --> fetch auth
        auth_response = client.auth_get(request).to_dict()

        # print(f"\n\nauth_response:\n{auth_response}\n\n")

        accounts = auth_response['accounts']
        item = auth_response['item']
        metadata = auth_response.get('metadata', {})

        return Response({'accounts': accounts, 'item': item, 'metadata': metadata}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)






### ----------- Get Transactions Associated with UserID && Save to DB -----------




# Potential Additional Fields:
#
# Date range (in days) --> ex: 15, 30, 60, etc.
# Financial Institution (in case they link multiple Banks) --> 'Chase', 'Citibank', etc.


# 8000/restapi/plaidtransactions/
@api_view(['POST'])
def fetch_transactions(request):

    try:

        user_id = request.data.get('userID')
        if not user_id:
            return Response({'error': 'userID is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch access_token associated with userID from DB
        try:
            plaid_item = PlaidItem.objects.get(userID=user_id)
            access_token = plaid_item.accessToken
        except PlaidItem.DoesNotExist:
            return Response({'error': 'No access token found for the given userID'}, status=status.HTTP_404_NOT_FOUND)

        # Date range --> [start_date, end_date]
        end_date = date.today()
        start_date = end_date - timedelta(days=30)  # Last 30 days of transactions

        transactions_request = TransactionsGetRequest(
            access_token = access_token,
            start_date = start_date,
            end_date = end_date
        )

        # PlaidAPI --> fetch transactions
        transactions_response = client.transactions_get(transactions_request).to_dict()

        # print(f"\n\ntransactions_response:\n {transactions_response} \n\n")

        transactions = transactions_response.get('transactions', []) # .get(key, default) --> returns [] in case KeyError occurs
        total_transactions = transactions_response.get('total_transactions', 0)


        for t in transactions:
            transaction_data = {
                'userID': plaid_item.userID.pk, # Pass the primary key of the user
                'accountID': t.get('account_id', ''),
                'companyName': t.get('merchant_name') or 'Unknown',
                'amount': t.get('amount', 0),
                'categories': t.get('category', []),
            }
            # print(f"\n\n\n{transaction_data}\n\n\n")

            serializer = TransactionSerializer(data=transaction_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        return Response({'message': 'Transactions Saved Successfully!', 'transactions': transactions, 'total_transactions': total_transactions}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error fetching transactions: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



        












# Once you have the access_token, you save it to the DB and 
# when the frontend makes requests you will use that specific user_id to fetch an access token in your DB,
# then you will make PlaidAPI requests with that access token to fecth financial data using Plaid




# DB model for storing Items/ Tokens:
# +----------+--------------------+-------------------------+---------------------+
# | User ID  | Access Token       | Item ID                 | Created At         |
# +----------+--------------------+-------------------------+---------------------+
# | 12345    | access-sandbox-xyz | item-1234567890abcdef   | 2024-11-13 15:30   |
# +----------+--------------------+-------------------------+---------------------+




# Token Lifespans:
# 1) link_token --> 30 minutes
# 2) public_token --> 30 minutes
# 3) access_token --> doesn't expire