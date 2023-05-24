from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from app.models import Record
from app.serializers import RecordSerializer


class RecordViewSet(viewsets.ModelViewSet):
    pagination_class = None
    queryset = Record.objects.all()
    serializer_class = RecordSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        else:
            return super().get_permissions()
