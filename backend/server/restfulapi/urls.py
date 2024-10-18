from django.urls import path
from . import views


# Specify URL paths that are used to access different views (views.py)

# Routing process --> routes to project (server/urls.py), then in urlpatterns we define 
#                     patterns that will forward to different Apps (MicroServices) 

#localhost:8000/restapi/users/ --> routes to endpoint UserListCreate
urlpatterns = [
    path('users/', views.UserListCreate.as_view(), name='user-view-create')
]