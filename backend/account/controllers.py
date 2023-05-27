import base64
import traceback

from django.contrib.auth import authenticate, logout, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from account.constants import UserStatus, UserAuthState, UserRole
from account.models import User
from account.serializers import UserChangeStatusSerializer, UserChangePasswordSerializer, UserRegisterSerializer

from core.constants import HTTPResponseState
from core.logsaver import save_server_error
from core.responder import response_http_ok, response_instance_not_exist_error, response_server_error, \
    response_auth_credential_not_found, response_auth_credential_invalid, response_auth_credential_suspend, \
    response_auth_password_reset, response_auth_status_changed, response_auth_status_invalid, \
    response_auth_password_changed, response_auth_password_invalid, response_http_bad_request

location = __name__


def auth_user(credentials):
    try:
        # credentials = base64.b64decode(credentials).decode('UTF-8')
        # email = credentials.split(':')[0]
        # password = credentials.split(':')[1]
        email = credentials['email']
        password = credentials['password']

        if email is None or password is None:
            return {
                "state": UserAuthState.NOT_FOUND,
                "user": None,
                "response": response_auth_credential_not_found()
            }

        user = authenticate(email=email, password=password)
        if user is None:
            return {
                "state": UserAuthState.AUTH_FAIL,
                "user": None,
                "response": response_auth_credential_invalid()
            }

        if user.status == UserStatus.INACTIVE.value:
            return response_auth_credential_suspend()

        return {
            "state": UserAuthState.SUCCESS,
            "user": user,
            "response": None
        }
    except:
        save_server_error('auth_user', traceback.format_exc())
        return {
            "state": UserAuthState.AUTH_FAIL,
            "user": None,
            "response": response_auth_credential_invalid()
        }


def login_token(request, credentials):
    try:
        result = auth_user(credentials)
        user = result['user']

        if user is not None:
            refresh = RefreshToken.for_user(result['user'])
            access_token = refresh.access_token
            data = {
                'token': str(access_token),
                'id': user.id,
                'role': user.is_staff
            }
            return response_http_ok(data)
        else:
            return result['response']
    except User.DoesNotExist:
        return response_instance_not_exist_error(location, 'User')
    except:
        return response_server_error(location, traceback.format_exc())


def register_user(request):
    try:
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = get_user_model().objects.create_user(**serializer.validated_data)
            data = {
                'user_id': user.id,
                'email': user.email,
            }
            return response_http_ok(data)
        return response_http_bad_request(serializer.errors)
    except:
        return response_server_error(location, traceback.format_exc())


def change_user_password(request, user):
    try:
        serializer = UserChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            if user.check_password(serializer.validated_data['current_password']):
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                logout(request)
                return response_auth_password_changed()
        return response_auth_password_invalid()
    except:
        return response_server_error(location, traceback.format_exc())


def reset_user_password(request):
    try:
        credentials = {
            "email": request.data.get('email'),
            "password": request.data.get('password'),
        }
        user_id = request.data.get('user_id')
        result = auth_user(credentials)
        user = result['user']
        if user is not None:
            user = User.objects.get(id=user_id)
            user.set_password(request.data.get('user_new_password'))
            user.save()
            return response_auth_password_reset()
        else:
            return result['response']
    except:
        return response_server_error(location, traceback.format_exc())


def change_user_status(request, user):
    try:
        serializer = UserChangeStatusSerializer(data=request.data)
        if serializer.is_valid():
            user.status = serializer.data['status']
            user.save()
            return response_auth_status_changed()
        return response_auth_status_invalid()
    except:
        return response_server_error(location, traceback.format_exc())
