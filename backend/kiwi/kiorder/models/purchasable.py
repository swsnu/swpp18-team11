from django.db import models
from sortedm2m.fields import SortedManyToManyField

from .mixins import UserOwnable, FranchiseOwnable
from .purchasable_option import PurchasableOption

class Purchasable(UserOwnable, FranchiseOwnable):
    name = models.CharField(max_length=255)
    base_price = models.DecimalField(max_digits=19, decimal_places=10)

    purchasable_options = SortedManyToManyField(PurchasableOption)

