from django.db import models
from sortedm2m.fields import SortedManyToManyField

from .mixins import UserOwnable, FranchiseOwnable
from .purchasable import Purchasable

class PurchasableCategory(UserOwnable, FranchiseOwnable):
    name = models.CharField(max_length=255)
    purchasables = SortedManyToManyField(Purchasable)

    def __str__(self):
        return self.name
