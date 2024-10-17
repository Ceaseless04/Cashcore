from django.shortcuts import render, HttpResponse

# Create your different views and routes here.
def home(request):
    return HttpResponse("hello world")
#
