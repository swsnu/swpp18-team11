from django.contrib.gis.db import models
from sortedm2m.fields import SortedManyToManyField

from .franchise import Franchise
from .purchasable_category import PurchasableCategory
from .mixins import UserOwnable


class Store(UserOwnable):
    name = models.CharField(max_length=255)
    location = models.PointField()
    franchise = models.ForeignKey(
        Franchise,
        null=True,
        on_delete=models.CASCADE,
    )
    timezone = models.TextField()
    next_number = models.IntegerField(default=0)

    purchasable_categories = SortedManyToManyField(PurchasableCategory, blank=True)


    def __str__(self):
        return self.name

