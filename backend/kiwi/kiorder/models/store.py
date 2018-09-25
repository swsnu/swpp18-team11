from django.db import models
from django.contrib.gis.db import models

from .franchise import Franchise
from .mixins import UserOwnable

class Store(UserOwnable):
    name = models.CharField(max_length=255)
    location = models.PointField()
    franchise = models.ForeignKey(
        Franchise,
        null=True,
        on_delete=models.CASCADE,
    )

