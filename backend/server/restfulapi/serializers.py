from rest_framework import serializers
from .models import User, Budget, Loan, Saving, Stock

# Used to convert between Model Instances and JSON Objects (both ways)
# Serialization and Deserialization (writing and reading)
# JSON Object is what is sent and received by APIs (in Request and Response Objects)

# JSON --> JavaScript Object Notation
# {
#     "username": "Something",
#     "expenses": [12, 3, 4, 4, 5],
#     ...
# }

class UserSerializer(serializers.ModelSerializer): # defines ModelSerializer --> Parent Class
    class Meta:
        model = User
        fields = ["userID", "username", "fullName", "email", "password_hash", "createdAt"]
        # fields = '__all__'
        # Some of these fields can be ommited BUT --> not be present in Response Object


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