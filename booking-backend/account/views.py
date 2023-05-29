import requests

from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from account.controllers import login_token, change_user_password, reset_user_password, change_user_status, \
    register_user, auth_user
from account.models import User
from account.permissions import OwnerRetrieveAdminList
from account.serializers import UserSerializer, UserUpdateSerializer
from utils.aes_crypt import aes_ecb_decrypt
from utils.totp import totp_key_generate, totp_verify, totp_url


class AuthViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == 'login':
            return [AllowAny()]
        else:
            return super().get_permissions()

    @action(methods=['post'], detail=False, name='login')
    def login(self, request):
        captcha_token = request.data.get('captcha_token')
        totp_code = request.data.get('totp_code')
        credentials = {
            "email": request.data.get('email'),
            "password": aes_ecb_decrypt(request.data.get('password'), 'hVHAcK6TNAfvbwpA')
        }

        # Check Captcha
        if totp_code is '' or totp_code is None:
            data = {'secret': "0x6626E9768ec335468F7a2Ba3f66e352BC813c946", 'response': captcha_token}
            res = requests.post("https://hcaptcha.com/siteverify", data=data)
            res_dist = res.json()
            if not res_dist['success']:
                return Response({"error": "CAPTCHA_VERIFICATION_FAIL"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(email=credentials['email'])

        # Check the 2FA
        if user.totp is None:
            key = totp_key_generate()
            user.totp = key
            user.save()
            output_url = totp_url(key, user.email)
            return Response({
                'message': "TFA_REGISTER",
                'totp_key': key,
                'totp_qrc': output_url
            }, status=status.HTTP_200_OK)
        else:
            if totp_code is None or totp_code is '':
                return Response({"message": "TFA_REQUEST"}, status.HTTP_200_OK)
            else:
                if not totp_verify(user.totp, totp_code):
                    return Response({"error": "TWO_FACTOR_AUTHENTICATION_FAIL"}, status=status.HTTP_400_BAD_REQUEST)

        # Response
        result = login_token(request, credentials)
        return Response(result['data'], status=result['status'])

    @action(methods=['post'], detail=False, name='register', permission_classes=[AllowAny])
    def register(self, request):
        result = register_user(request)
        return Response(result['data'], status=result['status'])


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = None

    permission_classes = [OwnerRetrieveAdminList]

    # def get_permissions(self):
    #     if self.action == 'ge':
    #         return [AllowAny()]
    #     else:
    #         return super().get_permissions()
    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'PUT':
            serializer_class = UserUpdateSerializer
        return serializer_class

    @action(methods=['put'], detail=True)
    def change_password(self, request, pk=None):
        user = self.get_object()
        result = change_user_password(request, user)
        return Response(result['data'], status=result['status'])

    @action(methods=['post'], detail=False, permission_classes=[IsAdminUser])
    def reset_password(self, request):
        result = reset_user_password(request)
        return Response(result['data'], status=result['status'])

    @action(methods=['put'], detail=True, permission_classes=[IsAdminUser])
    def change_status(self, request, pk=None):
        user = self.get_object()
        result = change_user_status(request, user)
        return Response(result['data'], status=result['status'])
