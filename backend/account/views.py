from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from account.controllers import login_token, change_user_password, reset_user_password, change_user_status, \
    register_user
from account.models import User
from account.serializers import UserSerializer, UserUpdateSerializer


class AuthViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == 'login':
            return [AllowAny()]
        else:
            return super().get_permissions()

    @action(methods=['post'], detail=False, name='login')
    def login(self, request):
        credentials = {
            "email": request.data.get('email'),
            "password": request.data.get('password'),
        }
        result = login_token(request, credentials)
        return Response(result['data'], status=result['status'])

    @action(methods=['post'], detail=False, name='register', permission_classes=[AllowAny])
    def register(self, request):
        result = register_user(request)
        return Response(result['data'], status=result['status'])


class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  mixins.ListModelMixin,
                  GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
