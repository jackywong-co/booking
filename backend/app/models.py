import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Record(models.Model):
    gender = {
        (0, 'M'),
        (1, 'F'),
        (2, 'Other'),
    }
    brand_of_vaccine = {
        (0, 'Comirnaty'),
        (1, 'CoronaVac'),
    }
    status = {
        (0, 'INITIAL'),
        (1, 'ACTIVE'),
        (2, 'INACTIVE'),
        (3, 'DELETED'),
    }
    id = models.UUIDField(primary_key=True, auto_created=True, default=uuid.uuid4, editable=False)
    firstname_en = models.CharField(max_length=200, blank=True, null=True)
    lastname_en = models.CharField(max_length=200, blank=True, null=True)
    firstname_zh = models.CharField(max_length=200, blank=True, null=True)
    lastname = models.CharField(max_length=200, blank=True, null=True)
    id_number = models.CharField(max_length=200, blank=True, null=True)
    gender = models.SmallIntegerField(choices=gender, blank=True, null=True, default=2)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=200, blank=True, null=True)
    place_of_birth = models.CharField(max_length=200, blank=True, null=True)
    brand_of_vaccine = models.SmallIntegerField(choices=brand_of_vaccine, blank=True, null=True, default=0)
    ref_code = models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False)
    status = models.SmallIntegerField(choices=status, blank=True, null=True, default=1)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
