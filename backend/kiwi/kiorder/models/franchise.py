from django.db import models

from .mixins import UserOwnable

class Franchise(UserOwnable):
    name = models.CharField(max_length=255)

