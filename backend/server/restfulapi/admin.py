from django.contrib import admin
from restfulapi.models import Budget, Loan, Saving, Stock, PlaidItem

class BudgetAdmin(admin.ModelAdmin):
    list_display = ['budgetID', 'name', 'userID']

class LoanAdmin(admin.ModelAdmin):
    list_display = ['loansID', 'loanType', 'userID']

class SavingAdmin(admin.ModelAdmin):
    list_display = ['savingID', 'goalName', 'userID']

class StockAdmin(admin.ModelAdmin):
    list_display = ['stocksID', 'stockSymbol', 'sharesOwned', 'userID']

class PlaidItemAdmin(admin.ModelAdmin):
    list_display = ['itemID', 'institutionName', 'accessToken', 'userID']

# Register your models here.
admin.site.register(Budget, BudgetAdmin)
admin.site.register(Loan, LoanAdmin)
admin.site.register(Saving, SavingAdmin)
admin.site.register(Stock, StockAdmin)
admin.site.register(PlaidItem, PlaidItemAdmin)


