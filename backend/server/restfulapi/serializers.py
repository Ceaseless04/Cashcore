from rest_framework import serializers
from .models import User

# Used to convert between Model Instances and JSON Objects (both ways)
# Serialization and Deserialization
# JSON Objects is what is sent and received by Apis (Request and Response Objects)

# JSON --> JavaScript Object Notation
# {
#     "username": "Something",
#     "expenses": [12, 3, 4, 4, 5],
#     ...
# }

class UserSerializer(serializers.ModelSerializer): # defines ModelSerializer --> Parent Class
    class Meta:
        model = User
        fields = ["id", "username", "fullname", "email", "password_hash", "created_at"]
        # fields = '__all__'
        # Some of these fields can be ommited BUT --> not be present in (Response Object that the Frontend recieves)