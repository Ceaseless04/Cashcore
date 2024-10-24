from django.db import models

# Create your DataBase models/tables here.

# Object Relational Mapping (ORM) --> Python Object : Database Instance (Table or Document)

# Scripts: --> Migrates the DB with newly defined Models (Creates or Updates the Tables in the DB)
# python manage.py makemigrations
# python manage.py migrate


# Users model
class User(models.Model):
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
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    spentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Loans model
class Loan(models.Model):
    loansID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    loanType = models.CharField(max_length=255)
    principalAmount = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    interestRate = models.DecimalField(max_digits=5, decimal_places=2) #Current range: [-999.99, 999.99]
    termMonths = models.IntegerField()
    remainingBalance = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Savings model
class Saving(models.Model):
    savingID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goalName = models.CharField(max_length=255)
    targetAmount = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    currentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Stocks model
class Stock(models.Model):
    stocksID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    stockSymbol = models.CharField(max_length=10)
    sharesOwned = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    purchasePrice = models.DecimalField(max_digits=10, decimal_places=2) #!! Negatives allowed
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True) #!! Negatives allowed
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
