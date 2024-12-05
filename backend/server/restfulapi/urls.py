from django.urls import path
from .views import customuser_views, user_views, budget_views, loan_views, saving_views, stock_views, login_views, register_views, resetpassword_views



# Specify URL paths that are used to access different views (views.py)

# Routing process --> routes to project (server/urls.py), then in urlpatterns we define 
#                     patterns that will forward to different Apps (MicroServices) 
#                     then later different views (api functions)

#example: localhost:8000/restapi/users/ --> routes to endpoint UserListCreate
urlpatterns = [
    path('users/', user_views.UserList.as_view(), name='user-list-view'),
    path('users/<int:pk>/', user_views.UserDetail.as_view(), name='user-detail-view'),
    path('customusers/', customuser_views.CustomUserListCreate.as_view(), name='customuser-listcreate-view'),
    path('customusers/<int:pk>/', customuser_views.CustomUserDetail.as_view(), name='customuser-detail-view'),
    path('budgets/', budget_views.BudgetListCreate.as_view(), name='budget-listcreate-view'),
    path('budgets/<int:pk>/', budget_views.BudgetDetail.as_view(), name='budget-detail-view'),
    path('budgets/<str:user>/', budget_views.BudgetUserDetail.as_view(), name='budget-user-get-view'), #Less precision has to be below
    path('loans/', loan_views.LoanListCreate.as_view(), name='loan-listcreate-view'),
    path('loans/<int:pk>/', loan_views.LoanDetail.as_view(), name='loan-detail-view'),
    path('loans/<str:user>/', loan_views.LoanUserDetail.as_view(), name='loan-user-get-view'),
    path('savings/', saving_views.SavingListCreate.as_view(), name='saving-listcreate-view'),
    path('savings/<int:pk>/', saving_views.SavingDetail.as_view(), name='saving-detail-view'),
    path('savings/<str:user>/', saving_views.SavingUserDetail.as_view(), name='saving-user-get-view'),
    path('stocks/', stock_views.StockListCreate.as_view(), name='stock-listcreate-view'),
    path('stocks/<int:pk>/', stock_views.StockDetail.as_view(), name='stock-detail-view'),
    path('stocks/<str:user>/', stock_views.StockUserDetail.as_view(), name='stock-user-get-view'),
    path('register/', register_views.RegisterView.as_view(), name='register-view'),
    path('login/', login_views.LoginView.as_view(), name='login-view'),
    path('password-reset/', resetpassword_views.ResetPasswordView.as_view(), name='password_reset')
]