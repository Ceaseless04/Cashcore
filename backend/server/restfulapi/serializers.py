from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CustomUser, Budget, Loan, Saving, Stock

# Used to convert between Model Instances and JSON Objects (both ways)
# Serialization and Deserialization (writing and reading)
# JSON Object is what is sent and received by APIs (in Request and Response Objects)

# JSON --> JavaScript Object Notation
# {
#     "username": "Something",
#     "expenses": [12, 3, 4, 4, 5],
#     ...
# }

class CustomUserSerializer(serializers.ModelSerializer): # defines ModelSerializer --> Parent Class
    class Meta:
        model = CustomUser
        fields = ["userID", "username", "fullName", "email", "password_hash", "createdAt"]
        # fields = '__all__'
        # Some of these fields can be ommited BUT --> not be present in Response Object


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'last_login', 'date_joined']

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, oldUser, validated_data):
        oldUser.username = validated_data.get('username', oldUser.username) #Tries to get 'username' in dict, if not there (default==oldUser.username)
        oldUser.email = validated_data.get('email', oldUser.email)
        oldUser.first_name = validated_data.get('first_name', oldUser.first_name)
        oldUser.last_name = validated_data.get('last_name', oldUser.last_name)

        password = validated_data.get('password', None)
        if password:
            oldUser.set_password(password)  # Hash the new password if provided

        oldUser.save()
        return oldUser

    

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ["budgetID", "userID", "name", "totalAmount", "spentAmount", "createdAt", "updatedAt"]


class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ["loansID", "userID", "loanType", "principalAmount", "interestRate", "termMonths", "remainingBalance", "createdAt", "updatedAt"]


class SavingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saving
        fields = ["savingID", "userID", "goalName", "targetAmount", "currentAmount", "createdAt", "updatedAt"]


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["stocksID", "userID", "stockSymbol", "sharesOwned", "purchasePrice", "currentPrice", "createdAt", "updatedAt"]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)