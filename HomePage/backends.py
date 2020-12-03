from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User


class UserAuth(ModelBackend):
    def authenticate(self, request, **kwargs):
        email = kwargs['username']
        password = kwargs['password']
        try:
            user = User.objects.filter(email=email).first()
            if user:
                if user.check_password(password):
                    return user
        except User.DoesNotExist:
            pass
