from django.http import JsonResponse
from django.views import View
import json

class ResetPasswordView(View):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            password = data.get("password")

            if not password or len(password) < 8:
                return JsonResponse({"message": "Password must be at least 8 characters long"}, status=400)

            return JsonResponse({"message": "Password reset successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
