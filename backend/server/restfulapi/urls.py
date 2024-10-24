from django.urls import path
from .views import user_views, budget_views, loan_views, saving_views, stock_views



# Specify URL paths that are used to access different views (views.py)

# Routing process --> routes to project (server/urls.py), then in urlpatterns we define 
#                     patterns that will forward to different Apps (MicroServices) 
#                     then later different views (api functions)

#example: localhost:8000/restapi/users/ --> routes to endpoint UserListCreate
urlpatterns = [
    path('users/', user_views.UserListCreate.as_view(), name='user-view-create'),
    path('users/<int:pk>/', user_views.UserDetail.as_view(), name='user-detail'),
    path('budgets/', budget_views.BudgetListCreate.as_view(), name='budget-view-create'),
    path('budgets/<int:pk>/', budget_views.BudgetDetail.as_view(), name='budget-detail'),
    path('budgets/<str:user>/', budget_views.BudgetUserDetail.as_view(), name='budget-user-get'), #Less precision has to be below
    path('loans/', loan_views.LoanListCreate.as_view(), name='loan-view-create'),
    path('loans/<int:pk>/', loan_views.LoanDetail.as_view(), name='loan-detail'),
    path('loans/<str:user>/', loan_views.LoanUserDetail.as_view(), name='loan-user-get'),
    path('savings/', saving_views.SavingListCreate.as_view(), name='saving-view-create'),
    path('savings/<int:pk>/', saving_views.SavingDetail.as_view(), name='saving-detail'),
    path('savings/<str:user>/', saving_views.SavingUserDetail.as_view(), name='saving-user-get'),
    path('stocks/', stock_views.StockListCreate.as_view(), name='stock-view-create'),
    path('stocks/<int:pk>/', stock_views.StockDetail.as_view(), name='stock-detail'),
    path('stocks/<str:user>/', stock_views.StockUserDetail.as_view(), name='stock-user-get'),
]