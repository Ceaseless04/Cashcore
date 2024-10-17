from django.db import models

# Users model
class User(models.Model):
    userID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    fullName = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password_hash = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)

# Budgets model
class Budget(models.Model):
    budgetID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2)
    spentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Loans model
class Loan(models.Model):
    loansID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    loanType = models.CharField(max_length=255)
    principalAmount = models.DecimalField(max_digits=10, decimal_places=2)
    interestRate = models.DecimalField(max_digits=5, decimal_places=2)
    termMonths = models.IntegerField()
    remainingBalance = models.DecimalField(max_digits=10, decimal_places=2)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Savings model
class Saving(models.Model):
    savingID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    goalName = models.CharField(max_length=255)
    targetAmount = models.DecimalField(max_digits=10, decimal_places=2)
    currentAmount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

# Stocks model
class Stock(models.Model):
    stocksID = models.AutoField(primary_key=True)
    userID = models.ForeignKey(User, on_delete=models.CASCADE)
    stockSymbol = models.CharField(max_length=10)
    sharesOwned = models.DecimalField(max_digits=10, decimal_places=2)
    purchasePrice = models.DecimalField(max_digits=10, decimal_places=2)
    currentPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
