from django.conf import settings
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied

import jwt
from .models import User


class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):

        header = request.headers.get('Authorization')

        if not header:
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Authorization header'})

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))

        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})

        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Subject'})

        return (user, token)
