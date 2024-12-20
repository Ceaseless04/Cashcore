from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your DataBase models/tables here.

# Object Relational Mapping (ORM) --> Python Object : Database Instance (Table or Document)

# Scripts: --> Migrates the DB with newly defined Models (Creates or Updates the Tables in the DB)
# python manage.py makemigrations
# python manage.py migrate


# ---- Issues ----:
# 1) None of the fields ae optional (except: createdAt, updatedAt, and pk)


# CustomUsers model
class CustomUser(models.Model):
    # id --> created by default for all Models (here the default is overriden)
    userID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    fullName = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password_hash = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self): # When you print() the Model this will be returned
        return self.username # Similar to overriding toString() in Java

# Budgets model
class Budget(models.Model):
    budgetID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    spentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Loans model
class Loan(models.Model):
    loansID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    loanType = models.CharField(max_length=255)
    principalAmount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    interestRate = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.00), MaxValueValidator(100.00)]) #Current range: [-999.99, 999.99]
    termMonths = models.IntegerField(validators=[MinValueValidator(0)]) #!! Negatives allowed
    remainingBalance = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Savings model
class Saving(models.Model):
    savingID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goalName = models.CharField(max_length=255)
    targetAmount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    currentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Stocks model
class Stock(models.Model):
    stocksID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    stockSymbol = models.CharField(max_length=10)
    sharesOwned = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    purchasePrice = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True, validators=[MinValueValidator(0.00)]) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# PlaidItem model
class PlaidItem(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    institutionName = models.CharField(max_length=255, blank=True, null=True) # Example: Bank name
    accessToken = models.CharField(max_length=255, unique=True)
    itemID = models.CharField(max_length=255, unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plaid Item for user {self.userID} - Item ID: {self.itemID}"

# Transactions model 
class Transaction(models.Model):
    transactionID = models.AutoField(primary_key=True)
    accountID = models.CharField(max_length=255) # What account it came from
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    companyName = models.CharField(max_length=255) # ex: United Airlines, McDonald's, etc.
    amount = models.DecimalField(max_digits=10, decimal_places=2) # range: [-99,999,999.99, 99,999,999.99]
    categories = models.JSONField() # ex: ["Food and Drink", "Restaurants", "Fast Food"]
    #Time the transaction was made
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.companyName}, {self.userID}, {self.amount}"



# Regex Validator can be written for many of the Char/TextFields

# Built-in Validators (we could use):
# EmailValidator
# RegexValidator (in case that you want to restrict to alphanumeric)

# validate_slug (alphanumeric PLUS hyphen and dash)

# MaxValueValidator
# MinValueValidator

# Basically just add: min_value=0

# Percentage Field
# validators=[MinValueValidator(0), MaxValueValidator(100)]

# Standard for Username/Fullname length set by Google --> 64 chars





# ---- Additional Fields ----:
# blank=False --> required field (default)
# blank=True --> optional field

# null=False --> null not allowed (default)
# null=True --> null allowed



